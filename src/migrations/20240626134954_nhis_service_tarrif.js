/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('nhis_service_tarrif', table => {
        table.specificType('id', 'char(36) primary key');
        table.string('name').notNullable();
        table.string('tarrif_type', 36);
        table.string('service_type', 36);
        table.string('nhia_code', 30);
        table.string('category');
        table.string('sub_category');
        table.decimal('price', 10, 2); // Use `decimal` for fixed-point numbers
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
    await knex.schema.dropTable('nhis_service_tarrif');
}
