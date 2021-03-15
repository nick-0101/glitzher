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
  process.env.ALGOLIA_ADMIN_KEY
);
const index = AlgoliaClient.initIndex('productionProducts');

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
  delayMs: 0, // disable delaying - full speed until the max limit is reached
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
    const amazon = await GET_ASYNC('frontPage');

    // Parse data
    const parse1 = JSON.parse(sephora);
    const parse2 = JSON.parse(amazon);

    // Chain data
    const data1 = parse1.result;
    const data2 = parse2.result;
    const result = [...data2, ...data1];

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

router.get('/api/bestProduct', searchApi, async (req, res) => {
  const { q } = req.query;

  // Client validation
  if (q === '' || q.length < 3 || q.length > 150) {
    console.log('invalid string');
    res.status(422).send({
      title: 'Invalid query',
      desc: 'Please try again.',
    });
  } else {
    try {
      // Fetch redis data
      const sephora = await GET_ASYNC('frontPage');
      const amazon = await GET_ASYNC('products');

      // Parse data
      const parse1 = JSON.parse(sephora);
      const parse2 = JSON.parse(amazon);

      // Chain data
      const data1 = parse1.result;
      const data2 = parse2.result;
      const result = Object.assign(data1, data2);

      // Filter
      const query = req.query.q.toLowerCase();
      const filterResults = result.filter(
        (item) =>
          query
            .toLowerCase()
            .split(' ')
            .every((keyword) => item.title.toLowerCase().includes(keyword)) &&
          item.price.current_price !== 0 &&
          item.price.current_price !== ''
      );

      // Result Validation
      if (!Array.isArray(filterResults) || !filterResults.length) {
        res.status(404).send({
          title: 'No result found',
          desc: "We couldn't find any products related to your query.",
        });
      } else {
        // Sort results
        const sortedResults = filterResults.sort(
          (a, b) =>
            // Special expression is replacing '$'
            a.price.current_price - b.price.current_price
        );
        // Send data to front end
        res.status(200).send(sortedResults);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({
        title: "Oops. There's been a problem on our end",
        desc: 'Please try again later. We will look into this immediately.',
      }); // Server error
    }
  }
});

router.get('/algolia/search', async (req, res) => {
  const { q } = req.query;

  index
    .search(q, {
      distinct: true,
    })
    .then(({ hits }) => {
      const filterResults = hits.filter(
        (item) => item.price.current_price !== 0
      );
      const sortedResults = filterResults.sort(
        (a, b) =>
          // Special expression is replacing '$'
          a.price.current_price - b.price.current_price
      );
      res.send(sortedResults);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
