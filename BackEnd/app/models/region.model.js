const mongoose = require('mongoose');
const departement = require('./Departement.model');

const region = new mongoose.Schema({
    departement_data :[{
        type:Departement,
    }],

    region_libelle:{
        type:String,
    },

    region_num:{
        type:Number,
    },

    //population de référence par raport à la classe d'âge
    pop_ref: {
        type: Number,
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
    }

});

module.exports = Region = mongoose.model('region', region);