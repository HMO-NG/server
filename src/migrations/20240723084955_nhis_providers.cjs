/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('nhis_providers', table => {
        table.specificType('id', 'char(36) primary key');
        table.string('name', 500).notNullable();
        table.string('hcp_id', 64).notNullable();
        table.boolean('is_active').defaultTo(1);
        table.string('created_by',36).notNullable().references('id').inTable('user').onDelete('cascade');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('nhis_providers')
};
