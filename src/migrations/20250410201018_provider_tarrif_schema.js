/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('provider_tariff', table =>{
    table.string('id').primary();
    table.string('item_name').notNullable();
    table.decimal('item_price').notNullable();
    table.string('description')
    table.string('provider_id').notNullable();
    table.boolean('available_to_all_plans').defaultTo(false);

    table.boolean('is_active').defaultTo(true)
    table.enum('tariff_type', ['procedure', 'medication','consultation','unknown']).defaultTo('unknown')

    table.boolean('is_surgical').defaultTo(false);
    table.string('hcpcs_code');
    table.enum('patient_type', ['inpatient', 'outpatient','both']);
    table.enum('service_type', ['primary', 'secondary','tertiary']).defaultTo('primary');

    table.string('category');

    table.timestamp('active_date').defaultTo(knex.fn.now());
    table.timestamp('end_date').nullable();

    table.timestamps(true, true); // Adds created_at and updated_at
    table.timestamp('date_deactivated');
    table.string('created_by').notNullable();

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('provider_tariff');
}
