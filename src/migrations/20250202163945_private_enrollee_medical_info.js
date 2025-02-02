/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('private_enrollee_medical_info', table => {
    table.string('id').primary();
    table.string('blood_group').nullable()
    table.string('genotype').nullable()
    table.string('disabilities').nullable()
    table.string('allergies').nullable()
    table.string('pre_existing_conditions').nullable()
    table.string('past_surgeries').nullable()
    table.date('family_medical_history');
    table.string('linked_to_enrollee').notNullable(); // the private employee main table
    table.timestamp('modified_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('private_enrollee_medical_info');
}
