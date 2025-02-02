/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('private_beneficiaries', table => {
    table.foreign('beneficiary_of').references('private_employees.id').onDelete('CASCADE');

  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('private_beneficiaries',table =>{
      table.dropForeign('beneficiary_of')
  });
}
