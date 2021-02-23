/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const departementController = require('../../controllers/Departement.controller');

router.get('/departements', departementController.findAll);

router.get('/departement/bynum/:departementNum', departementController.findAllWithId);

router.get('/departement/bylib/:departementLibelle', departementController.findAllWithLabel);

module.exports = router;
