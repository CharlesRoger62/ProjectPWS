const mongoose = require('mongoose');

const departement = new mongoose.Schema({

    region_num:{
        type: Number, required:true
    },

    departement_num :{
      type: Number, required:true
    },

    departement_libelle:{
        type: String, required:true
    },

    //population de référence par raport à la classe d'âge
    pop_ref: {
        type: Number,
    },
    
    nbtest_positif:{
        type:Number,
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
    //capacite analytique à calculer
    tx_an:{
        type:mongoose.Decimal128
    }
    

  });
  
  module.exports = Departement = mongoose.model('departement', departement);
