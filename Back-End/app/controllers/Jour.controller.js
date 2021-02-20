const db = require("../models");
const Jour = db.Jour;

//Jour is State data for a Day 

// Retrieve all Jour from the database.
exports.findAll = async (req, res) => {
    await Jour.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Jours."
        });
      });
  };

// Find a single Jour with a date
exports.findOne = async (req, res) => {
    const date = req.params.date;
    await Jour.findOne({date:date})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Jour with date " + date });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Jour with date=" + date });
      });
  };

// Find all Jour with specific age class
exports.findAllForClasse = async (req, res) => {
    const classe_age=req.query.classe_age
    await Jour.find({ classe_age })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all jour with classe age =" + classe_age
        });
      });
  };