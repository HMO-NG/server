/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.alterTable('health_plan', table => {
           table.string('band_id').references('id').inTable('bands').onDelete('CASCADE');

    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.alterTable('health_plan', (table) => {
        table.dropColumn('band_id')
    });
}
