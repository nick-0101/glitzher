const algoliasearch = require('algoliasearch');

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

module.exports = AlgoliaClient;
