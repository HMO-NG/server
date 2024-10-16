/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.table('nhis_drug_tarrif', table => {
        table.foreign('plan_type').references('health_plan.id').onDelete('cascade');

    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.table('nhis_drug_tarrif',table =>{
        table.dropForeign('plan_type')
    });
}
