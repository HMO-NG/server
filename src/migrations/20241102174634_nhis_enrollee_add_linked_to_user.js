/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.alterTable('nhis_enrollee', table => {
        table.string('linked_to_user').nullable();

    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.alterTable('nhis_enrollee', (table) => {
        dropColumn('linked_to_user')
    });
}
