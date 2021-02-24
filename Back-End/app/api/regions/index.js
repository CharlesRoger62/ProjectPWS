const { Router } = require('express');
const { Region } = require('../../models');
const region_controller = require('../../controllers/Region.controller');

const router = new Router();

router.get('/', (req, res) => {
  Region.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.get('/findById/:id', (req, res) => {
  Region.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.post('/', async (req, res) => {
  try {
    const {
      name, numero, pop,
    } = req.body;
    const region = {};
    region.name = name;
    region.numero = numero;
    region.pop = pop;
    const regionModel = new Region(region);
    await regionModel.save((err) => {
      if (err) {
        console.log('Ooops, something gone wrong');
      } else {
        console.log('Data has been saved! ');
      }
    });
    res.status(201).json(regionModel);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/region/lastdata/', region_controller.findLastData);

module.exports = router;
