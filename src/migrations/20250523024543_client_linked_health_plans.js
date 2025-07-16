/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('client_linked_health_plans', table =>{
    table.string('id').primary();
    table.string('client_id').notNullable();
    table.string('health_plan_id').notNullable();
    table.unique(['client_id', 'health_plan_id']);

    table.timestamps(true, true); // Adds created_at and updated_at

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('client_linked_health_plans');
}
