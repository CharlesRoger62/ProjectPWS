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


    //retrieve last data from a specific region data with region number
exports.findLastDataWithLabel = async (req, res) => {
  console.log("ca passe")
  const region_number=req.params.region_number;
  console.log(req.params)
  
  var sort = {'jour' : -1};
  var limit = 1;
    try {
      var lastDate = await DepartementService.findLastDate(sort, limit);
      var condition_lib= region_number ? { 'region_num' : region_number, jour : lastDate } : {};
      var departements = await DepartementService.findLastDataWithLabel(condition_lib, sort, limit);
      return res.status(200).json({ status: 200, data: departements, message: "Succesfully last data Retrieved" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
};