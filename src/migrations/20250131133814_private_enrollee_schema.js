/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('enrollee', table => {
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
    table.enum('enrollee_type',['primary','beneficiary']).nullable();
    table.integer('family_size').nullable();
    table.string('state');
    table.string('city');
    table.string('address');

    table.string('health_plan_id')
    table.string('provider_id').nullable();
    table.string('company_id').nullable();
    table.string('linked_to_user').nullable();
    table.string('primary_enrollee_id').nullable(); // the enrollee that made them thier beneficiary
    table.boolean('is_active').defaultTo(0);
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
 //await knex.raw('ALTER TABLE beneficiary DROP CONSTRAINT beneficiary_beneficiary_of_foreign');
// await knex.raw('ALTER TABLE pre_authorization DROP CONSTRAINT pre_authorization_enrollee_id_foreign');
  await knex.schema.dropTable('enrollee');
}
