const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const algoliasearch = require('algoliasearch');

// Rate Limiters
const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

const router = express.Router();

// Todo
// use affiliatejs to make all links affiliate links.

// Algolia
const AlgoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_KEY,
  process.env.ALGOLIA_ADMIN_KEY,
  {
    headers: {
      'X-Algolia-UserToken': '100',
    },
  }
);

// Redis
const RedisClient = redis.createClient({
  host: process.env.HOSTNAME,
  port: process.env.REDISPORT,
  password: process.env.PASSWORD,
});

// Rate Limiting
const redisLimiter = new RateLimit({
  store: new RedisStore({
    client: RedisClient,
  }),
  max: 100, // limit each IP to 100 requests per windowMs
});
const searchApi = RateLimit({
  windowMs: 1 * 60 * 1000, // 10 win window
  max: 20,
  message:
    'Too many many requests from this IP, please try again after an hour',
});

router.use(redisLimiter);

const GET_ASYNC = promisify(RedisClient.get).bind(RedisClient);

// Routes
router.get('/api', async (req, res) => {
  try {
    // Fetch redis data
    const sephora = await GET_ASYNC('products');
    // const amazon = await GET_ASYNC('frontPage');

    // Parse data
    const parse1 = JSON.parse(sephora);
    // const parse2 = JSON.parse(amazon);

    // Chain data
    const data1 = parse1.result;
    // const data2 = parse2.result;
    const result = [...data1];
    // const result = [...data2, ...data1];

    // Randomize - Fisher Yates Algorithm
    shuffleFisherYates(result);
    function shuffleFisherYates(array) {
      let i = array.length;
      while (i--) {
        const ri = Math.floor(Math.random() * (i + 1));
        [array[i], array[ri]] = [array[ri], array[i]];
      }

      const filterResults = array.filter(
        (item) =>
          item.price.current_price !== 0 && item.price.current_price !== ''
      );

      res.send(filterResults);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      title: "Oops. There's been a problem on our end",
      desc: 'Please try again later. We will look into this immediately.',
    }); // Server error
  }
});

router.get('/api/search', searchApi, async (req, res) => {
  const { q } = req.query;

  // Validate query
  if (q === '' || q.length < 3 || q.length > 150) {
    console.log('invalid string');
    res.status(422).send({
      title: 'Invalid query',
      desc: 'Please try again.',
    });
  } else {
    const queries = [
      {
        indexName: 'amazonProducts',
        query: q,
        params: {
          hitsPerPage: 5,
        },
      },
      {
        indexName: 'sephoraProducts',
        query: q,
        params: {
          hitsPerPage: 5,
        },
      },
      {
        indexName: 'shoppersdrugmartProducts',
        query: q,
        params: {
          hitsPerPage: 5,
        },
      },
    ];
    AlgoliaClient.multipleQueries(queries)
      .then(({ results }) => {
        // Filter empty results
        const filterResults = results.filter(
          (item) => Array.isArray(item.hits) && !item.hits.length == 0
        );

        // Validation
        if (!Array.isArray(filterResults) || !filterResults.length) {
          res.status(404).send({
            title: 'No result found',
            desc: "We couldn't find any products related to your query.",
          });
        } else {
          // Send Results
          const results = [];
          filterResults.forEach((item) => {
            results.push(item.hits[0]);
          });

          const sortedResults = results.sort(
            (a, b) =>
              // Special expression is replacing '$'
              a.price.current_price - b.price.current_price
          );
          res.send(sortedResults);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          title: "Oops. There's been a problem on our end",
          desc: 'Please try again later. We will look into this immediately.',
        }); // Server error
      });
  }
});

module.exports = router;
