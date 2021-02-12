/* eslint-disable linebreak-style */const { Router } = require('express');
const RegionRouter = require('./regions');
const JourRouter = require('./jours');
const SemaineRouter = require('./semaines');
const DepartementRouter = require('./departements');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/regions', RegionRouter);
router.use('/jours', JourRouter);
router.use('/semaines', SemaineRouter);
router.use('/departements', DepartementRouter);

module.exports = router;
