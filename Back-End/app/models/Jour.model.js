const mongoose = require('mongoose');
//données pour un jour en france
const jour = new mongoose.Schema({

  //population de référence par raport à la classe d'âge
  pop_ref :{
    type : Number
  },

  classe_age:{
    type : Number
  },

  date: {
    type: String, isrequired:true
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
    type:Number
  },

  //taux d'incidence
  tx_inc:{
    type:mongoose.Decimal128
  },

  //taux test positif
  tx_pos:{
    type:mongoose.Decimal128
  },
  
  //capacite analytique doit être calculé
  tx_an:{
    type:mongoose.Decimal128
  }

});

module.exports = Jour = mongoose.model('region', jour);
