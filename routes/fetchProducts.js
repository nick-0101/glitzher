const express = require('express');
const redis = require('redis');
const amazonScraper = require('amazon-buddy');
const cron = require('node-cron');
const algoliasearch = require('algoliasearch');
const Data = require('../models/Data');
const router = express.Router();

// Redis
const RedisClient = redis.createClient({
  host: process.env.HOSTNAME,
  port: process.env.REDISPORT,
  password: process.env.PASSWORD,
});

// Alogolia
const AlgoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_KEY,
  process.env.ALGOLIA_ADMIN_KEY
);
const algoliaIndex = AlgoliaClient.initIndex('productionProducts');

async function getProducts(req, res) {
  try {
    // Collect 50 products from CA
    keywords = [
      'makeup',
      'face makeup',
      'lip makeup',
      'foundation makeup',
      'makeup sets',
      'face powder',
      'makeup blush',
    ];

    // const promises = keywords.map(async (word, index) => {
    //   const products = await amazonScraper.products({
    //     keyword: word,
    //     number: 100,
    //     country: 'CA',
    //     randomUa: true,
    //     sponsored: false,
    //   });
    //   // Update db
    //   const result = products.result;
    //   // algoliaIndex
    //   //   .saveObjects(result, { autoGenerateObjectIDIfNotExist: true })
    //   //   .then(() => {
    //   //     console.log('[', index, ']', result.length, 'saved to algolia');
    //   //   });

    //   RedisClient.set('frontPage', JSON.stringify(result), (err) => {
    //     if (err) throw err;
    //     console.log('[', index, ']', result.length, 'saved to redis');
    //   });
    // });
    // Promise.all(promises).then(res.sendStatus(200));
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

// Update api everyday at 12am
cron.schedule('0 0 * * *', () => {
  getProducts();
  console.log('Scheduled update completed at ' + new Date());
});

router.get('/updateapi', getProducts);

module.exports = router;
