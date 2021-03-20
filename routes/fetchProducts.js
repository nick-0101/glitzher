const express = require('express'),
  ipfilter = require('express-ipfilter').IpFilter;
const amazonScraper = require('amazon-buddy');
const redis = require('redis');
const schedule = require('node-schedule');
const Data = require('../models/Data');
const { promisify } = require('util');
const algoliasearch = require('algoliasearch');
const { route } = require('.');

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
const index = AlgoliaClient.initIndex('amazonProducts');

router.get('/algolia/setProducts', async (req, res) => {
  try {
    // Collect 50 products from CA
    const products = await amazonScraper.products({
      keyword: 'cheek makeup',
      number: 100,
      country: 'US',
      randomUa: true,
    });

    // Update db

    // if (Object.keys(products).length > 0) {
    //   RedisClient.set('faceMakeup1', JSON.stringify(products), (err, data) => {
    //     if (err) throw err;
    //     console.log('updated!');
    //   });
    // } else {
    //   return;
    // }
    // Set Algolia Data
    // const amazon = await GET_ASYNC('amazonProducts');
    // const parse1 = JSON.parse(amazon);
    // const result = parse1.result;

    // const parse = JSON.parse(products);
    const result = products.result;

    index
      .saveObjects(result, { autoGenerateObjectIDIfNotExist: true })
      .then(() => {
        console.log('results saved!');
        res.sendStatus(200);
      });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Update api everyday at 12am
// schedule.scheduleJob('00 00 12 * * 0-7', () => {
//   getProducts();
//   console.log('Scheduled update completed at ' + new Date());
// });

// router.get('/updateapi', ipfilter(ips, { mode: 'allow' }), getProducts);

module.exports = router;
