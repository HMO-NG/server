/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.table('otp', table => {
        table.foreign('user_id').references('user.id').onDelete('cascade');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.table('otp',table =>{
        table.dropForeign('user_id')
    });
}
