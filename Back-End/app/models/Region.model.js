const mongoose = require('mongoose');

const region = new mongoose.Schema({

  // la région possede des données pour un jour donné
  jour: {
    type: String, required: true,
  },

  region_num: {
    type: Number, required: true,
  },

  /*region_libelle: {
    type: String, required: true,
  },*/

  // population de référence par raport à la classe d'âge
  pop_ref: {
    type: Number,
    default: -1,
  },

  pop_h: {
    type: Number,
    default: -1,
  },

  pop_f: {
    type: Number,
    default: -1,
  },

  nbtest: {
    type: Number,
    default: -1,
  },

  nbtest_h: {
    type: Number,
    default: -1,
  },

  nbtest_f: {
    type: Number,
    default: -1,
  },

  nbtest_positif: {
    type: Number,
    default: -1,
  },

  nbtest_positif_h: {
    type: Number,
    default: -1,
  },

  nbtest_positif_f: {
    type: Number,
    default: -1,
  },

  // 10 classes d'age différentes. 0 = toutes
  classe_age: {
    type: Number,
    default: -1,
  },

  // taux d'incidence
  tx_inc: {
    type: Number,
    default: -1,
  },
  // taux test positif
  tx_pos: {
    type: Number,
    default: -1,
  },
  // capacite analytique à calculer
  tx_an: {
    type: Number,
    default: -1,
  },

});

module.exports = Region = mongoose.model('region', region);
