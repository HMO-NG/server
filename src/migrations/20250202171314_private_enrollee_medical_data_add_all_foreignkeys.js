/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('enrollee_medical_data', table => {
    table.foreign('enrollee_id').references('enrollee.id').onDelete('CASCADE');
  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('enrollee_medical_data',table =>{
      table.dropForeign('enrollee_id')
  });
}
