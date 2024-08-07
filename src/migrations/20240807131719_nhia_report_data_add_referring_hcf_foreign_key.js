/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// TODO REMOVE THIS FILE NOT BEING USED.
export async function up(knex) {
    await knex.schema.table('nhia_claim', table => {
        table.foreign('referring_hcf').references('nhis_providers.id').onDelete('cascade');

    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.table('nhia_claim',table =>{
        table.dropForeign('referring_hcf')
    });
}
