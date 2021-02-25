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

exports.findLastDataWithLabel = async function (condition) {
    try {
        var departement = await Departement.findOne(condition);
        console.log(departement)
        return departement;
    }
    catch (e) {
        throw Error("Some error occurred while retrieving Departements with label = "+ condition.departement_number + " : " + e.message);
    }
}


exports.findLastDate = async function (sort) {
    try {
        var lastDate = (await Departement.findOne().sort(sort)).jour;
        return lastDate
    }
    catch (e) {
        throw Error("Some error occurred while retrieving Last Date");
    }
}
