const withImages = require('next-images');

module.exports = {
  // basePath: '/blog',
  ...withImages(),
  future: {
    webpack5: true,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
};
