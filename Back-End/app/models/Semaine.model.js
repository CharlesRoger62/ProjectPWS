
const mongoose = require('mongoose');
const Jour = require('./Jour.model');

const Semaine = new mongoose.Schema({

  name:{
      type:String, isrequired:true
  },

  semaine:{
    type:[Jour],
  }

});

module.exports = Semaine = mongoose.model('region', semaine);
