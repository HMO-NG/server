/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('sales_leads', table =>{
    table.string('id').primary();
    table.string('customer_name').notNullable();
    table.enum('customer_type',['customer','individual']).notNullable();
    table.string('customer_number').notNullable();
    table.string('customer_email').notNullable();
    table.string('customer_address').notNullable();
    table.string('customer_class').notNullable();

    table.string('LGA').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('country').notNullable();
    table.string('organization_branch').notNullable();
    table.string('size_of_business').notNullable();
    table.string('worth_of_business').notNullable();
    table.enum('status', ['open','suspended','closed']).defaultTo('pending');
    table.string('next_action').notNullable();
    table.string('lead_source').notNullable();
    table.string('additional_info').notNullable();
    table.boolean('is_converted_to_prospect').defaultTo(false)
    table.jsonb('contact').defaultTo('[]');//{ "name": "John Doe", "email": "",phone: "", "position": "" }

    table.timestamps(true, true); // Adds created_at and updated_at
    table.string('created_by').notNullable();

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('sales_leads');
}
