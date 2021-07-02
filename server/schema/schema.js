const { gql } = require('apollo-server-express');

// Clients
const AlgoliaClient = require('../clients/algolia');
const {
  GET_ASYNC,
  GET_CACHE_ASYNC,
  SET_CACHE_ASYNC,
} = require('../clients/redis');

const typeDefs = gql`
  type PriceType {
    current_price: String
  }

  type ReviewsType {
    rating: String
  }

  type Search {
    brand: String
    title: String
    url: String
    thumbnail: String
    price: PriceType
    reviews: ReviewsType
  }

  type Product {
    brand: String
    title: String
    url: String
    thumbnail: String
    price: PriceType
    reviews: ReviewsType
  }

  type Query {
    results(query: String!, first: Int): [Search]
    products(page: String, limit: String, sortBy: String): [Product]
  }
`;

const resolvers = {
  Query: {
    results: (parent, args) => {
      const queries = [
        {
          indexName: 'amazonProducts',
          query: args.query,
          params: {
            hitsPerPage: 1,
          },
        },
        {
          indexName: 'sephoraProducts',
          query: args.query,
          params: {
            hitsPerPage: 1,
          },
        },
        {
          indexName: 'shoppersdrugmartProducts',
          query: args.query,
          params: {
            hitsPerPage: 1,
          },
        },
        {
          indexName: 'wellProducts',
          query: args.query,
          params: {
            hitsPerPage: 1,
          },
        },
        {
          indexName: 'thebayProducts',
          query: args.query,
          params: {
            hitsPerPage: 1,
          },
        },
      ];
      return AlgoliaClient.multipleQueries(queries).then(({ results }) => {
        // Filter empty results
        const filterResults = results.filter(
          (item) => Array.isArray(item.hits) && !item.hits.length == 0
        );

        // Validation
        if (!Array.isArray(filterResults) || !filterResults.length) {
          let error = new Error('No result found');
          error.desc = "We couldn't find any products related to your query.";

          return error;
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
          return sortedResults;
        }
      });
    },
    async products(parent, args) {
      try {
        const reply = await GET_CACHE_ASYNC('cacheData');
        if (reply) {
          // Prep data
          const data = JSON.parse(reply);
          const dataCount = Object.keys(data).length;

          // Querys
          const page = parseInt(args.page) || 1;
          const limit = parseInt(args.limit) || dataCount;
          const sortBy = args.sortBy || 'popular';

          // Sort Data
          let filterResults = data.filter(
            (item) =>
              item.price.current_price !== 0 && item.price.current_price !== ''
          );
          let sortedResults;

          if (sortBy === 'low') {
            // Sort by lowest to highest
            sortedResults = filterResults.sort((x, y) => {
              return x.price.current_price - y.price.current_price;
            });

            // Add Pages
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const dataResult = sortedResults.slice(startIndex, endIndex);

            // Send Data
            return dataResult;
          } else if (sortBy === 'high') {
            // Sort by lowest to highest
            sortedResults = filterResults.sort((x, y) => {
              return y.price.current_price - x.price.current_price;
            });

            // Add Pages
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const dataResult = sortedResults.slice(startIndex, endIndex);

            // Send Data
            return dataResult;
          } else {
            // Add Pages
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const dataResult = filterResults.slice(startIndex, endIndex);

            // Send Data
            return dataResult;
          }
        } else {
          // -------------------- UnCached Data --------------------- //

          //  Get frontPage data
          const response = await GET_ASYNC('frontPage');

          // Expire
          const nd = new Date().setHours(23, 59, 59);
          const expire = Math.floor((nd - Date.now()) / 1000);

          // Cache front page data
          await SET_CACHE_ASYNC('cacheData', response, 'EX', expire);

          // Prep data
          const data1 = JSON.parse(response);
          const dataCount1 = Object.keys(data1).length;

          // Querys
          const page1 = parseInt(req.query.page) || 1;
          const limit1 = parseInt(req.query.limit) || dataCount1;

          // Add Pages
          const startIndex1 = (page1 - 1) * limit1;
          const endIndex1 = page1 * limit1;
          const dataResult1 = data1.slice(startIndex1, endIndex1);

          // Filter data
          const filterResults1 = dataResult1.filter(
            (item) =>
              item.price.current_price !== 0 && item.price.current_price !== ''
          );

          return filterResults1;
        }
      } catch (err) {
        // Server error
        let error = new Error("Oops. There's been a problem on our end");
        error.desc =
          'Please try again later. We will look into this immediately..';
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
