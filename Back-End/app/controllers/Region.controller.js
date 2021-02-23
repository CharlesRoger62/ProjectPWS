const db = require('../models');

const { Jour } = db;
const { Region } = db;

// Retrieve all Region data from the database by number and date.
exports.findAllByRegionNum = (req, res) => {
  const { date } = req.query;
  const { region_num } = req.query;
  const condition_date = date ? { date: { $regex: new RegExp(date), $options: 'i' } } : {};
  const condition_region = region_num ? { region_num: { $regex: new RegExp(region_num), $options: 'i' } } : {};
  if (condition_region !== undefined) {
    if (condition_date !== undefined) {
      Region.find(condition_region, condition_date)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
          err.message || `Some error occurred while retrieving Regions by number. for region number =${region_num}`,
          });
        });
    } else {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving Regions by number. for date =${date}`,
      });
    }
  } else {
    res.status(500).send({
      message:
        err.message || `Some error occurred while retrieving Regions by number. for region number =${region_num}`,
    });
  }
};

// Retrieve all Region data from the database by libelle and date.
exports.findAllByRegionLibelle = (req, res) => {
  const { date } = req.query;
  const region_lib = req.query.region_num;
  const condition_date = date ? { date: { $regex: new RegExp(date), $options: 'i' } } : {};
  const condition_region = region_lib ? { region_libelle: { $regex: new RegExp(region_lib), $options: 'i' } } : {};
  if (condition_region !== undefined) {
    if (condition_date !== undefined) {
      Region.find(condition_region, condition_date)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
          err.message || `Some error occurred while retrieving Regions by libelle. for region libelle  =${region_lib}`,
          });
        });
    } else {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving Regions by number. for date =${date}`,
      });
    }
  } else {
    res.status(500).send({
      message:
        err.message || `Some error occurred while retrieving Regions by number. for region number =${region_num}`,
    });
  }
};

// Retrive all Regions with class_age === 0
exports.findAllByClass0 = (req, res) => {
  Region.find({ classe_age: 0 })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
};


// Find a single Region at date
exports.findOne = (req, res) => {

};

// Find all Region for age class at date
exports.findAllForClasse = (req, res) => {

};
