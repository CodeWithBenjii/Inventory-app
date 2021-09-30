const tableNames = require('../../src/utils/constants/tableNames');

exports.seed = function (knex) {
  return knex(tableNames.company)
    .del()
    .then(() =>
      knex(tableNames.company).insert({
        name: 'redbull',
        logo_url: 'https://logos-world.net/wp-content/uploads/2020/11/Red-Bull-Logo.png',
        description: 'Will Surely Give you wings',
        type: 'Energy Drinks',
        website_url: 'https://www.redbull.com/au-en/',
        phone_number: '0412341234',
        email: 'email@email.com',
        address_id: 1,
      })
    );
};
