/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('enrollee_medical_data', table => {
    table.string('id').primary();
    table.string('enrollee_id').notNullable().unique();

    table.string('blood_group').nullable();
    table.string('genotype').nullable();
    table.string('disabilities').nullable();
    table.string('allergies').nullable();
    table.string('pre_existing_conditions').nullable();
    table.string('past_surgeries').nullable();
    table.string('family_medical_history');

    table.timestamps(true, true); // Adds created_at and updated_at

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('enrollee_medical_data');
}
