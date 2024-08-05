/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('attached_benefit', table => {
        table.string('id').primary();
        table.string('benefit_name').notNullable();
        table.string('limit_type', 35).notNullable();
        table.string('limit_value', 20).notNullable();
        table.string('health_plan_name', 36).notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.string('benefit_item_id').notNullable();
        table.string('created_by').notNullable();
        table.string('health_plan_id').notNullable();
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('attached_benefit');
}
