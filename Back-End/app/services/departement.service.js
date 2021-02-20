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




