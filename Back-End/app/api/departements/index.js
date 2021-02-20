/* eslint-disable linebreak-style */
var express = require('express');
var router = express.Router();
const departement_controller = require('../../controllers/Departement.controller');

router.get('/departements', departement_controller.findAll);

router.get('/departement/bynum/:departement_num',departement_controller.findAllWithId);

router.get('/departement/bylib/:departement_libelle',departement_controller.findAllWithLabel);

module.exports = router;
