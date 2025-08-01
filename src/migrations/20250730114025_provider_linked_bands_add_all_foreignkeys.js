/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('provider_linked_bands', table => {
    table.foreign('provider_id').references('provider.id').onDelete('CASCADE');
    table.foreign('band_id').references('bands.id').onDelete('CASCADE');

  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('provider_linked_bands',table =>{
      table.dropForeign('provider_id');
      table.dropForeign('band_id');

  });
}
