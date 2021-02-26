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
    const departement_libelle=req.params.departement_libelle;
    var condition_lib= departement_libelle ? { 'departement_libelle' : departement_libelle } : {};
      try {
        var departements = await DepartementService.findAllWithLabel(condition_lib);
        return res.status(200).json({ status: 200, data: departements, message: "Succesfully departements Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
  };

//retrieve last data from a specific departement data with departement libelle
exports.findLastDataWithLabel = async (req, res) => {
  
    var sort = {'jour' : -1};
    try {
        const departement_number=Number.parseInt(req.params.departement_number);
        var lastDate = await DepartementService.findLastDate(sort);
        var condition_lib = departement_number ? { 'departement_num' : departement_number, jour : lastDate } : {};
        var departement = await DepartementService.findLastDataWithLabel(condition_lib);
        return res.status(200).json({ status: 200, data: departement, message: "Succesfully last data Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

};
