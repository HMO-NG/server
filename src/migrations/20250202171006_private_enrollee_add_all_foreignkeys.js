/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.table('enrollee', table => {
    table.foreign('enrolled_by').references('user.id').onDelete('CASCADE');
    table.foreign('linked_to_user').references('user.id').onDelete('CASCADE');
    table.foreign('company_id').references('client.id').onDelete('CASCADE');
    table.foreign('provider_id').references('provider.id').onDelete('CASCADE');
    table.foreign('health_plan_id').references('health_plan.id').onDelete('CASCADE');
    table.foreign('primary_enrollee_id').references('enrollee.id').onDelete('CASCADE');
  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.table('enrollee',table =>{
      table.dropForeign('enrolled_by')
      table.dropForeign('linked_to_user')
      table.dropForeign('company_id')
      table.dropForeign('provider_id')
      table.dropForeign('health_plan_id')
      table.dropForeign('primary_enrollee_id')
  });
}
