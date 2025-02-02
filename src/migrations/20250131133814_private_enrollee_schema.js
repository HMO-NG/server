/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('private_employees', table => {
    table.string('id').primary(); // Use UUID for primary key
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('middle_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('phone_number', 32).notNullable().unique();
    table.string('passport_url');
    table.string('sex',10);
    table.string('department');
    table.string('position');
    table.date('dob');
    table.string('beneficiary_type').nullable();
    table.string('family_size').nullable();
    table.string('state');
    table.string('city');
    table.string('address');
    table.string('company_id').notNullable();
    table.string('linked_to_user').nullable();
    table.string('enrolled_by').notNullable(); //created by
    table.timestamp('modified_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  });

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('private_employees');
}
