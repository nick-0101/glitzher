const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const algoliasearch = require('algoliasearch');
const axios = require('axios');
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

// Redis Clients
const RedisClient = redis.createClient({
  host: process.env.HOSTNAME,
  port: process.env.REDISPORT,
  password: process.env.PASSWORD,
});
const PORT_REDIS = process.env.PORT || 6379;
const RedisCacheClient = redis.createClient(PORT_REDIS);

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

// Homepage Get
const GET_ASYNC = promisify(RedisClient.get).bind(RedisClient);

// Cache Get
const GET_CACHE_ASYNC = promisify(RedisCacheClient.get).bind(RedisCacheClient);
const SET_CACHE_ASYNC = promisify(RedisCacheClient.set).bind(RedisCacheClient);

// Routes
router.get('/api/v1/homepage', async (req, res) => {
  try {
    const reply = await GET_CACHE_ASYNC('cacheData');
    if (reply) {
      // Prep data
      const data = JSON.parse(reply);
      const dataCount = Object.keys(data).length;

      // Querys
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || dataCount;

      // Add Pages
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const dataResult = data.slice(startIndex, endIndex);

      // Filter data
      const filterResults = dataResult.filter(
        (item) =>
          item.price.current_price !== 0 && item.price.current_price !== ''
      );
      res.send(filterResults);
      return;
    }
    // ------------------------------------------------- //

    //  Get frontPage data
    const response = await GET_ASYNC('frontPage');

    // Expire
    const nd = new Date().setHours(23, 59, 59);
    const expire = Math.floor((nd - Date.now()) / 1000);

    // Cache front page data
    const saveResult = await SET_CACHE_ASYNC(
      'cacheData',
      response,
      'EX',
      expire
    );

    // Prep data
    const data1 = JSON.parse(response);
    const dataCount1 = Object.keys(data1).length;

    // Querys
    const page1 = parseInt(req.query.page) || 1;
    const limit1 = parseInt(req.query.limit) || dataCount1;

    // Add Pages
    const startIndex1 = (page1 - 1) * limit1;
    const endIndex1 = page1 * limit1;
    const dataResult1 = data1.slice(startIndex1, endIndex1);

    // Filter data
    const filterResults1 = dataResult1.filter(
      (item) =>
        item.price.current_price !== 0 && item.price.current_price !== ''
    );

    res.send(filterResults1);
  } catch (err) {
    console.log(err);
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
