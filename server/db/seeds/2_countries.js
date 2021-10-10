const countries = require('../dataFiles/countries.json');
const tableNames = require('../../src/utils/constants/tableNames');

exports.seed = function (knex) {
  return knex(tableNames.country)
    .del()
    .then(() => knex(tableNames.country).insert(countries));
};
