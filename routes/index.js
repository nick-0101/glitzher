const express = require('express');
const _ = require('underscore');
const Data = require('../models/Data');
const redis = require('redis');

const PORT_REDIS = process.env.PORT || 6379;
const redisClient = redis.createClient(PORT_REDIS);

const router = express.Router();

// Todo
// use affiliatejs to make all links affiliate links.
// the problem is that /api is fetching from database and is not checking if there is a cache
// the problem with the cahcing is that we need indivial cache for each endpoint

var update_id = 'key1142';

const set = (key, value) => {
  // set 43200 (12hrs) as cache time
  redisClient.setex(key, 20, JSON.stringify(value));
};

const get = (req, res, next) => {
  let key = update_id;

  redisClient.get(key, (error, data) => {
    if (error) res.status(400).send(err);
    if (data !== null) res.status(200).send(JSON.parse(data));
    else next();
  });
};

router.get('/test', (req, res) => {
  res.sendStatus(200).json('Hello');
});

// Routes
router.get('/api', get, async (req, res) => {
  try {
    // Fetch Data
    const data = await Data.find();

    // Assign Data
    const amazon = data[0].api.result;
    const sephora = data[1].api.result;
    const result = Object.assign(sephora, amazon);
    const dataCount = Object.keys(result).length;

    // Querys
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || dataCount;
    const discounted = req.query.discounted || true;

    // Add Pages
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const dataResult = result.slice(startIndex, endIndex);

    // Cache
    set(update_id, dataResult);

    // Filter api
    if (discounted === 'true') {
      // Filter results for discount
      const filterDiscounted = dataResult.filter((x) => x.price.discounted);
      res.status(200).json(filterDiscounted);
    } else {
      // Send data to client
      res.status(200).json(dataResult);
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.get('/api/bestProduct', get, async (req, res) => {
  const { q } = req.query;

  // Client validation
  if (q === '' || q.length < 3 || q.length > 150) {
    return res.sendStatus(400);
  }

  try {
    // Fetch Data
    const data = await Data.find();
    const amazon = data[0].api.result;
    const sephora = data[1].api.result;
    const result = Object.assign(sephora, amazon);

    // Querys
    const query = req.query.q;

    // Filter
    const filterdResults = result.filter(({ title }) =>
      title.toLowerCase().includes(query.toLowerCase())
    );

    // Result Validation
    if (!Array.isArray(filterdResults) || !filterdResults.length) {
      return res.sendStatus(400);
    }

    // Sort results
    const sortedResults = filterdResults.sort(
      (a, b) =>
        // Special expression is replacing '$'
        parseFloat(a.price.current_price.replace(/\$/g, '')) -
        parseFloat(b.price.current_price.replace(/\$/g, ''))
    );

    // Send data to front end
    res.status(200).send(sortedResults);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500); // Server error
  }
});

module.exports = router;
