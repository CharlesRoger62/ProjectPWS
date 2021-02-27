/* eslint-disable linebreak-style */
const express = require('express');
const RegionRouter = require('./regions');
const JourRouter = require('./jours');
const SemaineRouter = require('./semaines');
const DepartementRouter = require('./departements');
const CSVParser = require('./CSV Parser');
const protectedRoute = require('./Protected Route');

const router = express.Router();

router.get('/status', (req, res) => res.status(200).json('server is runing well'));

router.use('/serviceregions', RegionRouter);
router.use('/servicejours', JourRouter);
router.use('/servicesemaines', SemaineRouter);
router.use('/servicedepartements', DepartementRouter);
router.use('/servicecsvparser', CSVParser);
router.use('/protectedservice', protectedRoute);

module.exports = router;
