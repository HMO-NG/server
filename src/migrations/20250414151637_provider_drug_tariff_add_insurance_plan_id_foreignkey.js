/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('provider_drug_tariff', table => {
    table.foreign('insurance_plan_type').references('health_plan_category.id').onDelete('CASCADE');

  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('provider_drug_tariff',table =>{
      table.dropForeign('insurance_plan_type')
  });
}
