const express = require('express'),
  ipfilter = require('express-ipfilter').IpFilter;
const amazonScraper = require('amazon-buddy');
const fetch = require('node-fetch');
const schedule = require('node-schedule');
const Data = require('../models/Data');

const router = express.Router();

const ips = ['::1'];

// Update db with new api info
// async function updateDb(products) {
//   const _id = '60108f05160579104738afa3';

//   if (Object.keys(products).length > 0) {
//     await Data.updateOne({ _id }, { $set: { api: products } }, (err) => {
//       if (err) {
//         throw err; // display proper error
//       }
//       console.log('Updated');
//     });
//   } else {
//     return;
//   }
// }

async function getProducts(req, res, next) {
  try {
    console.log('Fetching Data...');

    // Collect 50 products from CA
    const products = await amazonScraper.products({
      keyword: 'Xbox',
      number: 150,
      country: 'CA',
      randomUa: true,
    });

    // Send data to updateDb
    // res.send(updateDb(products));
    const _id = '60108f05160579104738afa3';

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
