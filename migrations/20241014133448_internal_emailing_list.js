/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('internal_emailing_list', table => {
        table.string('id').primary();
        table.string('firstname', 50).notNullable();
        table.string('surname', 50).notNullable();
        table.string('othername', 50);
        table.string('position', 40);
        table.string('designation', 40);
        table.string('phone_number', 11);
        table.string('sex', 7);
        table.string('email_address', 100).notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('internal_emailing_list');
}

