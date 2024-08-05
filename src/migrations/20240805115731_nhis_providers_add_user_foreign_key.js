/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.table('nhis_providers', table => {
        table.foreign('created_by').references('user.id').onDelete('cascade');

    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.table('nhis_providers',table =>{
        table.dropForeign('created_by')
    });
}
