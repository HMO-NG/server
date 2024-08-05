/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.table('attached_benefit', table => {
        table.foreign('health_plan_id').references('health_plan.id').onDelete('cascade');

    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.table('attached_benefit',table =>{
        table.dropForeign('health_plan_id')
    });
}
