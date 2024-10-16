/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('principal_enrollment_form_details', table => {
        table.string('id').primary();
        table.string('principal_firstname', 50).notNullable();
        table.string('principal_surname', 50).notNullable();
        table.string('principal_othername', 50);
        table.string('principal_occupation', 40);
        table.string('principal_address');
        table.string('principal_phone_number', 11);
        table.string('principal_sex', 10);
        table.string('principal_health_plan', 100);
        table.string('principal_genotype', 2);
        table.string('principal_blood_group', 3);
        table.string('principal_email', 100);
        table.string('principal_dob', 10);
        table.string('principal_name_of_employer', 100);
        table.string('principal_address_of_employer');
        table.string('principal_name_of_hospital');
        table.string('principal_profile_pic');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('principal_enrollment_form_details');
}

