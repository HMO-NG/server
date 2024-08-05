/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('nhis_enrollee', table => {
        table.string('id').primary();
        table.string('policy_id').notNullable();
        table.string('relationship', 36);
        table.string('surname');
        table.string('other_names');
        table.string('dob');
        table.string('sex',10);
        table.string('company_id',10);
        table.string('provider_id', 16);
        table.string('provider_name');
        table.string('provider_Address');
        table.string('created_by').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('nhis_enrollee');
}
