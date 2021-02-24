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