/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('benefit_list', table => {
        table.string('id').primary();
        table.string('benefit_name').notNullable();
        table.string('category');
        table.string('sub_category');
        table.string('created_by', 36).notNullable()
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('benefit_list');
}
