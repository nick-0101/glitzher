const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  brand: {
    type: String,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  subThumbnail: {
    type: String,
  },
  price: {
    current_price: { type: String },
  },
  reviews: {
    total_reviews: { type: String },
    rating: { type: String },
  },
});

module.exports = mongoose.model('Data', DataSchema, 'data');
