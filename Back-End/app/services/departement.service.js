/* eslint-disable linebreak-style */
const Departement = require('../models/Departement.model');

exports.findAll = async () => {
  try {
    const departements = await Departement.find({});
    return departements;
  } catch (e) {
    throw Error(`Some error occurred while retrieving All Departements : ${e.message}`);
  }
};

exports.findAllWithId = async (condition) => {
  try {
    const departements = await Departement.find(condition);
    return departements;
  } catch (e) {
    throw Error(`Some error occurred while retrieving Departements with departement num = ${condition.departement_num} : ${e.message}`);
  }
};

exports.findAllWithLabel = async (condition) => {
  try {
    const departements = await Departement.find(condition);
    return departements;
  } catch (e) {
    throw Error(`Some error occurred while retrieving Departements with label = ${condition.departement_libelle} : ${e.message}`);
  }
};

exports.findLastDataWithLabel = async function (condition, sort, limit) {
    try {
        //console.log(condition);
        var departements = await Departement.find(condition).sort(sort).limit(limit);
        return departements;
    }
    catch (e) {
        throw Error("Some error occurred while retrieving Departements with label = "+ condition.departement_libelle + " : " + e.message);
    }
}




