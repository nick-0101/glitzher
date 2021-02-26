const express = require('express'),
  ipfilter = require('express-ipfilter').IpFilter;
const amazonScraper = require('amazon-buddy');
const fetch = require('node-fetch');
const schedule = require('node-schedule');
const Data = require('../models/Data');

const router = express.Router();

const ips = ['::1'];

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
    const _id = '60108f05160579104738afa3';

    if (Object.keys(products).length > 0) {
      await Data.updateOne({ _id }, { $set: { api: products } }, (err) => {
        if (err) {
          throw err; // display proper error
        }
        console.log('Updated');
        res.sendStatus(200);
      });
    } else {
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

// Update api everyday at 12am
schedule.scheduleJob('00 07 12 * * 0-7', () => {
  getProducts();
  console.log('Scheduled update completed at ' + new Date());
});

router.get('/updateapi', ipfilter(ips, { mode: 'allow' }), getProducts);

module.exports = router;
