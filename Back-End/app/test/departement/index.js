/* eslint-disable linebreak-style */
const { assert } = require('chai');
const mocha = require('mocha');
const DepartementService = require('../../services/departement.service');

mocha.describe('Departements Service', () => {
  mocha.describe('Departement find All', () => {
    it('Is not null ', () => {
      assert.isNotNull(DepartementService.findAll);
    });

    it('Is object', () => {
      assert.isObject(DepartementService.findAll);
    });
  });

  mocha.describe('Departement find All with Id', () => {
    it('Is not null ', () => {
      assert.isNotNull(DepartementService.findAllWithId);
    });

    it('Is object', () => {
      assert.isObject(DepartementService.findAllWithId);
    });
  });

  mocha.describe('Departement find All with Label', () => {
    it('Is not null ', () => {
      assert.isNotNull(DepartementService.findAllWithLabel);
    });

    it('Is object', () => {
      assert.isObject(DepartementService.findAllWithLabel);
    });
  });
});
