/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('nhis_enrollee', table => {

        table.specificType('id', 'char(36) primary key');
        table.string('policy_id').notNullable();
        table.string('relationship', 36);
        table.string('surname');
        table.string('other_names');
        table.timestamp('dob');
        table.string('sex',10);
        table.string('company_id',10);
        table.string('provider_id', 16)
        table.string('provider_name')
        table.string('provider_Address')
        table.string('plan_type', 36).notNullable().references('id').inTable('health_plan').onDelete('cascade');
        table.string('created_by', 36).notNullable().references('id').inTable('user').onDelete('cascade');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('nhis_enrollee')
};
