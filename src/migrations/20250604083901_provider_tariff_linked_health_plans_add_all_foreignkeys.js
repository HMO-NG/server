/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('tariff_linked_health_plans', table => {
    table.foreign('tariff_id').references('provider_tariff.id').onDelete('CASCADE');
    table.foreign('health_plan_id').references('health_plan.id').onDelete('CASCADE');

  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('tariff_linked_health_plans',table =>{
      table.dropForeign('tariff_id');
      table.dropForeign('health_plan_id');

  });
}
