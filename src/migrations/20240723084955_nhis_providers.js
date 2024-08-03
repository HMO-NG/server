/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('nhis_providers', table => {
        table.specificType('id', 'char(36) primary key');
        table.string('name', 500).notNullable();
        table.string('hcp_id', 64).notNullable();
        table.boolean('is_active').defaultTo(true); // Changed default value to true for boolean
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
    await knex.schema.dropTable('nhis_providers');
}
