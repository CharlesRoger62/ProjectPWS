const db = require("../models");
var DepartementService = require('../services/departement.service')    


exports.findAll = async(req,res) =>{
  try {
    var departements = await DepartementService.findAll();
    return res.status(200).json({ status: 200, data: departements, message: "Succesfully departements Retrieved" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

//retrieve a specific departement data with departement num
exports.findAllWithId = async(req, res) => {
    const departement_num=parseInt(req.params.departement_num,10);
    var condition_num= departement_num ? { 'departement_num' :departement_num } : {};
      try {
        console.log(condition_num);
        var departements = await DepartementService.findAllWithId(condition_num);
        return res.status(200).json({ status: 200, data: departements, message: "Succesfully departements Retrieved" });
      } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
      }
  };

  //retrieve a specific departement data with departement libelle
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
