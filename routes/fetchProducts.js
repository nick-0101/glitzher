const express = require('express'),
  ipfilter = require('express-ipfilter').IpFilter;
const amazonScraper = require('amazon-buddy');
const redis = require('redis');
const schedule = require('node-schedule');
const Data = require('../models/Data');
const { promisify } = require('util');
const algoliasearch = require('algoliasearch');

const router = express.Router();
const ips = ['::1'];

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

router.get('/algolia/setProducts', async (req, res) => {
  const amazon = await GET_ASYNC('tester');
  const parse1 = JSON.parse(amazon);
  const result = parse1.result;

  index
    .saveObjects(result, { autoGenerateObjectIDIfNotExist: true })
    .then(({ objectIDs }) => {
      res.send(objectIDs);
    });
});

async function getProducts(req, res) {
  try {
    console.log('Fetching Data...');

    // Collect 50 products from CA
    const products = await amazonScraper.products({
      keyword: 'Xbox',
      number: 150,
      country: 'CA',
      randomUa: true,
    });

    // Update db

    if (Object.keys(products).length > 0) {
      RedisClient.set('tester', JSON.stringify(products), (err, data) => {
        if (err) throw err;
        console.log('updated!');
        res.sendStatus(200);
      });
    } else {
      return;
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

// Update api everyday at 12am
schedule.scheduleJob('00 00 12 * * 0-7', () => {
  getProducts();
  console.log('Scheduled update completed at ' + new Date());
});

router.get('/updateapi', ipfilter(ips, { mode: 'allow' }), getProducts);

module.exports = router;
