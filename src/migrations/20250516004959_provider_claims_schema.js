/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('claims', table =>{
    table.string('id').primary();
    table.string('claim_type').notNullable(); // e.g., outpatient, inpatient
    table.string('diagnosis').notNullable();

    // table.decimal('claim_amount', 12, 2).notNullable();
    table.jsonb('claimed_services').defaultTo('[]') // service items, quantities, etc.
    table.date('encounter_date').nullable();
    table.date('admitted_date').nullable();
    table.date('discharged_date').nullable();

    // Foreign keys
    table.string('enrollee_id').notNullable();
    table.string('provider_id').notNullable();
    table.string('pre_auth_id').nullable();
    table.string('created_by').notNullable();

    table.string('pa_code').notNullable();

    // Review/approval
    table.enum('status', ['pending', 'approved', 'denied','partially approved']).defaultTo('pending');
    table.decimal('requested_amount', 12, 2).defaultTo(0);
    table.decimal('approved_amount', 12, 2).defaultTo(0);
    table.string('reviewed_by').nullable();
    table.text('review_comment').nullable();
    table.timestamp('reviewed_at').nullable();

    // Payment
    table.string('payment_status').defaultTo('unpaid'); // unpaid, paid
    table.timestamp('paid_at').nullable();

    // Supporting documents
    table.jsonb('related_documents').defaultTo('[]');

    table.timestamps(true, true); // Adds created_at and updated_at

  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('claims');
}
