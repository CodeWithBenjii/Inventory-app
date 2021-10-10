const tableNames = require('../../src/utils/constants/tableNames');

exports.seed = function (knex) {
  return knex(tableNames.address)
    .del()
    .then(() =>
      knex(tableNames.address).insert([
        {
          address_line_1: '123 Demo Street',
          city: 'Adelaide',
          state_id: 5,
          country_id: 14,
          zip_code: '5000',
        },
        {
          address_line_1: '55 Doody St',
          city: 'Alexandria',
          state_id: 2,
          country_id: 14,
          zip_code: '5000',
        },
      ])
    );
};
