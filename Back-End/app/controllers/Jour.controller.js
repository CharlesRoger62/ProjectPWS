const db = require('../models');

const { Jour } = db;

// Retrieve all Jour from the database.
exports.findAll = (req, res) => {
  const { date } = req.query;
  const condition = date ? { date: { $regex: new RegExp(date), $options: 'i' } } : {};

  Jour.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while retrieving Jours.',
      });
    });
};

// Find a single Jour with a date
exports.findOne =  (req, res) => {
    const date = req.params.date;
  
    Jour.findOne({date:date})
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

// Find all published Jour
exports.findAllForClasse = (req, res) => {
  const { classe_age } = req.query;
  Jour.find({ classe_age })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || `Some error occurred while retrieving all jour with classe age =${classe_age}`,
      });
    });
  };

  exports.findCovidData = async (req,res) => {
    try {
      var date = req.query.date
      const condition = {classe_age : 0, date: date }
      Jour.find(condition)
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    } catch(e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }
