const express = require('express');
const redis = require('redis');
const amazonScraper = require('amazon-buddy');
var cron = require('node-cron');
const algoliasearch = require('algoliasearch');

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
const index = AlgoliaClient.initIndex('productionProducts');

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
      'concealer makeup',
    ];
    await Promise.all(
      keywords.map(async (word, index) => {
        const products = await amazonScraper.products({
          keyword: word,
          number: 100,
          country: 'CA',
          randomUa: true,
        });
        // Update db
        const result = products.result;
        index
          .saveObjects(result, { autoGenerateObjectIDIfNotExist: true })
          .then(() => {
            console.log('[', index, ']', result.length, 'sent to algolia');
          });

        RedisClient.set('frontPage', JSON.stringify(result), (err) => {
          if (err) throw err;
          console.log('[', index, ']', result.length, 'sent to redis');
        });
      }),
      res.sendStatus(200)
    );
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

module.exports = router;
