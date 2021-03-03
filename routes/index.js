const express = require('express');
const rateLimit = require('express-rate-limit');
const redis = require('redis');
const { promisify } = require('util');
const async = require('async');

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

// Routes
router.get('/api', async (req, res) => {
  try {
    var result = {};
    async.each(
      ['products', 'tester'],
      function (key, callback) {
        RedisClient.get(key, function (err, res) {
          result[key] = JSON.parse(res);
          callback(err);
        });
      },
      function () {
        res.send(result);
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/api/bestProduct', async (req, res) => {
  const { q } = req.query;

  // Client validation
  if (q === '' || q.length < 3 || q.length > 150) {
    console.log('invalid string');
    return res.sendStatus(422);
  } else {
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

      // Filter
      const filterdResults = result.filter(({ title }) =>
        title.toLowerCase().includes(req.query.q.toLowerCase())
      );

      // Result Validation
      if (!Array.isArray(filterdResults) || !filterdResults.length) {
        console.log('result not found');
        res.status(404).send({
          title: 'No result found',
          desc:
            "We've searched more than 10,000+ products. We did not find any products to compare.",
        });
      } else {
        // Sort results
        const sortedResults = filterdResults.sort(
          (a, b) =>
            // Special expression is replacing '$'
            a.price.current_price - b.price.current_price
        );
        // Send data to front end
        res.status(200).send(sortedResults);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500); // Server error
    }
  }
});

module.exports = router;
