import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
import { DoesDataExist } from "../util/reusable.js";
let db = knex(config[process.env.NODE_ENV || 'development']);


export async function createPrivateEnrolleeModel(data,company_id,enrolled_by) {
try{
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
        health_plan_id:data.health_plan_id,
        company_id:company_id,
        provider_id:data.provider_id,
        enrolled_by:enrolled_by
    }
    if (await DoesDataExist('enrollee','email',data.email)) {
        return `enrollee already exists!`;
    }else{
    return await db("enrollee").insert(createPrivateEnrollee).returning('id');}
  } catch (error) {
    console.log(error)
}
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

   const enrollee_data=await db('enrollee').select(
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
         'enrollee.enrollee_type',
         'enrollee.family_size',
         'enrollee.state',
         'enrollee.city',
         'enrollee.address',
         'enrollee.is_active',
         'enrollee.company_id',
         'enrollee.provider_id',
         db.raw(`"provider"."name" as "provider_name"`),
         db.raw(`"client"."company_name" as "company_name"`),
         db.raw(`"health_plan"."plan_name" as "plan_name"`),
         'enrollee.linked_to_user',
         db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "enrolled_by"`),
         'enrollee.created_at'

  ).where('enrollee.id', id).first()
  .leftJoin("client","client.id", '=' , "enrollee.company_id")
  .innerJoin('user', 'user.id', '=', 'enrollee.enrolled_by')
  .leftJoin("provider","provider.id", '=' , "enrollee.provider_id")
  .leftJoin("health_plan","health_plan.id", '=' , "enrollee.health_plan_id")

  const medical_data=await db('enrollee_medical_data').select(
         'enrollee_medical_data.blood_group',
         'enrollee_medical_data.genotype',
         'enrollee_medical_data.disabilities',
         'enrollee_medical_data.allergies',
         'enrollee_medical_data.pre_existing_conditions',
         'enrollee_medical_data.past_surgeries',
         'enrollee_medical_data.family_medical_history'
  ).where('enrollee_medical_data.enrollee_id', id).first()
  // const enrollee={enrollee_data}
  if (medical_data) {
  enrollee_data.medical_data=medical_data}

  return enrollee_data


  } catch (error) {
    console.error("Error fetching private enrollee by ID:", error);
    throw error;
  }
}
export async function updatePrivateEnrolleeByIdModel(id,data) {
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

    health_plan_id:data.health_plan_id,
    provider_id:data.provider_id,
    is_active:data.is_active,
    linked_to_user:data.profile_id
}
 const updateMedicalData = {
    blood_group:data.blood_group,
    genotype:data.genotype,
    disabilities:data.disabilities,
    allergies:data.allergies,
    pre_existing_conditions:data.pre_existing_conditions,
    past_surgeries:data.past_surgeries,
    family_medical_history:data.family_medical_history
 }

  // return await db('enrollee').where('id', id).update(updatePrivateEnrollee)
  const update_enrollee = await db('enrollee').where('id', id).update(updatePrivateEnrollee)
  const update_medical_data = await db('enrollee_medical_data').where('enrollee_id', id).update(updateMedicalData)
  if (update_enrollee && update_medical_data) {
    return {update_enrollee,update_medical_data}
  }
  } catch (error) {
    console.error("Error fetching private enrollee by ID:", error);
    throw error;
  }
}


export async function createPrivateEnrolleeDependantsModel(data,beneficiary_of,profile_id) {

  // const createDependants = {
  //     id: uuidv4(),
  //     first_name:data.first_name,
  //     last_name:data.last_name,
  //     middle_name:data.middle_name,
  //     email:data.email,
  //     phone_number:data.phone_number,
  //     passport_url:data.passport_url,
  //     sex:data.sex,
  //     dob:data.dob,
  //     state:data.state,
  //     city:data.city,
  //     address:data.address,

  //     blood_group:data.blood_group,
  //     genotype:data.genotype,
  //     disabilities:data.disabilities,
  //     allergies:data.allergies,
  //     pre_existing_conditions:data.pre_existing_conditions,
  //     past_surgeries:data.past_surgeries,
  //     family_medical_history:data.family_medical_history,
  //     primary_enrollee_id:beneficiary_of,
  //     is_active:data.is_active,
  //     linked_to_user:profile_id
  // }
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
      enrollee_type:'beneficiary',
      state:data.state,
      city:data.city,
      address:data.address,

      provider_id:data.provider_id,
      is_active:data.is_active,

      health_plan_id:data.health_plan_id,
      primary_enrollee_id:beneficiary_of,
      company_id:data.company_id,
      provider_id:data.provider_id,
      linked_to_user:profile_id,
      enrolled_by:data.enrolled_by
  }
  let createMedical
  const createEnrollee= await db("enrollee").insert(createPrivateEnrollee).returning(['id']);

  if (createEnrollee){
    createMedical = await db("enrollee_medical_data").insert({
          id: uuidv4(),
          enrollee_id:createEnrollee[0].id,
          blood_group:data.blood_group,
          genotype:data.genotype,
          disabilities:data.disabilities,
          allergies:data.allergies,
          pre_existing_conditions:data.pre_existing_conditions,
          past_surgeries:data.past_surgeries,
          family_medical_history:data.family_medical_history,
  });
}else{
  console.error("Error creating dependant:", error);
}


 // await db('enrollee').where('id', beneficiary_of).update({family_size:data.family_size})
  if(createEnrollee && createMedical) return createEnrollee
  // return await db('enrollee').insert(createDependants)
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
    'enrollee.enrollee_type',
    'enrollee.family_size',
    'enrollee.state',
    'enrollee.city',
    'enrollee.address',
    'enrollee.is_active',
    'enrollee.company_id',
    'enrollee.provider_id',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"client"."company_name" as "company_name"`),
    db.raw(`"health_plan"."plan_name" as "plan_name"`),
    'enrollee.linked_to_user',
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "enrolled_by"`),
    'enrollee.created_at'

)
.leftJoin("client","client.id", '=' , "enrollee.company_id")
.innerJoin('user', 'user.id', '=', 'enrollee.enrolled_by')
.leftJoin("provider","provider.id", '=' , "enrollee.provider_id")
 .leftJoin("health_plan","health_plan.id", '=' , "enrollee.health_plan_id")
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
    'enrollee.enrollee_type',
    'enrollee.family_size',
    'enrollee.state',
    'enrollee.city',
    'enrollee.address',
    'enrollee.is_active',
    'enrollee.company_id',
    'enrollee.provider_id',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"client"."company_name" as "company_name"`),
    db.raw(`"health_plan"."plan_name" as "plan_name"`),
    'enrollee.linked_to_user',
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "enrolled_by"`),
    'enrollee.created_at'

).where('enrollee.company_id',id)
.innerJoin("client","client.id", '=' , "enrollee.company_id")
.innerJoin('user', 'user.id', '=', 'enrollee.enrolled_by')
.leftJoin("provider","provider.id", '=' , "enrollee.provider_id")
.leftJoin("health_plan","health_plan.id", '=' , "enrollee.health_plan_id")
let count =await db('enrollee').where('enrollee.company_id',id).count()

  return {result,count}
  } catch (error) {
    console.error("Error fetching private enrollee by ID:", error);
    throw error;
  }
}


export async function onboardSinglePrivateEnrolleeModel(data,profile_id) {
 try{
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
      enrollee_type:'primary',
      family_size:data.family_size,
      state:data.state,
      city:data.city,
      address:data.address,

      provider_id:data.provider_id,
      is_active:data.is_active,

      health_plan_id:data.health_plan_id,
      company_id:data.company_id,
      provider_id:data.provider_id,
      linked_to_user:profile_id,
      enrolled_by:data.enrolled_by
  }
  let createMedical
  const createEnrollee= await db("enrollee").insert(createPrivateEnrollee).returning(["id", "beneficiary_type", "family_size","linked_to_user"]);
console.log("createEnrollee",createEnrollee)
  if (createEnrollee){
    createMedical = await db("enrollee_medical_data").insert({
          id: uuidv4(),
          enrollee_id:createEnrollee[0].id,
          blood_group:data.blood_group,
          genotype:data.genotype,
          disabilities:data.disabilities,
          allergies:data.allergies,
          pre_existing_conditions:data.pre_existing_conditions,
          past_surgeries:data.past_surgeries,
          family_medical_history:data.family_medical_history,
  });
}else{
  console.error("Error creating Enrollee:", error);
}

  if(createEnrollee && createMedical) return createEnrollee


}catch(error){
  console.error(error)
  throw error;
}
}
