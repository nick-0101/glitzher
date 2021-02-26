const express = require('express');
const Data = require('../models/Data');
const redis = require('redis');
const { promisify } = require('util');

const router = express.Router();

// Todo
// use affiliatejs to make all links affiliate links.
// the problem is that /api is fetching from database and is not checking if there is a cache
// the problem with the cahcing is that we need indivial cache for each endpoint

// potential problem. When I stop app redis gets stoped. So if a users
// app crashes will the cache get destoryed causing long loading times?

const PORT_REDIS = process.env.PORT || 6379;
const redisClient = redis.createClient(PORT_REDIS);

const GET_ASYNC = promisify(redisClient.get).bind(redisClient);
const SET_ASYNC = promisify(redisClient.set).bind(redisClient);

var update_id = 'key1142';

// Routes
router.get('/api', async (req, res) => {
  try {
    // Get Cache
    const reply = await GET_ASYNC('products');
    if (reply) {
      console.log('used cached data');
      res.status(200).send(JSON.parse(reply));
      return;
    }

    // Fetch Data
    const data = await Data.find();

    // Assign Data
    const amazon = data[0].api.result;
    const sephora = data[1].api.result;
    const result = Object.assign(sephora, amazon);
    const dataCount = amazon.length + sephora.length;

    // Querys
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || dataCount; // dataCount
    const discounted = req.query.discounted || true;

    // Add Pages
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const dataResult = result.slice(startIndex, endIndex);

    // Filter api
    if (discounted === 'true') {
      // Filter results for discount
      const filterDiscounted = dataResult.filter((x) => x.price.discounted);

      // Send Data
      res.status(200).json(filterDiscounted);
    } else {
      // Cache
      const saveResult = await SET_ASYNC(
        'products',
        JSON.stringify(dataResult),
        'EX',
        60
      );

      // Send data to client
      res.status(200).json(dataResult);
    }
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
      // Get Cache
      // const reply = await GET_ASYNC('products');
      // if (reply) {
      //   console.log('used cached data');
      //   // res.status(200).send(JSON.parse(reply));
      //   const data = JSON.parse(reply);
      //   return;
      // } else {
      //   // Fetch Data
      //   const data = await Data.find();
      // }
      const data = await Data.find();
      // Assign Data
      const amazon = data[0].api.result;
      const sephora = data[1].api.result;
      const result = Object.assign(sephora, amazon);

      // Querys
      const query = req.query.q;
      console.log(query);

      // Filter
      const filterdResults = result.filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase())
      );

      // Result Validation
      if (!Array.isArray(filterdResults) || !filterdResults.length) {
        return res.sendStatus(400);
      } else {
        // Sort results
        const sortedResults = filterdResults.sort(
          (a, b) =>
            // Special expression is replacing '$'
            // a.price.current_price.replace(/\$/g, '') -
            // b.price.current_price.replace(/\$/g, '')
            a.price.current_price - b.price.current_price
        );

        // Send data to front end
        res.status(200).send(sortedResults);
      }
    } catch (err) {
      console.error(err);
      return res.sendStatus(500); // Server error
    }
  }
});

module.exports = router;
