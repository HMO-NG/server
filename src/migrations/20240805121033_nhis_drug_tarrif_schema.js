/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('nhis_drug_tarrif', table => {
        table.string('id').primary();
        table.string('name_of_drug',500).notNullable();
        table.string('dosage_form', 300);
        table.string('strength', 400);
        table.string('nhia_code', 30);
        table.string('presentation', 100);
        table.string('category');
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
    await knex.schema.dropTable('nhis_drug_tarrif');
}
