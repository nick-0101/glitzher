const express = require('express'),
  ipfilter = require('express-ipfilter').IpFilter;
const amazonScraper = require('amazon-buddy');
const schedule = require('node-schedule');
const _ = require('underscore');
const Data = require('../models/Data');
const redis = require('redis');

const PORT_REDIS = process.env.PORT || 6379;
const redisClient = redis.createClient(PORT_REDIS);

const router = express.Router();

const ips = ['::1'];

// Todo
// start the front-end and display the information in a way where you can compare
// use affiliatejs to make all links affiliate links.
// have a way to load as you scroll
// the problem is that /api is fetching from database and is not checking if there is a cache

var update_id = 'key';

// Update db with new api info
async function updateDb(products) {
  const _id = '5ffa527bf6524639bc6b54e0';

  if (Object.keys(products).length > 0) {
    await Data.updateOne({ _id }, { $set: { api: products } }, (err) => {
      if (err) {
        throw err; // display proper error
      }
      console.log('Updated');
    });
  } else {
    return;
  }
}

async function getProducts(req, res, next) {
  try {
    console.log('Fetching Data...');

    // Collect 50 products from CA
    const products = await amazonScraper.products({
      keyword: 'Makeup',
      number: 150,
      country: 'CA',
      randomUa: true,
    });

    // Filter out adverts

    // Send data to updateDb
    res.send(updateDb(products));
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

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

// Update api everyday at 12am
schedule.scheduleJob('00 00 12 * * 0-7', () => {
  getProducts();
  console.log('Scheduled update completed at ' + new Date());
});

// Routes
router.get('/', (req, res) => {
  res.send('helloi');
});

router.get('/api', async (req, res) => {
  try {
    // Fetch Data
    const data = await Data.find();
    const dataCount = Object.keys(data[0].api.result).length;

    // Querys
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || dataCount;
    const discounted = req.query.discounted || true;

    // Add Pages
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const dataResult = data[0].api.result.slice(startIndex, endIndex);

    // Filter api
    if (discounted === 'true') {
      // Filter results for discount
      const filterDiscounted = dataResult.filter((x) => x.price.discounted);
      res.send(filterDiscounted);
      // set(update_id, filterDiscounted);
    } else {
      // Send data to client
      res.send(dataResult);
      // set(update_id, dataResult);
    }
  } catch (err) {
    res.status(500).send({ message: 'Something has went wrong' });
  }
});

router.get('/updateapi', ipfilter(ips, { mode: 'allow' }), getProducts);

module.exports = router;
