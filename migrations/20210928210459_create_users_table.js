const tableName = require('../src/constants/tableNames');

/**
 * @param {import('knex')} knex
 */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableName.user, (table) => {
      table.increments('id').primary();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.dateTime('last_login');
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
      table.dateTime('deleted_at');
    }),
    knex.schema.createTable(tableName.shape, (table) => {
      table.increments('id').primary();
      table.string('shape');
    }),
    knex.schema.createTable(tableName.inventory_location, (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description');
      table.string('image_url');
    }),
    knex.schema.createTable(tableName.size, (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('width');
      table.integer('height');
      table.integer('length');
      table.integer('shape_id').references('id').inTable(tableName.shape);
      table.integer('volume');
    }),
    knex.schema.createTable(tableName.item_type, (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    }),
    knex.schema.createTable(tableName.country, (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('code').notNullable();
    }),
    knex.schema.createTable(tableName.state, (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('code').notNullable();
    }),
    knex.schema.createTable(tableName.address, (table) => {
      table.increments('id').primary();
      table.string('address_line_1').notNullable();
      table.string('address_line_2');
      table.string('city').notNullable();
      table.integer('state_id').references('id').inTable(tableName.state);
      table.integer('country_id').references('id').inTable(tableName.country);
      table.string('zip_code').notNullable();
      table.string('longitude');
      table.string('latitude');
    }),
    knex.schema.createTable(tableName.company, (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('logo_url');
      table.string('description');
      table.string('type');
      table.string('website_url');
      table.string('phone_number');
      table.string('email');
      table.integer('address_id').references('id').inTable(tableName.address);
    }),
    knex.schema.createTable(tableName.item, (table) => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable(tableName.user);
      table.string('name').notNullable();
      table.string('description');
      table.integer('item_type_id').references('id').inTable(tableName.item_type);
      table.integer('company_id').references('id').inTable(tableName.company);
      table.integer('size_id').references('id').inTable(tableName.size);
      table.string('sku').notNullable();
      table.boolean('sparks_joy');
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all([
    knex.schema.dropTableIfExists(tableName.user),
    knex.schema.dropTableIfExists(tableName.size),
    knex.schema.dropTableIfExists(tableName.shape),
    knex.schema.dropTableIfExists(tableName.inventory_location),
    knex.schema.dropTableIfExists(tableName.item_type),
    knex.schema.dropTableIfExists(tableName.company),
    knex.schema.dropTableIfExists(tableName.address),
    knex.schema.dropTableIfExists(tableName.country),
    knex.schema.dropTableIfExists(tableName.state),
    knex.schema.dropTableIfExists(tableName.item),
  ]);
};
