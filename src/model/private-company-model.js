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
        enrolled_by: data.user_id
    }
    return await db("client").insert(createPrivateCompany);
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
                'client.is_active',
                db.raw(`"user"."id" as "user_id"`),
                db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "enrolled_by"`)
            )
            .innerJoin('user', 'user.id', '=', 'client.enrolled_by')
            .orderBy("client.company_name", `asc`)
            return result;
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

