/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('provider_drug_tariff', table =>{
    table.string('id').primary();
    table.string('item_name').notNullable();
    table.decimal('item_price').notNullable();
    table.string('provider_id').notNullable();
    table.string('insurance_plan_type')

    table.enum('formulation', ['tablet', 'capsule', 'injection', 'liquid']);
    table.string('unit_of_measure', 10)
    table.string('category');
    table.string('strength', 20);

    table.boolean('is_active').defaultTo(true)


    table.timestamp('active_date').defaultTo(knex.fn.now());
    table.timestamp('end_date')
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('date_deactivated')
    table.string('created_by').notNullable();

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('provider_drug_tariff');
}
