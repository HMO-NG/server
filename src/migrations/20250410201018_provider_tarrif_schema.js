/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('provider_service_tariff', table =>{
    table.string('id').primary();
    table.string('item_name').notNullable();
    table.decimal('item_price').notNullable();
    table.string('provider_id').notNullable();
    table.string('insurance_plan_type')

    table.string('hcpcs_code').notNullable();
    table.boolean('is_active').defaultTo(true)


    table.boolean('is_surgical').defaultTo(false);
    table.enum('patient_type', ['inpatient', 'outpatient']);
    table.string('category');

    table.timestamp('active_date').defaultTo(knex.fn.now());
    table.timestamp('end_date').nullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('date_deactivated');
    table.string('created_by').notNullable();

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('provider_service_tariff');
}
