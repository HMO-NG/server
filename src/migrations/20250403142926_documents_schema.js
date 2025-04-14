/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('documents', table =>{
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('url').notNullable();
    table.string('user_type').notNullable();
    table.string('user_id').notNullable();
    table.string('created_by').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('documents');
}
