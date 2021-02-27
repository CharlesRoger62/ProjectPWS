/* eslint-disable linebreak-style */
const { Router } = require('express');
const RegionRouter = require('./regions');
const JourRouter = require('./jours');
const SemaineRouter = require('./semaines');
const DepartementRouter = require('./departements');
const CSVParser = require('./CSV Parser');
var express = require('express');
var router = express.Router();

router.get('/status', (req, res) => res.status(200).json('ok'));

router.use('/serviceregions', RegionRouter);
router.use('/servicejours', JourRouter);
router.use('/servicesemaines', SemaineRouter);
router.use('/servicedepartements', DepartementRouter);
router.use('/servicecsvparser', CSVParser);

module.exports = router;
