const mongoose = require('mongoose');
const Region = require('./Region.model');
const Classe_age = require('./Classe_Age.model')
//données pour un jour en france
const jour = new mongoose.Schema({
  //données pour les régions
  region_data :{
    type:[Region],
  },

  //population de référence par raport à la classe d'âge
  pop_ref :{
    type : Number
  },

  classe_age:{
    type : Number
  },

  date: {
    type: String,
  },

  pop_h: {
    type: Number,
  },
  
  pop_f: {
    type: Number,
  },

  nbtest:{
      type:Number,
  },

  nbtest_h:{
    type:Number,
  },

  nbtest_f:{
    type:Number,
  },
  
  nbtest_positif:{
    type:Number,
  },

  nbtest_positif_h:{
    type:Number
  },

  nbtest_positif_f:{
    type:Number
  },

  //10 classes d'age différentes. 0 = toutes
  classe_age:{
    type:[Classe_Age]
  },

  //taux d'incidence
  tx_inc:{
    type:mongoose.Decimal128
  },

  //taux test positif
  tx_pos:{
    type:mongoose.Decimal128
  },
  
  //capacite analytique
  tx_an:{
    type:mongoose.Decimal128
  }

});

module.exports = Jour = mongoose.model('region', jour);
