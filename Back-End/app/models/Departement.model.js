const mongoose = require('mongoose');

const departement = new mongoose.Schema({

  region_num: {
    type: Number, required: true,
  },

  jour: {
    type: String, required: true,
  },

  departement_num: {
    type: Number, required: true,
  },

  departement_libelle: {
    type: String, required: true,
  },

  // population de référence par raport à la classe d'âge
  pop_ref: {
    type: Number,
    default: -1,
  },

  nbtest_positif: {
    type: Number,
    default: -1,
  },

  nbtest: {
    type: Number,
    default: -1,
  },

  // 10 classes d'age différentes. 0 = toutes
  /*classe_age: {
    type: Number,
    default: -1,
  },*/

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

module.exports = Departement = mongoose.model('departement', departement);
