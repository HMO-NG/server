/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('private_company', table =>{
    table.string('id').primary();
    table.string('company_name').notNullable();
    table.string('business_type').notNullable();
    table.string('company_heaadquaters').notNullable();
    table.string('primary_contact_position').notNullable();
    table.string('primary_contact_email').notNullable();
    table.string('primary_contact_phonenumber').notNullable();
    table.string('enrolled_by').notNullable(); // created by
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('private_company');
}
