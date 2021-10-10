const { Model } = require('objection');
const schema = require('./state.schema.json');
const db = require('../../db');
const tableNames = require('../../utils/constants/tableNames');
require('dotenv').config();

Model.knex(db);

class State extends Model {
  static get tableName() {
    return tableNames.state;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = State;
