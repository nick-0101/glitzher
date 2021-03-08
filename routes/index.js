const express = require('express');
const rateLimit = require('express-rate-limit');
const redis = require('redis');
const { promisify } = require('util');
const async = require('async');
const algoliasearch = require('algoliasearch');

const router = express.Router();

// Todo
// use affiliatejs to make all links affiliate links.
// the problem is that /api is fetching from database and is not checking if there is a cache

// Rate Limiting
const searchApi = rateLimit({
  windowMs: 1 * 60 * 1000, // 10 win window
  max: 10, // start blocking after 10 requests
  // send a status code with message and display err in react
  message:
    'Too many many requests from this IP, please try again after an hour',
});

// Redis
const RedisClient = redis.createClient({
  host: process.env.HOSTNAME,
  port: process.env.REDISPORT,
  password: process.env.PASSWORD,
});

const GET_ASYNC = promisify(RedisClient.get).bind(RedisClient);

// Alogolia
const AlgoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_KEY,
  process.env.ALGOLIA_ADMIN_KEY
);
const index = AlgoliaClient.initIndex('productionProducts');

// Routes
router.get('/api', async (req, res) => {
  try {
    // Fetch redis data
    const sephora = await GET_ASYNC('products');
    const amazon = await GET_ASYNC('tester');

    // Parse data
    const parse1 = JSON.parse(sephora);
    const parse2 = JSON.parse(amazon);

    // Chain data
    const test1 = parse1.result;
    const test2 = parse2.result;
    const result = Object.assign(test1, test2);

    // Randomize - Fisher Yates Algorithm
    shuffleFisherYates(result);
    function shuffleFisherYates(array) {
      let i = array.length;
      while (i--) {
        const ri = Math.floor(Math.random() * (i + 1));
        [array[i], array[ri]] = [array[ri], array[i]];
      }
      res.send(array);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      title: "Oops. There's been a problem on our end",
      desc: 'Please try again later. We will look into this immediately.',
    }); // Server error
  }
});

router.get('/api/bestProduct', async (req, res) => {
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
      // const sephora = await GET_ASYNC('products');
      const amazon = await GET_ASYNC('frontPage');

      // Parse data
      // const parse1 = JSON.parse(sephora);
      const parse2 = JSON.parse(amazon);

      // Chain data
      // const test1 = parse1.result; //change bame
      const data2 = parse2.result;
      const result = data2;

      // Filter
      const filterResults = result.filter(
        (item) =>
          item.title.toLowerCase().includes(req.query.q.toLowerCase()) &&
          item.price.current_price !== 0
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
