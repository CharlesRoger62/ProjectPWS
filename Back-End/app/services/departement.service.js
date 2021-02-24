var Departement = require('../models/Departement.model')

exports.findAll = async function(){
    try {
        var departements = await Departement.find({});
        return departements;
    }
    catch (e) {
        throw Error("Some error occurred while retrieving All Departements : "+e.message );
    }
};

exports.findAllWithId = async function(condition){
    try {
        var departements = await Departement.find(condition);
        return departements;
    }
    catch (e) {
        throw Error("Some error occurred while retrieving Departements with departement num = "+ condition.departement_num + " : " + e.message);
    }
}

exports.findAllWithLabel = async function (condition) {
    try {
        console.log(condition);
        var departements = await Departement.find(condition);
        return departements;
    }
    catch (e) {
        throw Error("Some error occurred while retrieving Departements with label = "+ condition.departement_libelle + " : " + e.message);
    }
}

exports.findLastDataWithLabel = async function (condition, sort, limit) {
    try {
        //console.log(condition);
        var departements = await Departement.find(condition);
        return departements;
    }
    catch (e) {
        throw Error("Some error occurred while retrieving Departements with label = "+ condition.departement_libelle + " : " + e.message);
    }
}


exports.findLastDate = async function (sort, limit) {
    try {
        var lastDate = (await Region.find().sort(sort).limit(limit))[0].jour;
        return lastDate
    }
    catch (e) {
        throw Error("Some error occurred while retrieving Last Date");
    }
}

