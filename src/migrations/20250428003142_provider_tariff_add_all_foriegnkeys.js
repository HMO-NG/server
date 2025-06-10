/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('provider_tariff', table => {
    table.foreign('provider_id').references('provider.id').onDelete('CASCADE');
    table.foreign('created_by').references('user.id').onDelete('CASCADE');

  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('provider_tariff',table =>{
      table.dropForeign('provider_id');
      table.dropForeign('created_by');
  });
}

