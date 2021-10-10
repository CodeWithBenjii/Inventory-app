const states = require('../dataFiles/states.json');
const tableNames = require('../../src/utils/constants/tableNames');

exports.seed = function (knex) {
  const temp = [];

  states.forEach((state) => {
    temp.push({
      name: state.name,
      code: state.abbreviation,
    });
  });
  return knex(tableNames.state)
    .del()
    .then(() => knex(tableNames.state).insert(temp));
};
