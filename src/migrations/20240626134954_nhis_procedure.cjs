/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('nhis_procedure', table => {

        table.specificType('id', 'char(36) primary key');
        table.string('name').notNullable();
        table.string('tarrif_type', 36);
        table.string('service_type', 36);
        table.string('nhia_code', 30);
        table.string('category');
        table.string('sub_category');
        table.double('price', 10, 2);
        table.string('plan_type', 8).notNullable().references('id').inTable('health_plan').onDelete('cascade');
        table.string('created_by', 36).notNullable().references('id').inTable('user').onDelete('cascade');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('nhis_procedure')
};
