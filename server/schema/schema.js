const { gql } = require('apollo-server-express');

// Clients
const AlgoliaClient = require('../clients/algolia');

const typeDefs = gql`
  type Search {
    brand: String
    title: String
    url: String
    thumbnail: String
  }

  type Query {
    results(query: String!): [Search]
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
          return sortedResults;
        }
      });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
