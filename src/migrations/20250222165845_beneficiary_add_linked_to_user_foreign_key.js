/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

  export async function up(knex) {
    await knex.schema.table('beneficiary', table => {
      table.foreign('linked_to_user').references('user.id').onDelete('CASCADE');

    });
  }

  /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
  export async function down(knex) {
    await knex.schema.table('beneficiary',table =>{
        table.dropForeign('linked_to_user')
    });
  }

