/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('provider', table => {
        table.specificType('id', 'char(36) primary key');
        table.string('name', 100).notNullable();
        table.string('email', 64).notNullable();
        table.string('address');
        table.string('phone_number', 16);
        table.string('state', 16);
        table.boolean('status').defaultTo(1);
        table.string('code', 16); //LAG/12345
        table.string('medical_director_name', 64);
        table.string('medical_director_phone_no', 16);
        table.string('created_by',36).notNullable().references('id').inTable('user').onDelete('cascade');
        table.string('modified_by', 36);
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('modified_at')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('provider')
};
