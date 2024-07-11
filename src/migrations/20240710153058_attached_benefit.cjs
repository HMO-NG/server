/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('attached_benefit', table => {
        table.specificType('id', 'char(36) primary key');
        table.string('benefit_name').notNullable();
        table.string('limit_type', 35).notNullable();
        table.string('limit_value', 20).notNullable();
        table.string('health_plan_name', 36).notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.string('benefit_item_id', 36).notNullable().references('id').inTable('benefit_list').onDelete('cascade');
        table.string('created_by', 36).notNullable().references('id').inTable('user').onDelete('cascade');
        table.string('health_plan_id', 36).notNullable().references('id').inTable('health_plan').onDelete('cascade');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('attached_benefit')

};