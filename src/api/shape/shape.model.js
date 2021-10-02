const { Model } = require('objection');
const schema = require('./shape.schema.json');
const db = require('../../db');
const tableNames = require('../../utils/constants/tableNames');
require('dotenv').config();

Model.knex(db);

class Shape extends Model {
  static get tableName() {
    return tableNames.shape;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Shape;
