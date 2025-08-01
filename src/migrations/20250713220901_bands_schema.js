/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('bands', table => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.text('description').nullable();
        table.boolean('is_active').defaultTo(1);
        table.string('created_by').notNullable();
        table.timestamps(true, true); // Adds created_at and updated_at
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('bands');
}
