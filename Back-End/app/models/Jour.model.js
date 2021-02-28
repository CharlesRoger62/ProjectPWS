const mongoose = require('mongoose');
// données pour un jour en france
const jour = new mongoose.Schema({

  date: {
    type: String, required: true,
  },

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

  // capacite analytique doit être calculé
  tx_an: {
    type: Number,
    default: -1,
  },

});

module.exports = Jour = mongoose.model('jour', jour);
