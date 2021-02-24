/* eslint-disable linebreak-style */
const express = require('express');

router.get('/departements/', departement_controller.findAll);

router.get('/departements', departementController.findAll);

router.get('/departement/bynum/:departementNum', departementController.findAllWithId);

router.get('/departement/lastdata/:region_number',departement_controller.findLastDataWithLabel)

module.exports = router;

