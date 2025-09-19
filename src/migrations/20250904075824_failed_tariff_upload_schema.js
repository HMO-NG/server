/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('failed_provider_tariff', table =>{
    table.string('id').primary();
    table.string('reason_for_failure');
    table.dateTime('uploaded_at').defaultTo(knex.fn.now());
    table.string('item_name');
    table.string('item_price');
    table.string('description');
    table.string('provider_id');

    table.string('tariff_type');
    table.string('created_by');

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('failed_provider_tariff');
}
