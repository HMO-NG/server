/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('claims', table => {
    table.foreign('provider_id').references('provider.id').onDelete('CASCADE');
    table.foreign('enrollee_id').references('enrollee.id').onDelete('CASCADE');
    table.foreign('pre_auth_id').references('pre_authorization.id').onDelete('CASCADE');
    table.foreign('created_by').references('user.id').onDelete('CASCADE');
    table.foreign('reviewed_by').references('user.id').onDelete('CASCADE');

  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('claims',table =>{
      table.dropForeign('provider_id');
      table.dropForeign('enrollee_id');
      table.dropForeign('pre_auth_id');
      table.dropForeign('created_by');
      table.dropForeign('reviewed_by');
  });
}
