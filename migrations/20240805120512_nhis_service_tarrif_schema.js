/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('nhis_service_tarrif', table => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('tarrif_type', 36);
        table.string('service_type', 36);
        table.string('nhia_code', 30);
        table.string('category');
        table.string('sub_category');
        table.double('price', 10, 2);
        table.string('plan_type', 36).notNullable();
        table.string('created_by', 36).notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('nhis_service_tarrif');
}
