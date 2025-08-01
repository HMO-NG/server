/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.alterTable('provider', table => {
        table.string('band_id').unsigned().references('id').inTable('bands').onDelete('SET NULL');

    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.alterTable('provider', (table) => {
        table.dropColumn('band_id')
    });
}
