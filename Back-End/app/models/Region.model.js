const mongoose = require('mongoose');

const region = new mongoose.Schema({

  // la région possede des données pour un jour donné
  jour: {
    type: String, required: true,
  },

  region_num: {
    type: Number, required: true,
  },

  region_libelle: {
    type: String, required: true,
  },

  // population de référence par raport à la classe d'âge
  pop_ref: {
    type: Number,
  },

  pop_h: {
    type: Number,
  },

  pop_f: {
    type: Number,
  },

  nbtest: {
    type: Number,
  },

  nbtest_h: {
    type: Number,
  },

  nbtest_f: {
    type: Number,
  },

  nbtest_positif: {
    type: Number,
  },

  nbtest_positif_h: {
    type: Number,
  },

  nbtest_positif_f: {
    type: Number,
  },

  // 10 classes d'age différentes. 0 = toutes
  classe_age: {
    type: Number,
  },

  // taux d'incidence
  tx_inc: {
    type: mongoose.Decimal128,
  },
  // taux test positif
  tx_pos: {
    type: mongoose.Decimal128,
  },
  // capacite analytique à calculer
  tx_an: {
    type: mongoose.Decimal128,
  },

});

module.exports = Region = mongoose.model('region', region);
