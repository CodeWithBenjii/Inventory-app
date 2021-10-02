const tableName = require('../../src/utils/constants/tableNames');

/**
 * @param {import('knex')} knex
 */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableName.user, (table) => {
      table.increments('id').primary();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('name').notNullable();
      table.dateTime('last_login');
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now(6));
      table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now(6));
      table.dateTime('deleted_at');
    }),
    knex.schema.createTable(tableName.shape, (table) => {
      table.increments('id').primary();
      table.string('name');
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
      table
        .integer('shape_id')
        .references('id')
        .inTable(tableName.shape)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
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
      table
        .integer('state_id')
        .references('id')
        .inTable(tableName.state)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('country_id')
        .references('id')
        .inTable(tableName.country)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
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
      table
        .integer('address_id')
        .references('id')
        .inTable(tableName.address)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    }),
    knex.schema.createTable(tableName.item, (table) => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .references('id')
        .inTable(tableName.user)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('description');
      table
        .integer('item_type_id')
        .references('id')
        .inTable(tableName.item_type)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('company_id')
        .references('id')
        .inTable(tableName.company)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('size_id')
        .references('id')
        .inTable(tableName.size)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('sku').notNullable();
      table.boolean('sparks_joy');
    }),
    knex.schema.createTable(tableName.item_image, (table) => {
      table.increments('id').primary();
      table
        .integer('item_id')
        .references('id')
        .inTable(tableName.item)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('image_url');
    }),
    knex.schema.createTable(tableName.related_item, (table) => {
      table.increments('id').primary();
      table
        .integer('item_id')
        .references('id')
        .inTable(tableName.item)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('related_item_id')
        .references('id')
        .inTable(tableName.item)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    }),
    knex.schema.createTable(tableName.item_info, (table) => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .references('id')
        .inTable(tableName.user)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('item_id')
        .references('id')
        .inTable(tableName.item)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.dateTime('created_at').notNullable();
      table.dateTime('updated_at').notNullable();
      table.dateTime('deleted_at');
      table.dateTime('purchase_date');
      table.dateTime('expiration_date');
      table
        .integer('retailer_id')
        .references('id')
        .inTable(tableName.company)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.dateTime('last_used');
      table.integer('purchase_price');
      table.integer('msrp');
      table
        .integer('inventory_location_id')
        .references('id')
        .inTable(tableName.inventory_location)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all([
    knex.schema.dropTableIfExists(tableName.related_item),
    knex.schema.dropTableIfExists(tableName.item_info),
    knex.schema.dropTableIfExists(tableName.item_image),
    knex.schema.dropTableIfExists(tableName.item),
    knex.schema.dropTableIfExists(tableName.user),
    knex.schema.dropTableIfExists(tableName.size),
    knex.schema.dropTableIfExists(tableName.shape),
    knex.schema.dropTableIfExists(tableName.inventory_location),
    knex.schema.dropTableIfExists(tableName.item_type),
    knex.schema.dropTableIfExists(tableName.company),
    knex.schema.dropTableIfExists(tableName.address),
    knex.schema.dropTableIfExists(tableName.country),
    knex.schema.dropTableIfExists(tableName.state),
  ]);
};
