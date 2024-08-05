/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('nhis_providers', table => {
        table.string('id').primary();
        table.string('name', 500).notNullable();
        table.string('hcp_id', 64).notNullable();
        table.boolean('is_active').defaultTo(1);
        table.string('created_by',36).notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('nhis_providers');
}
