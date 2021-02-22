/* eslint-disable linebreak-style */
const DepartementService = require('../services/departement.service');

exports.findAll = async (req, res) => {
  try {
    const departements = await DepartementService.findAll();
    return res.status(200).json({ status: 200, data_tab: departements, message: 'Succesfully all departements Retrieved' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// retrieve a specific departement data with departement num
exports.findAllWithId = async (req, res) => {
  const departementNum = parseInt(req.params.departement_num, 10);
  const conditionNum = departementNum ? { departementNum } : {};
  try {
    const departements = await DepartementService.findAllWithId(conditionNum);
    return res.status(200).json({ status: 200, data_tab: departements, message: 'Succesfully departements with Id Retrieved' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// retrieve a specific departement data with departement libelle
exports.findAllWithLabel = async (req, res) => {
  const { departementLibelle } = req.params;
  const conditionLib = departementLibelle ? { departement_libelle: departementLibelle } : {};
  try {
    const departements = await DepartementService.findAllWithLabel(conditionLib);
    return res.status(200).json({ status: 200, data_tab: departements, message: 'Succesfully departements with Label Retrieved' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};


    //retrieve last data from a specific departement data with departement libelle
exports.findLastDataWithLabel = async (req, res) => {
  console.log("ca passe")
  const departement_libelle=req.params.departement_libelle;
  console.log(req.params)
  var condition_lib= departement_libelle ? { 'departement_libelle' : departement_libelle } : {};
  var sort = {'jour' : -1};
  var limit = 1;
    try {
      var departements = await DepartementService.findLastDataWithLabel(condition_lib, sort, limit);
      return res.status(200).json({ status: 200, data: departements, message: "Succesfully last data Retrieved" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
};