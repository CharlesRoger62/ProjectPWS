const mongoose = require('mongoose');

const departement = new mongoose.Schema({

    departement_num :{
      type: Number,
    },

    departement_libelle:{
        type: String,
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
  
  module.exports = Departement = mongoose.model('region', departement);