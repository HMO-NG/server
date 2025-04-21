import knex from "knex";
import { v4 as uuidv4, v4 } from 'uuid'
import config from '../knexfile.js'
import { DoesDataExist } from "../util/reusable.js";
let db = knex(config[process.env.NODE_ENV || 'development']);

// create provider

export async function createProviderModel(providerDetails) {

    try {
        const data = {
            id: uuidv4(),
            name: providerDetails.name,
            email: providerDetails.email,
            address: providerDetails.address,
            phone_number: providerDetails.phone_number,
            code: providerDetails.code,
            state: providerDetails.state,
            medical_director_name: providerDetails.medical_director_name,
            medical_director_phone_no: providerDetails.medical_director_phone_no,
            created_by: providerDetails.user_id
        }

        if (await DoesDataExist('provider','name',providerDetails.name)) {
          return 'provider already exists!';
        }else{
          await db("provider").insert(data);

          return data
        }
        // insert into db

    } catch (error) {
        console.log(error)
    }

}

//get all providers and can also search
export async function getAllProviderModel(data) {
    try {

        // get all from db
        let total;
        let result;

        if (data.query) {
            console.log(data.query)
            result = await db('provider')
                .select(
                    'provider.id',
                    'provider.name',
                    'provider.state',
                    'provider.is_active',
                    'provider.code',
                    'provider.email',
                    'provider.address',
                    'provider.phone_number',
                    'provider.medical_director_name',
                    'provider.medical_director_phone_no',
                    'provider.modified_by',
                    'provider.created_at',
                    'provider.modified_at',
                    'provider.modified_at',
                    db.raw(`"user"."id" as "user_id"`),
                    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "entered_by"`)
                )
                .innerJoin('user', 'user.id', '=', "provider.created_by")
                .whereILike('name', `%${data.query}%`)
                .orWhereILike('state', `%${data.query}%`)
                .orWhereILike('code', `%${data.query}%`)
                .orWhereILike('first_name', `%${data.query}%`)
                .orWhereILike('last_name', `%${data.query}%`)
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "created_at"}`, `${data.sort.order}`)


            total = await db("provider").count()

        } else {
            result = await db('provider')
            .select(
                'provider.id',
                'provider.name',
                'provider.state',
                'provider.is_active',
                'provider.code',
                'provider.email',
                'provider.address',
                'provider.phone_number',
                'provider.medical_director_name',
                'provider.medical_director_phone_no',
                'provider.modified_by',
                'provider.created_at',
                'provider.modified_at',
                db.raw(`"user"."id" as "user_id"`),
                db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "entered_by"`)
              )
              .innerJoin('user', 'user.id', '=', "provider.created_by")
              .limit(data.pageSize)
              .offset((data.pageIndex - 1) * data.pageSize)
              .orderBy(data.sort.key ? `provider.${data.sort.key}` : 'created_at', data.sort.order)

            total = await db("provider").count()
        }

        return { total, result }

    } catch (error) {
        console.log(error)
    }
}

// get provider by [provider code]
export async function getProviderByQuery(columnName, query) {

    return await db("provider").select().whereILike(columnName, `%${query}%`)
}

//get provoder by id
export async function getProviderByIdModel(id) {

    return await db("provider").select().where("id", id)
}

// edit (specified provider columns)  by id
export async function editProviderByIdModel(id, data) {

    const updatedData = {
        name: data.name,
        email: data.email,
        address: data.address,
        phone_number: data.phone_number,
        medical_director_name: data.medical_director_name,
        medical_director_phone_no: data.medical_director_phone_no,
        state: data.state,
        modified_by: data.user_id,
        modified_at: new Date()
    }

    return await db('provider').where('id', id).update(updatedData)
}

//edit provider activation state using the provider id
export async function editProviderActivationStateModel(id, activateState) {

    const updatedData = {
        is_active: activateState.is_active,
        modified_by: activateState.user_id,
        modified_at: new Date()
    }
    return await db('provider').where('id', id).update(updatedData)
}

// --- FOR NHIA PROVIDERS
export async function createNHIAProviderModel(data) {

    const newProvider = {
        id: uuidv4(),
        name: data.name,
        hcp_id: data.hcp_id,
        is_active: data.is_active,
        created_by: data.user_id
    }

    return await db("nhis_providers").insert(newProvider);
}

export async function getAllNhisProviderModel(data) {

    return await db('nhis_providers')
        .select()
        .whereILike('hcp_id', `%${data}%`)
}
//Create PROVIDER SERVICE TARIFF
export async function CreateProviderServiceTariffModel(data) {
  const tariff={
    id:uuidv4(),
    item_name:data.item_name,
    item_price:data.item_price,
    provider_id:data.provider_id,
    insurance_plan_type:data.insurance_plan_type,
    hcpcs_code:data.hcpcs_code,
    is_surgical:data.is_surgical,
    patient_type:data.patient_type,
    category:data.category,
    created_by:data.created_by
  }

  if (await DoesDataExist('provider_service_tariff','item_name',data.item_name)) {
    return 'provider service tariff already exists!';
  }else{
    return await db('provider_service_tariff').insert(tariff)
  }


}
//This is to get PROVIDER SERVICE TARIFF'S under a particular provider
export async function getProviderServiceTariffByIdModel(id) {
  try {

  let result =await db('provider_service_tariff').select(
    'provider_service_tariff.id',
    'provider_service_tariff.item_name',
    'provider_service_tariff.item_price',
    'provider_service_tariff.provider_id',
    'provider_service_tariff.hcpcs_code',
    'provider_service_tariff.is_surgical',
    'provider_service_tariff.patient_type',
    'provider_service_tariff.category',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"health_plan_category"."name" as "insurance_plan_type"`),
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`)

).where('provider_service_tariff.provider_id',id)
.innerJoin('user', 'user.id', '=', 'provider_service_tariff.created_by')
.leftJoin("provider","provider.id", '=' , "provider_service_tariff.provider_id")
.innerJoin("health_plan_category","health_plan_category.id", '=' , "provider_service_tariff.insurance_plan_type")
let count =await db('provider_service_tariff').where('provider_service_tariff.provider_id',id).count()

  return {result,count}
  } catch (error) {
    console.error("Error fetching private service tariff by providerID:", error);
    throw error;
  }
}
//This is to get all PROVIDER SERVICE TARIFF'S
export async function getAllProviderServiceTariffModel() {
  try {
    let result =await db('provider_service_tariff').select(
      'provider_service_tariff.id',
      'provider_service_tariff.item_name',
      'provider_service_tariff.item_price',
      'provider_service_tariff.hcpcs_code',
      'provider_service_tariff.is_surgical',
      'provider_service_tariff.patient_type',
      'provider_service_tariff.category',
      db.raw(`"provider"."name" as "provider_name"`),
      db.raw(`"health_plan_category"."name" as "insurance_plan_type"`),
      db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`)

  )
  .innerJoin('user', 'user.id', '=', 'provider_service_tariff.created_by')
  .leftJoin("provider","provider.id", '=' , "provider_service_tariff.provider_id")
  .innerJoin("health_plan_category","health_plan_category.id", '=' , "provider_service_tariff.insurance_plan_type")
return result

  } catch (error) {
    console.error("Error fetching tariff", error);
    throw error;
  }}

  //This is to get single PROVIDER SERVICE TARIFF'S by tariff ID
export async function getSingleProviderServiceTariffByIdModel(id) {
  try {

  let result =await db('provider_service_tariff').select(
    'provider_service_tariff.id',
    'provider_service_tariff.item_name',
    'provider_service_tariff.item_price',
    'provider_service_tariff.hcpcs_code',
    'provider_service_tariff.is_surgical',
    'provider_service_tariff.patient_type',
    'provider_service_tariff.category',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"health_plan_category"."name" as "insurance_plan_type"`),
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`)

).where('provider_service_tariff.id',id)
.innerJoin('user', 'user.id', '=', 'provider_service_tariff.created_by')
.leftJoin("provider","provider.id", '=' , "provider_service_tariff.provider_id")
.innerJoin("health_plan_category","health_plan_category.id", '=' , "provider_service_tariff.insurance_plan_type")
  return result
  } catch (error) {
    console.error("Error fetching private service tariff by ID:", error);
    throw error;
  }
}

//Create PROVIDER DRUG TARIFF
export async function CreateProviderDrugTariffModel(data) {
  const tariff={
    id:uuidv4(),
    item_name:data.item_name,
    item_price:data.item_price,
    provider_id:data.provider_id,
    insurance_plan_type:data.insurance_plan_type,
    formulation:data.formulation,
    unit_of_measure:data.unit_of_measure,
    category:data.category,
    strength:data.strength,
    created_by:data.created_by

  }

  if (await DoesDataExist('provider_drug_tariff','item_name',data.item_name)) {
    return 'provider drug tariff already exists!';
  }else{
    return await db('provider_drug_tariff').insert(tariff)
  }


}
//This is to get PROVIDER Drug TARIFF'S under a particular provider
export async function getProviderDrugTariffByIdModel(id) {
  try {

  let result =await db('provider_drug_tariff').select(
    'provider_drug_tariff.id',
    'provider_drug_tariff.item_name',
    'provider_drug_tariff.item_price',
    'provider_drug_tariff.formulation',
    'provider_drug_tariff.unit_of_measure',
    'provider_drug_tariff.strength',
    'provider_drug_tariff.category',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"health_plan_category"."name" as "insurance_plan_type"`),
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`)

).where('provider_drug_tariff.provider_id',id)
.innerJoin('user', 'user.id', '=', 'provider_drug_tariff.created_by')
.leftJoin("provider","provider.id", '=' , "provider_drug_tariff.provider_id")
.innerJoin("health_plan_category","health_plan_category.id", '=' , "provider_drug_tariff.insurance_plan_type")
let count =await db('provider_drug_tariff').where('provider_drug_tariff.provider_id',id).count()

  return {result,count}
  } catch (error) {
    console.error("Error fetching private service tariff by providerID:", error);
    throw error;
  }
}

//This is to get all PROVIDER DRUG TARIFF'S
export async function getAllProviderDrugTariffModel() {
  try {

  let result =await db('provider_drug_tariff').select(
    'provider_drug_tariff.id',
    'provider_drug_tariff.item_name',
    'provider_drug_tariff.item_price',
    'provider_drug_tariff.formulation',
    'provider_drug_tariff.unit_of_measure',
    'provider_drug_tariff.strength',
    'provider_drug_tariff.category',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"health_plan_category"."name" as "insurance_plan_type"`),
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`)

)
.innerJoin('user', 'user.id', '=', 'provider_drug_tariff.created_by')
.leftJoin("provider","provider.id", '=' , "provider_drug_tariff.provider_id")
.innerJoin("health_plan_category","health_plan_category.id", '=' , "provider_drug_tariff.insurance_plan_type")

  return result
  } catch (error) {
    console.error("Error fetching all private drug tariff", error);
    throw error;
  }
}

export async function getSingleProviderDrugTariffByIdModel(id) {
  try {

  let result =await db('provider_drug_tariff').select(
    'provider_drug_tariff.id',
    'provider_drug_tariff.item_name',
    'provider_drug_tariff.item_price',
    'provider_drug_tariff.formulation',
    'provider_drug_tariff.unit_of_measure',
    'provider_drug_tariff.strength',
    'provider_drug_tariff.category',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"health_plan_category"."name" as "insurance_plan_type"`),
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`)

).where('provider_drug_tariff.id',id)
.innerJoin('user', 'user.id', '=', 'provider_drug_tariff.created_by')
.leftJoin("provider","provider.id", '=' , "provider_drug_tariff.provider_id")
.innerJoin("health_plan_category","health_plan_category.id", '=' , "provider_drug_tariff.insurance_plan_type")
let count =await db('provider_drug_tariff').where('provider_drug_tariff.provider_id',id).count()

  return {result,count}
  } catch (error) {
    console.error("Error fetching private drug tariff", error);
    throw error;
  }
}
