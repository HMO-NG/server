/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('dependent_enrollment_form_details', table => {
        table.string('id').primary();
        table.string('dependent_firstname', 50).notNullable();
        table.string('dependent_surname', 50).notNullable();
        table.string('dependent_othername', 50);
        table.string('dependent_occupation', 40);
        table.string('dependent_address');
        table.string('dependent_type');
        table.string('dependent_phone_number', 11);
        table.string('dependent_sex', 10);
        table.string('dependent_genotype', 2);
        table.string('dependent_blood_group', 3);
        table.string('dependent_email', 100);
        table.string('dependent_dob', 10);
        table.string('principal_id', 36);
        table.string('dependent_name_of_hospital');
        table.string('dependent_profile_pic');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('dependent_enrollment_form_details');
}

