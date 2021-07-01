const express = require('express');
const algoliasearch = require('algoliasearch');
const RateLimit = require('express-rate-limit');

const router = express.Router();

// Algolia
const AlgoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_KEY,
  process.env.ALGOLIA_ADMIN_KEY,
  {
    headers: {
      'X-Algolia-UserToken': '100',
    },
  }
);

// Search rate limit
const searchApi = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message:
    'Too many many requests from this IP, please try again after an hour',
});

// Search Api
router.get('/api/search', searchApi, async (req, res) => {
  const { q } = req.query;

  // Validate query
  if (q === '' || q.length < 3 || q.length > 150) {
    res.status(422).send({
      title: 'Invalid query',
      desc: 'Please try again.',
    });
  } else {
    const queries = [
      {
        indexName: 'amazonProducts',
        query: q,
        params: {
          hitsPerPage: 1,
        },
      },
      {
        indexName: 'sephoraProducts',
        query: q,
        params: {
          hitsPerPage: 1,
        },
      },
      {
        indexName: 'shoppersdrugmartProducts',
        query: q,
        params: {
          hitsPerPage: 1,
        },
      },
      {
        indexName: 'wellProducts',
        query: q,
        params: {
          hitsPerPage: 1,
        },
      },
      {
        indexName: 'thebayProducts',
        query: q,
        params: {
          hitsPerPage: 1,
        },
      },
    ];
    AlgoliaClient.multipleQueries(queries)
      .then(({ results }) => {
        // Filter empty results
        const filterResults = results.filter(
          (item) => Array.isArray(item.hits) && !item.hits.length == 0
        );

        // Validation
        if (!Array.isArray(filterResults) || !filterResults.length) {
          res.status(404).send({
            title: 'No result found',
            desc: "We couldn't find any products related to your query.",
          });
        } else {
          // Store Results
          const results = [];
          filterResults.forEach((item) => {
            results.push(item.hits[0]);
          });

          // Sort results
          const sortedResults = results.sort(
            (a, b) =>
              // Special expression is replacing '$'
              a.price.current_price - b.price.current_price
          );

          // Send results
          res.send(sortedResults);
        }
      })
      .catch((err) => {
        res.status(500).send({
          title: "Oops. There's been a problem on our end",
          desc: 'Please try again later. We will look into this immediately.',
        }); // Server error
      });
  }
});

module.exports = router;
