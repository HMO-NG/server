import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
let db = knex(config[process.env.NODE_ENV || 'development']);


export async function createPrivateCompanyModel(data) {
    const createPrivateCompany = {
        id: uuidv4(),
        company_name: data.company_name,
        business_type: data.business_type,
        company_heaadquaters: data.company_heaadquaters,
        primary_contact_position: data.primary_contact_position,
        primary_contact_email: data.primary_contact_email,
        primary_contact_phonenumber: data.primary_contact_phonenumber,

        number_of_enrollees: data.number_of_enrollees,
        payment_start_date: data.payment_start_date,
        payment_end_date: data.payment_end_date,
        payment_type: data.payment_type,
        enrolled_by: data.user_id
    }

    // return await db("client").insert(createPrivateCompany).returning('*');
    const new_client= await db("client").insert(createPrivateCompany).returning('*');
     await Promise.all(
    data.health_plan_id.map((planId) => {
      return db("client_linked_health_plans").insert({
        id: uuidv4(),
        client_id: new_client[0].id,
        health_plan_id: planId,
    });
    }))
    return new_client;

}

export async function getAllPrivateCompany() {
    try {
       let result = await db('client')
            .select(
                'client.id',
                'client.company_name',
                'client.business_type',
                'client.company_heaadquaters',
                'client.primary_contact_position',
                'client.primary_contact_email',
                'client.primary_contact_phonenumber',
                'client.number_of_enrollees',
                'client.is_active',
                db.raw(`"user"."id" as "user_id"`),
                db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "enrolled_by"`)
            )
            .innerJoin('user', 'user.id', '=', 'client.enrolled_by')
            .orderBy("client.company_name", `asc`)

            const enrichedResult =await Promise.all(
             result.map(async(enr) => {

              const countResult = await db('enrollee')
               .where('enrollee.company_id', enr.id)
               .count();

               return {
                 ...enr,
                 count: parseInt(countResult[0].count, 10) ,// convert from string to number
                 number_of_enrollees: parseInt(enr.number_of_enrollees),
               };
             }))

            return enrichedResult;
    } catch (error) {
        console.log(error)
    }
}


export async function changePrivateCompanyStatusModel(data,id) {
  const changePrivateCompanyStatus = {
      is_active: data.is_active
  }
  return await db("client").where('id',id).update(changePrivateCompanyStatus).returning('is_active');
}

export async function updateClientModel(data,id) {
  const updateClient = {
    company_name: data.company_name,
    business_type: data.business_type,
    company_heaadquaters: data.company_heaadquaters,
    primary_contact_position: data.primary_contact_position,
    primary_contact_email: data.primary_contact_email,
    primary_contact_phonenumber: data.primary_contact_phonenumber,
  }
  return await db("client").where('id',id).update(updateClient);
}

