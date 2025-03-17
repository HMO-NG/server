/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('beneficiary', table => {
    table.string('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('middle_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('phone_number', 32).nullable().unique();
    table.string('passport_url');
    table.string('sex',10);
    table.date('dob');
    table.string('state');
    table.string('city');
    table.string('address');

    table.string('blood_group').nullable()
    table.string('genotype').nullable()
    table.string('disabilities').nullable()
    table.string('allergies').nullable()
    table.string('pre_existing_conditions').nullable()
    table.string('past_surgeries').nullable()
    table.string('family_medical_history');

    table.string('provider_id').nullable();
    table.boolean('is_active').defaultTo(0);
    table.string('linked_to_user').nullable();
    table.string('beneficiary_of').notNullable(); // the employee that made them thier beneficiary
    table.timestamp('modified_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('beneficiary');
}
