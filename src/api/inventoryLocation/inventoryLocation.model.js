const { Model } = require('objection');
const schema = require('./inventoryLocation.schema.json');
const db = require('../../db');
const tableNames = require('../../utils/constants/tableNames');
require('dotenv').config();

Model.knex(db);

class InventoryLocation extends Model {
  static get tableName() {
    return tableNames.inventory_location;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = InventoryLocation;
