/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('pre_authorization', table =>{
    table.string('id').primary();
    table.decimal('requested_total_price').nullable();
    table.decimal('approved_price').nullable();
    table.string('diagnosis').notNullable
    table.string('provider_id').notNullable();
    table.string('enrollee_id').notNullable();
    table.string('pa_code').nullable();
    table.enum('status', ['pending', 'approved', 'denied','partially approved']).defaultTo('pending');
    table.jsonb('selected_tariffs').defaultTo('[]');//{"id":"t267gd","quantity":2,"status":"denied,"comment":"deneid for inconsistenies"}
    table.jsonb('related_documents').defaultTo('[]');// eg[{ "url": "https://res.cloudinary.com/.../image1.jpg"},{ "url": "https://res.cloudinary.com/.../thumb1.jpg" },{ "url": "https://res.cloudinary.com/.../image2.jpg"}]

    table.text('provider_comment').nullable();
    table.date('approval_date').nullable();
    table.text('denial_reason').nullable();
    table.timestamps(true, true); // Adds created_at and updated_at
    table.string('created_by').notNullable();

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('pre_authorization');
}
