/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('private_enrollee_medical_info', table => {
    table.foreign('linked_to_enrollee').references('user.id').onDelete('CASCADE');

  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('private_enrollee_medical_info',table =>{
      table.dropForeign('linked_to_enrollee')
  });
}
