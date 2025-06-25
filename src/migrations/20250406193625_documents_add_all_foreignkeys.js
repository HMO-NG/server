/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('documents', table => {
    table.foreign('user_id').references('user.id').onDelete('CASCADE');
    table.foreign('created_by').references('user.id').onDelete('CASCADE');

  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('documents',table =>{
      table.dropForeign('user_id');
     table.dropForeign('created_by');
  });
}
