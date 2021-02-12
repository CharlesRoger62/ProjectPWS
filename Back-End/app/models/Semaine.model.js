/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const semaine = new mongoose.Schema({

  name: {
    type: String, required: true,
  },

  semaine: {
    type: [Object],
  },

});

const Semaine = mongoose.model('semaine', semaine);
module.exports = Semaine;
