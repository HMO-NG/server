/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('provider_linked_bands', table =>{
    table.string('id').primary();
    table.string('band_id').notNullable();
    table.string('provider_id').notNullable();
    table.unique(['band_id', 'provider_id']);

    table.timestamps(true, true); // Adds created_at and updated_at

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('provider_linked_bands');
}

