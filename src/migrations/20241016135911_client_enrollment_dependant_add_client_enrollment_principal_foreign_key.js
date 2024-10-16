/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.table('dependent_enrollment_form_details', table => {
        table.foreign('principal_id').references('principal_enrollment_form_details.id').onDelete('cascade');
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.table('dependent_enrollment_form_details', table =>{
        table.dropForeign('principal_id')
    });
}

