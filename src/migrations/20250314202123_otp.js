/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('otp', table => {
        table.string('id').primary().notNullable(); // Use UUID for primary key
        table.string('user_id', 36).notNullable();
        table.string('otp_code', 6).notNullable().unique();
        table.string('purpose', 255).notNullable();
        table.string('status', 50).notNullable();
        table.string('delivery_method', 50).notNullable();
        table.timestamp('expires_at').notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP + INTERVAL '15 minutes'"));
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('used_at');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function down(knex) {
    await knex.schema.dropTable('otp');
}
