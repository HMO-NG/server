/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('nhia_report', table => {
        table.string('id').primary();
        table.string('nhia_enrollee_name').notNullable();
        table.string('nhia_enrollee_id', 36).notNullable();
        table.string('referring_hcf', 36)
        table.string('recieving_hcf', 36)
        table.string('referral_code')
        table.string('approval_date')
        table.string('date_hmo_recieved_claim')
        table.text('diagnosis') //TODO
        table.jsonb('items')
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.string('created_by', 36).notNullable();
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('nhia_report');
}
