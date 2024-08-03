/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('health_plan', table => {
        table.specificType('id', 'char(36) primary key');
        table.string('plan_name', 100).notNullable();
        table.string('plan_type').notNullable();
        table.boolean('allow_dependent').defaultTo(false);
        table.string('max_dependant', 6).notNullable();
        table.string('plan_age_limit', 6).notNullable();
        table.string('plan_cost', 16).notNullable();
        table.boolean('disabled_plan').defaultTo(false);
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.string('plan_category', 36)
            .notNullable()
            .references('id')
            .inTable('health_plan_category')
            .onDelete('cascade');
        table.string('created_by', 36)
            .notNullable()
            .references('id')
            .inTable('user')
            .onDelete('cascade');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('health_plan');
}
