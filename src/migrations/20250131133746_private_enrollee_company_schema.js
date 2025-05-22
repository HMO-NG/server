/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('client', table =>{
    table.string('id').primary();
    table.string('company_name').notNullable();
    table.string('business_type').notNullable();
    table.string('company_heaadquaters').notNullable();
    table.string('primary_contact_position').notNullable();
    table.string('primary_contact_email').notNullable();
    table.string('primary_contact_phonenumber').notNullable();
    table.string('enrolled_by').notNullable(); // created by

    table.decimal('number_of_enrollees').notNullable();
    table.date('payment_start_date').notNullable();
    table.date('payment_end_date').notNullable();
    table.enum('payment_type',['weekly','monthly','quaterly','yearly','bi-annually','capitation']).defaultTo('monthly');

    table.boolean('is_active').defaultTo(1);
    table.timestamps(true, true); // Adds created_at and updated_at

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('client');
}
