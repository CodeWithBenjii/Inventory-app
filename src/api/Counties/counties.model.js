const { Model } = require('objection');
const schema = require('./counties.schema.json');
const db = require('../../db');
const tableNames = require('../../utils/constants/tableNames');
require('dotenv').config();

Model.knex(db);

class Counties extends Model {
  static get tableName() {
    return tableNames.country;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Counties;
