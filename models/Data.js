const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  api: {
    type: Object,
  },
});

module.exports = mongoose.model('Data', DataSchema);
