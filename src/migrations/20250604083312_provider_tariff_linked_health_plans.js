/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('tariff_linked_health_plans', table =>{
    table.string('id').primary();
    table.string('tariff_id').notNullable();
    table.string('health_plan_id').notNullable();

    table.timestamps(true, true); // Adds created_at and updated_at

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('tariff_linked_health_plans');
}
