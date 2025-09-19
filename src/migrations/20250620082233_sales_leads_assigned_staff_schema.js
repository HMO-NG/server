/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('sales_leads_assigned_staff', table =>{
    table.string('id').primary();
    table.string('customer_name').notNullable();
    table.enum('customer_type',['customer','individual']).notNullable();
    table.string('customer_number').notNullable();
    table.string('customer_email').notNullable();
    table.string('customer_address').notNullable();
    table.string('customer_class').notNullable();

    table.timestamps(true, true); // Adds created_at and updated_at
    table.string('created_by').notNullable();

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('sales_leads_assigned_staff');
}

