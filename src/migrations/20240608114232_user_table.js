/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('user', table => {
        table.specificType('id', 'char(36) primary key');
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('phone_number', 32).notNullable().unique();
        table.string('role', 32).notNullable();
        table.string('type', 8).notNullable(); // provider, client, staff etc.
        table.boolean('verified').defaultTo(false);
        table.string('avatar_url');
        table.string('referral_code', 6).notNullable().unique();
        table.boolean('user_disabled').defaultTo(false);
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('modified_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('last_active_at').notNullable().defaultTo(knex.fn.now());
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('user');
}
