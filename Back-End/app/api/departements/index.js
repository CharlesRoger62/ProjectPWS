/* eslint-disable linebreak-style */
const {Router} = require('express');
const departement_controller = require('../../controllers/departement.controller');

const router = new Router();

router.get('/departements', departement_controller.findAll);

router.get('/departements/allDataByRegion/:region_number', departement_controller.findAllByRegionNumber)

router.get('/departement/bynum/:departement_num', departement_controller.findAllWithId);

router.get('/departement/bylib/:departement_libelle', departement_controller.findAllWithLabel);

router.get('/departement/lastdata/:departement_number', departement_controller.findLastDataWithLabel)


module.exports = router;

