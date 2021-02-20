const db = require("../models");
const Jour = db.Jour;
const Region = db.Region;

// Retrieve all Region data from the database by number and date.
exports.findAllByRegionNum = async (req, res) => {
    const date = req.query.date;
    const region_num=req.query.region_num;
    var condition_date = date ? { date: { $regex: new RegExp(date), $options: "i" } } : {};
    var condition_region = region_num ? { region_num: { $regex: new RegExp(region_num), $options: "i" } } : {};
    if( condition_region !== undefined ){
      if( condition_date !== undefined ){
      await Region.find(condition_region,condition_date)
    .then(data => {
      res.send(data); 
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Regions by number. for region number ="+ region_num
      });
    });
    } else {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Regions by number. for date ="+ date
      });
    }
  } else{
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Regions by number. for region number ="+ region_num
    });
  };
}
    

// Retrieve all Region data from the database by libelle and date.
  exports.findAllByRegionLibelle = async (req, res) => {
    const date = req.query.date;
    const region_lib=req.query.region_num;
    var condition_date = date ? { date: { $regex: new RegExp(date), $options: "i" } } : {};
    var condition_region = region_lib ? { region_libelle: { $regex: new RegExp(region_lib), $options: "i" } } : {};
    if( condition_region !== undefined ){
      if( condition_date !== undefined ){
      await Region.find(condition_region,condition_date)
    .then(data => {
      res.send(data); 
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Regions by libelle. for region libelle  ="+ region_lib
      });
    });
    } else {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Regions by number. for date ="+ date
      });
    }
  } else{
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Regions by number. for region number ="+ region_num
    });
  };
};

// Find a single Region at date
  exports.findOne = async (req, res) => {
      
    };

// Find all Region for age class at date
  exports.findAllForClasse = async (req, res) => {
    
  };