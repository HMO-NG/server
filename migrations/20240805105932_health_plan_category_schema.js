/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('health_plan_category', table => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.boolean('is_active').defaultTo(1);
        table.string('health_plan_code', 64);
        table.text('description');
        table.string('band',64);
        table.string('created_by').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('health_plan_category');
}
