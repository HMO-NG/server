/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// TODO it seems this file is not being used so delete. The "nhis_enrollee.policy_id" is
//not unique to one nhia enrollee
export async function up(knex) {
    await knex.schema.table('nhia_claim', table => {
        table.foreign('nhia_enrollee_id').references('nhis_enrollee.policy_id').onDelete('cascade');

    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.table('nhia_claim',table =>{
        table.dropForeign('nhia_enrollee_id')
    });
}
