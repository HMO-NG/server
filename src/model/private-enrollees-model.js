import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
let db = knex(config[process.env.NODE_ENV || 'development']);


export async function createPrivateEnrolleeModel(data,company_id,enrolled_by) {

    const createPrivateEnrollee = {
        id: uuidv4(),
        first_name:data.first_name,
        last_name:data.last_name,
        middle_name:data.middle_name,
        email:data.email,
        phone_number:data.phone_number,
        passport_url:data.passport_url,
        sex:data.sex,
        department:data.department,
        position:data.position,
        dob:data.dob,
        beneficiary_type:data.beneficiary_type,
        family_size:data.family_size,
        state:data.state,
        city:data.city,
        address:data.address,
        company_id:company_id,
        provider_id:data.provider_id,
        // linked_to_user
        enrolled_by:enrolled_by
    }
    return await db("enrollee").insert(createPrivateEnrollee).returning('*');
}
export async function getAllProviderNameAndIdModel() {
    try {

       let result = await db('provider')
            .select(
                'provider.id',
                'provider.name',
            )
            return result;
    } catch (error) {
        console.log(error)
    }
}

export async function getPrivateEnrolleeByIdModel(id) {
  try {

  return await db('enrollee').select().where('id', id).first();
  } catch (error) {
    console.error("Error fetching private enrollee by ID:", error);
    throw error;
  }
}
export async function updatePrivateEnrolleeByIdAndCreateProfileModel(id,data,profile_id) {
  try {

  const updatePrivateEnrollee = {
    first_name:data.first_name,
    last_name:data.last_name,
    middle_name:data.middle_name,
    email:data.email,
    phone_number:data.phone_number,
    passport_url:data.passport_url,
    sex:data.sex,
    department:data.department,
    position:data.position,
    dob:data.dob,
    beneficiary_type:data.beneficiary_type,
    family_size:data.family_size,
    state:data.state,
    city:data.city,
    address:data.address,

    blood_group:data.blood_group,
    genotype:data.genotype,
    disabilities:data.disabilities,
    allergies:data.allergies,
    pre_existing_conditions:data.pre_existing_conditions,
    past_surgeries:data.past_surgeries,
    family_medical_history:data.family_medical_history,
    provider_id:data.provider_id,
    is_active:data.is_active,
    linked_to_user:profile_id
}


  return await db('enrollee').where('id', id).update(updatePrivateEnrollee)
  } catch (error) {
    console.error("Error fetching private enrollee by ID:", error);
    throw error;
  }
}


export async function createPrivateEnrolleeDependantsModel(data,beneficiary_of,profile_id) {

  const createDependants = {
      id: uuidv4(),
      first_name:data.first_name,
      last_name:data.last_name,
      middle_name:data.middle_name,
      email:data.email,
      phone_number:data.phone_number,
      passport_url:data.passport_url,
      sex:data.sex,
      dob:data.dob,
      state:data.state,
      city:data.city,
      address:data.address,

      blood_group:data.blood_group,
      genotype:data.genotype,
      disabilities:data.disabilities,
      allergies:data.allergies,
      pre_existing_conditions:data.pre_existing_conditions,
      past_surgeries:data.past_surgeries,
      family_medical_history:data.family_medical_history,
      beneficiary_of:beneficiary_of,
      is_active:data.is_active,
      linked_to_user:profile_id
  }
  return await db("beneficiary").insert(createDependants)
}

export async function getAllPrivateEnrolleeModel() {
  try {

  let result =await db('enrollee').select(
    'enrollee.id',
    'enrollee.first_name',
    'enrollee.last_name',
    'enrollee.middle_name',
    'enrollee.email',
    'enrollee.phone_number',
    'enrollee.passport_url',
    'enrollee.sex',
    'enrollee.department',
    'enrollee.position',
    'enrollee.dob',
    'enrollee.beneficiary_type',
    'enrollee.family_size',
    'enrollee.state',
    'enrollee.city',
    'enrollee.address',
    'enrollee.is_active',
    'enrollee.company_id',
    'enrollee.provider_id',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"client"."company_name" as "company_name"`),
    'enrollee.linked_to_user',
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "enrolled_by"`)

)
.innerJoin("client","client.id", '=' , "enrollee.company_id")
.innerJoin('user', 'user.id', '=', 'enrollee.enrolled_by')
.leftJoin("provider","provider.id", '=' , "enrollee.provider_id")
  return result
  } catch (error) {
    console.error("Error fetching private enrollee by ID:", error);
    throw error;
  }
}


export async function getPrivateEnrolleeByClientIdModel(id) {
  try {

  let result =await db('enrollee').select(
    'enrollee.id',
    'enrollee.first_name',
    'enrollee.last_name',
    'enrollee.middle_name',
    'enrollee.email',
    'enrollee.phone_number',
    'enrollee.passport_url',
    'enrollee.sex',
    'enrollee.department',
    'enrollee.position',
    'enrollee.dob',
    'enrollee.beneficiary_type',
    'enrollee.family_size',
    'enrollee.state',
    'enrollee.city',
    'enrollee.address',
    'enrollee.is_active',
    'enrollee.company_id',
    'enrollee.provider_id',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"client"."company_name" as "company_name"`),
    'enrollee.linked_to_user',
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "enrolled_by"`)

).where('enrollee.company_id',id)
.innerJoin("client","client.id", '=' , "enrollee.company_id")
.innerJoin('user', 'user.id', '=', 'enrollee.enrolled_by')
.leftJoin("provider","provider.id", '=' , "enrollee.provider_id")
let count =await db('enrollee').where('enrollee.company_id',id).count()

  return {result,count}
  } catch (error) {
    console.error("Error fetching private enrollee by ID:", error);
    throw error;
  }
}


export async function onboardSinglePrivateEnrolleeModel(data,profile_id) {

  const createPrivateEnrollee = {
      id: uuidv4(),
      first_name:data.first_name,
      last_name:data.last_name,
      middle_name:data.middle_name,
      email:data.email,
      phone_number:data.phone_number,
      passport_url:data.passport_url,
      sex:data.sex,
      department:data.department,
      position:data.position,
      dob:data.dob,
      beneficiary_type:data.beneficiary_type,
      family_size:data.family_size,
      state:data.state,
      city:data.city,
      address:data.address,

      blood_group:data.blood_group,
      genotype:data.genotype,
      disabilities:data.disabilities,
      allergies:data.allergies,
      pre_existing_conditions:data.pre_existing_conditions,
      past_surgeries:data.past_surgeries,
      family_medical_history:data.family_medical_history,
      provider_id:data.provider_id,
      is_active:data.is_active,

      company_id:data.company_id,
      provider_id:data.provider_id,
      linked_to_user:profile_id,
      enrolled_by:data.enrolled_by
  }
  return await db("enrollee").insert(createPrivateEnrollee).returning('*');
}
