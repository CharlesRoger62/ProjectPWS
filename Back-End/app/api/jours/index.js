const { Router } = require('express');
const { Jour } = require('../../models');
const jour_controller = require('../../controllers/Jour.controller')

const router = new Router();

router.get('/', (req, res) => {
  Jour.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.get('/covidData', jour_controller.findCovidData);

module.exports = router;
