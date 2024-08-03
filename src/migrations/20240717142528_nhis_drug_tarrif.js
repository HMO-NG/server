/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('nhis_drug_tarrif', table => {
        table.specificType('id', 'char(36) primary key');
        table.string('name_of_drug', 500).notNullable();
        table.string('dosage_form', 300);
        table.string('strength', 400);
        table.string('nhia_code', 30);
        table.string('presentation', 100);
        table.string('category');
        table.decimal('price', 10, 2); // Use `decimal` instead of `double` for fixed-point numbers
        table.string('plan_type', 36)
            .notNullable()
            .references('id')
            .inTable('health_plan')
            .onDelete('cascade');
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
    await knex.schema.dropTable('nhis_drug_tarrif');
}
