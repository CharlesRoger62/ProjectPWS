/* eslint-disable linebreak-style */
const { Router } = require('express');
const { Departement } = require('../../models');

const router = new Router();

router.get('/', (req, res) => {
  Departement.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

module.exports = router;
