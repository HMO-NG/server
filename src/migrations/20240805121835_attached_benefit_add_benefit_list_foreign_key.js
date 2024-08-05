/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.table('attached_benefit', table => {
        table.foreign('benefit_item_id').references('benefit_list.id').onDelete('cascade');

    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.table('attached_benefit',table =>{
        table.dropForeign('benefit_item_id')
    });
}
