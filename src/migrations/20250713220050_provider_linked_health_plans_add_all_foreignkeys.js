/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('provider_linked_health_plans', table => {
    table.foreign('provider_id').references('provider.id').onDelete('CASCADE');
    table.foreign('health_plan_id').references('health_plan.id').onDelete('CASCADE');

  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('provider_linked_health_plans',table =>{
      table.dropForeign('provider_id');
      table.dropForeign('health_plan_id');

  });
}
