/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('nhis_enrollee', table => {
        table.specificType('id', 'char(36) primary key');
        table.string('policy_id').notNullable();
        table.string('relationship', 36);
        table.string('surname');
        table.string('other_names');
        table.string('dob'); // Consider using date type if it represents a date
        table.string('sex', 10);
        table.string('company_id', 10);
        table.string('provider_id', 16);
        table.string('provider_name');
        table.string('provider_address'); // Fixed typo from 'provider_Address' to 'provider_address'
        table.string('created_by', 36)
            .notNullable()
            .references('id')
            .inTable('user')
            .onDelete('cascade');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('nhis_enrollee');
}
