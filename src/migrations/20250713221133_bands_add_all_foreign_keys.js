/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('bands', table => {
    table.foreign('created_by').references('user.id').onDelete('CASCADE');
  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('bands',table =>{
      table.dropForeign('created_by');
  });
}
