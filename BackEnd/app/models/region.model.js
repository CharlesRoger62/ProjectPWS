const mongoose = require('mongoose');

const region = new mongoose.Schema({
  name: {
    type: String,
  },
  numero: {
    type: Number,
  },
  pop: {
    type: Number,
  },

});

module.exports = Region = mongoose.model('region', region);
