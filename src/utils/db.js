const { Model } = require('objection');

const knex = require('../../knexfile');

module.exports = Model.Knex(knex);
