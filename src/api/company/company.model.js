const { Model } = require('objection');
const schema = require('./company.schema.json');
const db = require('../../db');
const tableNames = require('../../utils/constants/tableNames');
const Address = require('../address/address.model');

Model.knex(db);

class Company extends Model {
  static get tableName() {
    return tableNames.company;
  }

  static get jsonSchema() {
    return schema;
  }

  static relationMappings() {
    return {
      Address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Address,
        join: {
          from: `${tableNames.address}.id`,
          to: `${tableNames.company}.address_id`,
        },
      },
    };
  }
}

module.exports = Company;
