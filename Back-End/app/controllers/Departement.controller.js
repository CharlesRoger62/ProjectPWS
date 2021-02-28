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
  const { departement_libelle } = req.params;
  const condition_lib = departement_libelle ? { departement_libelle } : {};
  try {
    const departements = await DepartementService.findAllWithLabel(condition_lib);
    return res.status(200).json({ status: 200, data_tab: departements, message: 'Succesfully departements Retrieved' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// retrieve last data from a specific departement data with departement libelle
exports.findLastDataWithLabel = async (req, res) => {
  const sort = { jour: -1 };
  try {
    const departement_number = Number.parseInt(req.params.departement_number);
    const lastDate = await DepartementService.findLastDate(sort);
    const condition_lib = departement_number ? { departement_num: departement_number, jour: lastDate } : {};
    const departement = await DepartementService.findLastDataWithLabel(condition_lib);
    return res.status(200).json({ status: 200, data: departement, message: 'Succesfully last data Retrieved' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// retrieve last data from a specific region data with region number
exports.findLastDataWithLabel = async (req, res) => {
  const { departement_number } = req.params;
  if (Number.isInteger(departement_number)) {
    const sort = { jour: -1 };
    try {
      const lastDate = await DepartementService.findLastDate(sort);
      const condition_lib = departement_number ? { departement_num: departement_number, jour: lastDate } : {};
      const departement = await DepartementService.findLastDataWithLabel(condition_lib);
      return res.status(200).json({ status: 200, data: departement, message: 'Succesfully last data Retrieved' });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }
  return res.status(200).json({ status: 200, data: undefined, message: 'Number departement must be an integer' });
};
