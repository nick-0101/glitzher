const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

// Rate Limiters
const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

const router = express.Router();

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

router.use(redisLimiter);

// Homepage Get
const GET_ASYNC = promisify(RedisClient.get).bind(RedisClient);

// Cache Get
const GET_CACHE_ASYNC = promisify(RedisCacheClient.get).bind(RedisCacheClient);
const SET_CACHE_ASYNC = promisify(RedisCacheClient.set).bind(RedisCacheClient);

// Routes
router.get('/api/homepage', async (req, res) => {
  try {
    const reply = await GET_CACHE_ASYNC('cacheData');
    if (reply) {
      // Prep data
      const data = JSON.parse(reply);
      const dataCount = Object.keys(data).length;

      // Querys
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || dataCount;
      const sortBy = req.query.sortBy || 'popular';

      // Sort Data
      let filterResults = data.filter(
        (item) =>
          item.price.current_price !== 0 && item.price.current_price !== ''
      );
      let sortedResults;

      if (sortBy === 'low') {
        // Sort by lowest to highest
        sortedResults = filterResults.sort((x, y) => {
          return x.price.current_price - y.price.current_price;
        });

        // Add Pages
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const dataResult = sortedResults.slice(startIndex, endIndex);

        // Send Data
        res.send(dataResult);
      } else if (sortBy === 'high') {
        // Sort by lowest to highest
        sortedResults = filterResults.sort((x, y) => {
          return y.price.current_price - x.price.current_price;
        });

        // Add Pages
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const dataResult = sortedResults.slice(startIndex, endIndex);

        // Send Data
        res.send(dataResult);
      } else {
        // Add Pages
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const dataResult = filterResults.slice(startIndex, endIndex);

        // Send Data
        res.send(dataResult);
      }
    } else {
      // -------------------- UnCached Data --------------------- //

      //  Get frontPage data
      const response = await GET_ASYNC('frontPage');

      // Expire
      const nd = new Date().setHours(23, 59, 59);
      const expire = Math.floor((nd - Date.now()) / 1000);

      // Cache front page data
      await SET_CACHE_ASYNC('cacheData', response, 'EX', expire);

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
    }
  } catch (err) {
    res.status(500).send({
      title: "Oops. There's been a problem on our end",
      desc: 'Please try again later. We will look into this immediately.',
    }); // Server error
  }
});

module.exports = router;
