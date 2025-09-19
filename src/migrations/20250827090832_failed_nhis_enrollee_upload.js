/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('failed_nhis_enrollee', table => {
        table.string('id').primary();
        table.string('reason_for_failure');
        table.dateTime('uploaded_at').defaultTo(knex.fn.now());
        table.string('policy_id')
        table.string('relationship');
        table.string('surname');
        table.string('other_names');
        table.string('dob');
        table.string('sex');
        table.string('company_id');
        table.string('provider_id');
        table.string('provider_name');
        table.string('provider_Address');
        table.string('created_by');

    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('failed_nhis_enrollee');
}
