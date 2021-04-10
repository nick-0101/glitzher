const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const algoliasearch = require('algoliasearch');
const Data = require('../models/Data');
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
  max: 100,
});

const searchApi = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message:
    'Too many many requests from this IP, please try again after an hour',
});

router.use(redisLimiter);

const GET_ASYNC = promisify(RedisClient.get).bind(RedisClient);
const SET_ASYNC = promisify(RedisClient.set).bind(RedisClient);
// Routes
router.get('/api/v1/homepage', redisLimiter, async (req, res) => {
  try {
    // Fetch redis data
    const data = await GET_ASYNC('frontPage');

    // Parse data
    const parse1 = JSON.parse(data);

    // Chain data
    const data1 = parse1;
    const result = [...data1];
    const dataCount = Object.keys(result).length;

    // Querys
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || dataCount;

    // Add Pages
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const dataResult = result.slice(startIndex, endIndex);

    // Randomize - Fisher Yates Algorithm
    shuffleFisherYates(dataResult);
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
    res.status(500).send({
      title: "Oops. There's been a problem on our end",
      desc: 'Please try again later. We will look into this immediately.',
    }); // Server error
  }
});

router.get('/api/v1/search', searchApi, async (req, res) => {
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
          hitsPerPage: 1,
        },
      },
      {
        indexName: 'sephoraProducts',
        query: q,
        params: {
          hitsPerPage: 1,
        },
      },
      {
        indexName: 'shoppersdrugmartProducts',
        query: q,
        params: {
          hitsPerPage: 1,
        },
      },
      {
        indexName: 'wellProducts',
        query: q,
        params: {
          hitsPerPage: 1,
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
        res.status(500).send({
          title: "Oops. There's been a problem on our end",
          desc: 'Please try again later. We will look into this immediately.',
        }); // Server error
      });
  }
});

module.exports = router;
