/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('client_enrollment_form_details', table => {
        table.string('id').primary();
        table.string('principal_firstname', 50).notNullable();
        table.string('principal_surname', 50).notNullable();
        table.string('principal_othername', 50);
        table.string('principal_occupation', 40);
        table.string('principal_address');
        table.string('principal_phone_number', 12);
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
        table.string('spouse_surname', 50);
        table.string('spouse_othername', 50);
        table.string('spouse_firstname', 50);
        table.string('spouse_address');
        table.string('spouse_occupation', 40);
        table.string('spouse_sex', 10);
        table.string('spouse_phone_number', 12);
        table.string('spouse_email', 100);
        table.string('spouse_dob', 10);
        table.string('spouse_genotype', 2);
        table.string('spouse_blood_group', 3);
        table.string('spouse_profile_pic' );
        table.string('dependent_one_surname', 50);
        table.string('dependent_one_othername', 50);
        table.string('dependent_one_firstname', 50);
        table.string('dependent_one_address');
        table.string('dependent_one_occupation', 40);
        table.string('dependent_one_sex', 10);
        table.string('dependent_one_phone_number', 12);
        table.string('dependent_one_email', 100);
        table.string('dependent_one_dob', 10);
        table.string('dependent_one_genotype', 2);
        table.string('dependent_one_blood_group', 3);
        table.string('dependent_one_profile_pic' );
        table.string('dependent_two_surname', 50);
        table.string('dependent_two_othername', 50);
        table.string('dependent_two_firstname', 50);
        table.string('dependent_two_address');
        table.string('dependent_two_occupation', 40);
        table.string('dependent_two_sex', 10);
        table.string('dependent_two_phone_number', 12);
        table.string('dependent_two_email', 100);
        table.string('dependent_two_dob', 10);
        table.string('dependent_two_genotype', 2);
        table.string('dependent_two_blood_group', 3);
        table.string('dependent_two_profile_pic' );
        table.string('dependent_three_surname', 50);
        table.string('dependent_three_othername', 50);
        table.string('dependent_three_firstname', 50);
        table.string('dependent_three_address');
        table.string('dependent_three_occupation', 40);
        table.string('dependent_three_sex', 10);
        table.string('dependent_three_phone_number', 12);
        table.string('dependent_three_email', 100);
        table.string('dependent_three_dob', 10);
        table.string('dependent_three_genotype', 2);
        table.string('dependent_three_blood_group', 3);
        table.string('dependent_three_profile_pic' );
        table.string('dependent_four_surname', 50);
        table.string('dependent_four_othername', 50);
        table.string('dependent_four_firstname', 50);
        table.string('dependent_four_address');
        table.string('dependent_four_occupation', 40);
        table.string('dependent_four_sex', 10);
        table.string('dependent_four_phone_number', 12);
        table.string('dependent_four_email', 100);
        table.string('dependent_four_dob', 10);
        table.string('dependent_four_genotype', 2);
        table.string('dependent_four_blood_group', 3);
        table.string('dependent_four_profile_pic' );
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('client_enrollment_form_details');
}

