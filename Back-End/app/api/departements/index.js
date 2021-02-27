/* eslint-disable linebreak-style */
const {Router} = require('express');
const departement_controller = require('../../controllers/departement.controller');

const router = new Router();

router.get('/departements/', departement_controller.findAll);

router.get('/departements/', departement_controller.findAll);

router.get('/departement/bynum/:departementNum', departement_controller.findAllWithId);

router.get('/departement/lastdata/:departement_number', departement_controller.findLastDataWithLabel)

//router.get('/departement/lastdata/:region_number', departement_controller.findLastDataWithLabel)

module.exports = router;

