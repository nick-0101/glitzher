const express = require('express');
const Data = require('../models/Data');
const redis = require('redis');
const { promisify } = require('util');
const async = require('async');
const router = express.Router();

// Todo
// use affiliatejs to make all links affiliate links.
// the problem is that /api is fetching from database and is not checking if there is a cache

// const PORT_REDIS = process.env.PORT || 6379;
// const RedisClient = redis.createClient(PORT_REDIS);

const RedisClient = redis.createClient({
  host: process.env.HOSTNAME,
  port: process.env.REDISPORT,
  password: process.env.PASSWORD,
});

// const GET_ASYNC = promisify(RedisClient.get).bind(RedisClient);

// Routes
router.get('/api', async (req, res) => {
  try {
    // RedisClient.mget('tester', 'products', function (err, data) {
    //   res.send(JSON.parse(data));
    // });

    // current problem is to solve the fact that the images are slowing down the load by a lot
    // (view network tab). Also find a way to block reqsuts from the image and find a way to do redis search.
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

    // Fetch Data
    // const data = await Data.find();
    // // Assign Data
    // const amazon = data[0].api.result;
    // const sephora = data[1].api.result;
    // const result = Object.assign(sephora, amazon);
    // const dataCount = amazon.length + sephora.length;
    // // Querys
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || dataCount; // dataCount
    // const discounted = req.query.discounted || true;
    // // Add Pages
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // const dataResult = result.slice(startIndex, endIndex);
    // // Filter api
    // if (discounted === 'true') {
    //   // Filter results for discount
    //   const filterDiscounted = dataResult.filter((x) => x.price.discounted);
    //   // Send Data
    //   res.status(200).json(filterDiscounted);
    // } else {
    //   // Cache
    //   // const saveResult = await SET_ASYNC(
    //   //   'products',
    //   //   JSON.stringify(dataResult),
    //   //   'EX',
    //   //   60
    //   // );
    //   // Send data to client
    //   res.status(200).json(dataResult);
    // }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.get('/api/bestProduct', async (req, res) => {
  const { q } = req.query;

  // Client validation
  if (q === '' || q.length < 3 || q.length > 150) {
    return res.sendStatus(400);
  } else {
    try {
      // Search from cache
      // const reply = await GET_ASYNC('products');
      // if (reply) {
      //   console.log('used cached data');
      //   const result = JSON.parse(reply);
      //   const filterdResults = result.filter(({ title }) =>
      //     title.toLowerCase().includes(req.query.q.toLowerCase())
      //   );
      //   // Result Validation
      //   if (!Array.isArray(filterdResults) || !filterdResults.length) {
      //     return res.sendStatus(400);
      //   } else {
      //     // Sort results
      //     const sortedResults = filterdResults.sort(
      //       (a, b) =>
      //         // Special expression is replacing '$'
      //         a.price.current_price - b.price.current_price
      //     );
      //     // Send data to front end
      //     res.status(200).send(sortedResults);
      //   }
      //   return;
      // }
      // Search from db
      // const data = await Data.find();
      // const amazon = data[0].api.result;
      // const sephora = data[1].api.result;
      // const result = Object.assign(sephora, amazon);
      // // Querys
      // const query = req.query.q;
      // console.log(query);
      // // Filter
      // const filterdResults = result.filter(({ title }) =>
      //   title.toLowerCase().includes(query.toLowerCase())
      // );
      // // Result Validation
      // if (!Array.isArray(filterdResults) || !filterdResults.length) {
      //   return res.sendStatus(400);
      // } else {
      //   // Sort results
      //   const sortedResults = filterdResults.sort(
      //     (a, b) =>
      //       // Special expression is replacing '$'
      //       a.price.current_price - b.price.current_price
      //   );
      //   // Send data to front end
      //   res.status(200).send(sortedResults);
      // }
    } catch (err) {
      console.error(err);
      return res.sendStatus(500); // Server error
    }
  }
});

module.exports = router;
