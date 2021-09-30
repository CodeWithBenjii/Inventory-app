const { Model } = require('objection');
const schema = require('./address.schema.json');
const db = require('../../db');
const tableNames = require('../../utils/constants/tableNames');
const State = require('../state/state.model');
const Country = require('../Counties/counties.model');

Model.knex(db);

class Address extends Model {
  static get tableName() {
    return tableNames.address;
  }

  static get jsonSchema() {
    return schema;
  }

  static relationMappings() {
    return {
      state: {
        relation: Model.BelongsToOneRelation,
        modelClass: State,
        join: {
          from: `${tableNames.state}.id`,
          to: `${tableNames.address}.state_id`,
        },
      },
      country: {
        relation: Model.BelongsToOneRelation,
        modelClass: Country,
        join: {
          from: `${tableNames.country}.id`,
          to: `${tableNames.address}.country_id`,
        },
      },
    };
  }
}

module.exports = Address;
