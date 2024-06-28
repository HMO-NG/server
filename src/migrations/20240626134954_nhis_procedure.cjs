/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('nhis_procedure', table => {

        table.specificType('id', 'char(36) primary key');
        table.string('name').notNullable();
        table.string('type', 20);
        table.string('code', 20);
        table.string('category');
        table.string('sub_category');
        table.double('price', 10, 2);
        table.string('plan_type', 8).defaultTo('nhis');
        table.string('created_by', 36).notNullable().references('id').inTable('user').onDelete('cascade');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('nhis_procedure')
};
