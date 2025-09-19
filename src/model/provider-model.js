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
            created_by: providerDetails.user_id,
        }

        if (await DoesDataExist('provider','name',providerDetails.name)) {
          return 'provider already exists!';
        }else{
          const new_provider =await db("provider").insert(data).returning('*');
               await Promise.all(
              providerDetails.band_id.map((bandId) => {
                return db("provider_linked_bands").insert({
                  id: uuidv4(),
                  provider_id: new_provider[0].id,
                  band_id: bandId,
              });
              }))

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
                     db.raw(`COALESCE(json_agg(
                           DISTINCT jsonb_build_object(
                             'id', bands.id,
                             'band_name', bands.name
                           )
                    ) FILTER (WHERE bands.id IS NOT NULL), '[]') as linked_bands`),
                    db.raw(`"user"."id" as "user_id"`),
                    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "entered_by"`)
                )
                .innerJoin('user', 'user.id', '=', "provider.created_by")
                .leftJoin('provider_linked_bands', 'provider_linked_bands.provider_id', '=', "provider.id")
                .leftJoin('bands', 'bands.id', '=', "provider_linked_bands.band_id")
                .whereILike('name', `%${data.query}%`)
                .orWhereILike('state', `%${data.query}%`)
                .orWhereILike('code', `%${data.query}%`)
                .orWhereILike('first_name', `%${data.query}%`)
                .orWhereILike('last_name', `%${data.query}%`)
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "created_at"}`, `${data.sort.order}`)
                .groupBy('provider.id', 'user.id','user.first_name', 'user.last_name')


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
                 db.raw(`COALESCE(json_agg(
                           DISTINCT jsonb_build_object(
                             'id', bands.id,
                             'band_name', bands.name
                           )
                ) FILTER (WHERE bands.id IS NOT NULL), '[]') as linked_bands`),
                db.raw(`"user"."id" as "user_id"`),
                db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "entered_by"`)
              )
              .innerJoin('user', 'user.id', '=', "provider.created_by")
              .leftJoin('provider_linked_bands', 'provider_linked_bands.provider_id', '=', "provider.id")
              .leftJoin('bands', 'bands.id', '=', "provider_linked_bands.band_id")
              .limit(data.pageSize)
              .offset((data.pageIndex - 1) * data.pageSize)
              .orderBy(data.sort.key ? `provider.${data.sort.key}` : 'created_at', data.sort.order)
              .groupBy('provider.id', 'user.id','user.first_name', 'user.last_name')

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
//Create PROVIDER TARIFF
export async function CreateProviderTariffModel(data) {
  try{
  const tariff={
    id:uuidv4(),
    item_name:data.item_name,
    item_price:data.item_price,
    provider_id:data.provider_id,
    hcpcs_code:data.hcpcs_code,
    tariff_type:data.tariff_type,
    is_surgical:data.is_surgical,
    patient_type:data.patient_type,
    category:data.category,
    available_to_all_plans:data.available_to_all_plans,
    service_type:data.service_type,
    created_by:data.created_by
  }

  if (await DoesDataExist('provider_tariff','item_name',data.item_name)) {
    return 'provider tariff already exists!';
  }else{
    try{
         const new_tariff= await db('provider_tariff').insert(tariff).returning('id');

         //save linked health plans if available (array of health plan ids)
         if (data.insurance_plan_id && data.available_to_all_plans === false) {
             await Promise.all(
                 data.insurance_plan_id.map((planId) => {
                   return db("tariff_linked_health_plans").insert({
                     id: uuidv4(),
                     tariff_id: new_tariff[0].id,
                     health_plan_id: planId,
                 });
             }))
         }

         return 'success'
    }catch(error){
          console.error("Error creating provider tariff:", error);
          return 'error'
    }
  }
   }catch(error){
    console.error("Error updating provider tariff:", error);
  }


}
//This is to get PROVIDER TARIFF'S under a particular provider
export async function getProviderTariffByIdModel(id) {
  try {

  let result =await db('provider_tariff').select(
    'provider_tariff.id',
    'provider_tariff.item_name',
    'provider_tariff.item_price',
    'provider_tariff.provider_id',
    'provider_tariff.hcpcs_code',
    'provider_tariff.tariff_type',
    'provider_tariff.is_surgical',
    'provider_tariff.patient_type',
    'provider_tariff.category',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`),
    'provider_tariff.service_type',
    db.raw(`COALESCE(json_agg(
      DISTINCT jsonb_build_object(
        'id', health_plan.id,
        'plan_name', health_plan.plan_name
      )
    ) FILTER (WHERE health_plan.id IS NOT NULL), '[]') as linked_plans`),
     'provider_tariff.available_to_all_plans',

).where('provider_tariff.provider_id',id)
  .innerJoin('user', 'user.id', '=', 'provider_tariff.created_by')
  .leftJoin("provider","provider.id", '=' , "provider_tariff.provider_id")
  .leftJoin('tariff_linked_health_plans', 'tariff_linked_health_plans.tariff_id', '=', 'provider_tariff.id')
  .leftJoin('health_plan', 'health_plan.id', '=', 'tariff_linked_health_plans.health_plan_id')
  .groupBy(
      'provider_tariff.id',
      'provider.name',
      'user.first_name',
      'user.last_name'
    );
let count =await db('provider_tariff').where('provider_tariff.provider_id',id).count()

  return {result,count}
  } catch (error) {
    console.error("Error fetching private tariff by providerID:", error);
    throw error;
  }
}
//This is to get all PROVIDER TARIFF'S
export async function getAllProviderTariffModel() {
  try {
    let result =await db('provider_tariff').select(
      'provider_tariff.id',
      'provider_tariff.item_name',
      'provider_tariff.item_price',
      'provider_tariff.hcpcs_code',
      'provider_tariff.tariff_type',
      'provider_tariff.is_surgical',
      'provider_tariff.patient_type',
      'provider_tariff.category',
      db.raw(`"provider"."name" as "provider_name"`),
      db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`),
      'provider_tariff.service_type',
      db.raw(`COALESCE(json_agg(
      DISTINCT jsonb_build_object(
        'id', health_plan.id,
        'plan_name', health_plan.plan_name
      )
    ) FILTER (WHERE health_plan.id IS NOT NULL), '[]') as linked_plans`),
     'provider_tariff.available_to_all_plans',

  )
  .innerJoin('user', 'user.id', '=', 'provider_tariff.created_by')
  .leftJoin("provider","provider.id", '=' , "provider_tariff.provider_id")
  .leftJoin('tariff_linked_health_plans', 'tariff_linked_health_plans.tariff_id', '=', 'provider_tariff.id')
  .leftJoin('health_plan', 'health_plan.id', '=', 'tariff_linked_health_plans.health_plan_id')
  .groupBy(
      'provider_tariff.id',
      'provider.name',
      'user.first_name',
      'user.last_name'
    );

 return result

  } catch (error) {
    console.error("Error fetching tariff", error);
    throw error;
  }}

  //This is to get single PROVIDER TARIFF'S by tariff ID
export async function getSingleProviderTariffByIdModel(id) {
  try {

  let result =await db('provider_tariff').select(
    'provider_tariff.id',
    'provider_tariff.item_name',
    'provider_tariff.item_price',
    'provider_tariff.hcpcs_code',
    'provider_tariff.tariff_type',
    'provider_tariff.is_surgical',
    'provider_tariff.patient_type',
    'provider_tariff.category',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`),
    'provider_tariff.service_type',
    db.raw(`COALESCE(json_agg(
      DISTINCT jsonb_build_object(
        'id', health_plan.id,
        'plan_name', health_plan.plan_name
      )
    ) FILTER (WHERE health_plan.id IS NOT NULL), '[]') as linked_plans`),
    'provider_tariff.available_to_all_plans',


).where('provider_tariff.id',id)
  .innerJoin('user', 'user.id', '=', 'provider_tariff.created_by')
  .leftJoin("provider","provider.id", '=' , "provider_tariff.provider_id")
  .leftJoin('tariff_linked_health_plans', 'tariff_linked_health_plans.tariff_id', '=', 'provider_tariff.id')
  .leftJoin('health_plan', 'health_plan.id', '=', 'tariff_linked_health_plans.health_plan_id')
  .groupBy(
      'provider_tariff.id',
      'provider.name',
      'user.first_name',
      'user.last_name'
    );
  return result
  } catch (error) {
    console.error("Error fetching private service tariff by ID:", error);
    throw error;
  }
}
//Update PROVIDER TARIFF
export async function UpdateProviderTariffModel(id,data) {
  try{
  const tariff={
    item_name:data.item_name,
    item_price:data.item_price,
    provider_id:data.provider_id,
    // insurance_plan_id:data.insurance_plan,
    hcpcs_code:data.hcpcs_code,
    tariff_type:data.tariff_type,
    is_surgical:data.is_surgical,
    patient_type:data.patient_type,
    available_to_all_plans:data.available_to_all_plans,
    service_type:data.service_type,
    category:data.category,
  }
  return await db('provider_tariff').where('id', id).update(tariff)
  }catch(error){
    console.error("Error updating provider tariff:", error);
  }
}



export async function CreatePreAuthorizationModel(data) {
  const PA={
    id:uuidv4(),
    requested_total_price:data.requested_total_price,
    diagnosis:data.diagnosis,
    provider_id:data.provider_id,
    enrollee_id:data.enrollee_id,
    selected_tariffs:data.selected_tariffs,
    related_documents:data.related_documents,
    created_by:data.created_by
  }
    return await db('pre_authorization').insert(PA)
}

export async function getAllPreAuthorizationModel() {
  try {

  let result =await db('pre_authorization').select(
    'pre_authorization.id',
    'pre_authorization.requested_total_price',
    'pre_authorization.approved_price',
    'pre_authorization.diagnosis',
    'pre_authorization.pa_code',
    'pre_authorization.enrollee_id',
    db.raw(`"enrollee"."health_plan_id" as "enrollee_plan"`),
    db.raw(`"health_plan"."plan_name" as "enrollee_plan_name"`),
    db.raw(`concat("enrollee"."first_name" , \' \', "enrollee"."middle_name", \' \', "enrollee"."last_name") as "enrollee_name"`),
    'pre_authorization.selected_tariffs',
    'pre_authorization.status',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"provider"."code" as "provider_code"`),
    'pre_authorization.provider_id',
    'pre_authorization.provider_comment',
    'pre_authorization.is_claimed',
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`),
    'pre_authorization.created_at',

)
.innerJoin('user', 'user.id', '=', 'pre_authorization.created_by')
.innerJoin('enrollee', 'enrollee.id', '=', 'pre_authorization.enrollee_id')
.leftJoin('health_plan', 'enrollee.health_plan_id', '=', 'health_plan.id')
.leftJoin("provider","provider.id", '=' , "pre_authorization.provider_id")

  return result
  } catch (error) {
    console.error("Error fetching all Pre Authorization", error);
    throw error;
  }
}

export async function getPreAuthorizationByProviderIdModel(id) {
  try {

  let result =await db('pre_authorization').select(
    'pre_authorization.id',
    'pre_authorization.requested_total_price',
    'pre_authorization.approved_price',
    'pre_authorization.diagnosis',
    'pre_authorization.pa_code',
    'pre_authorization.enrollee_id',
    db.raw(`"enrollee"."health_plan_id" as "enrolee_plan"`),
    db.raw(`"health_plan"."plan_name" as "enrolee_plan_name"`),
    db.raw(`concat("enrollee"."first_name" , \' \', "enrollee"."middle_name", \' \', "enrollee"."last_name") as "enrollee_name"`),
    'pre_authorization.selected_tariffs',
    'pre_authorization.status',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"provider"."code" as "provider_code"`),
    'pre_authorization.provider_comment',
    'pre_authorization.is_claimed',
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`),
    'pre_authorization.created_at',

).where('pre_authorization.provider_id',id)
.innerJoin('user', 'user.id', '=', 'pre_authorization.created_by')
.innerJoin('enrollee', 'enrollee.id', '=', 'pre_authorization.enrollee_id')
.leftJoin('health_plan', 'enrollee.health_plan_id', '=', 'health_plan.id')
.leftJoin("provider","provider.id", '=' , "pre_authorization.provider_id")

  return result
  } catch (error) {
    console.error("Error fetching all Pre Authorization", error);
    throw error;
  }
}


export async function getSinglePreAuthorizationByIdModel(id) {
  try {

  let result =await db('pre_authorization').select(
    'pre_authorization.id',
    'pre_authorization.requested_total_price',
    'pre_authorization.approved_price',
    'pre_authorization.diagnosis',
    'pre_authorization.pa_code',
    'pre_authorization.enrollee_id',
    db.raw(`"enrollee"."health_plan_id" as "enrollee_plan"`),
    db.raw(`"health_plan"."plan_name" as "enrollee_plan_name"`),
    db.raw(`concat("enrollee"."first_name" , \' \', "enrollee"."middle_name", \' \', "enrollee"."last_name") as "enrollee_name"`),
    'pre_authorization.selected_tariffs',
    'pre_authorization.status',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"provider"."code" as "provider_code"`),
    'pre_authorization.provider_id',
    'pre_authorization.provider_comment',
    'pre_authorization.is_claimed',
    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`),
    'pre_authorization.created_at',

).where('pre_authorization.id',id)
.innerJoin('user', 'user.id', '=', 'pre_authorization.created_by')
.innerJoin('enrollee', 'enrollee.id', '=', 'pre_authorization.enrollee_id')
.leftJoin('health_plan', 'enrollee.health_plan_id', '=', 'health_plan.id')
.leftJoin("provider","provider.id", '=' , "pre_authorization.provider_id")

  return result[0]
  } catch (error) {
    console.error("Error fetching Pre Authorization", error);
    throw error;
  }
}

export async function updatePreAuthorizationByIdModel(id,data) {
  const updatedData = {
    requested_total_price:data.requested_total_price,
    approved_price:data.approved_price,
    diagnosis:data.diagnosis,
    pa_code:data.pa_code,
    selected_tariffs:data.selected_tariffs,
    status:data.status,
    provider_comment:data.provider_comment,
    approved_date:data.approved_date,
    denial_reason:data.denial_reason,
  }

  return await db('pre_authorization').where('id', id).update(updatedData)
}
export async function ApprovePreAuthorizationTariffByIdModel(id,data) {
  const updatedData = {
    selected_tariffs:data.selected_tariffs,
    status:data.status,
    approved_price:data.approved_price,
    pa_code:data.pa_code,
    approval_date:data.approval_date,
  }

  return await db('pre_authorization').where('id', id).update(updatedData)
}

export async function getPATariffAndDiagnosisByCodeModel(PA_code) {
  try {

  let result =await db('pre_authorization').select(
    'pre_authorization.id',
    'pre_authorization.approved_price',
    'pre_authorization.requested_total_price',
    'pre_authorization.diagnosis',
    'pre_authorization.enrollee_id',
    'pre_authorization.provider_id',
    'pre_authorization.selected_tariffs',

    db.raw(`concat("enrollee"."first_name" , \' \', "enrollee"."middle_name", \' \', "enrollee"."last_name") as "enrollee_name"`),
    'pre_authorization.status',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"provider"."code" as "provider_code"`),

    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`),
    'pre_authorization.created_at',

).where('pre_authorization.pa_code',PA_code)
.innerJoin('user', 'user.id', '=', 'pre_authorization.created_by')
.innerJoin('enrollee', 'enrollee.id', '=', 'pre_authorization.enrollee_id')
.leftJoin('health_plan', 'enrollee.health_plan_id', '=', 'health_plan.id')
.leftJoin("provider","provider.id", '=' , "pre_authorization.provider_id")

  return result[0]
  } catch (error) {
    console.error("Error fetching pre_authorization", error);
    throw error;
  }
}

export async function updatePreAuthorizationByPACodeModel(PA_code,data) {
  const updatedData = {
    requested_total_price:data.requested_total_price,
    approved_price:data.approved_price,
    diagnosis:data.diagnosis,
    pa_code:data.pa_code,
    selected_tariffs:data.selected_tariffs,
    status:data.status,
    provider_comment:data.provider_comment,
    approved_date:data.approved_date,
    denial_reason:data.denial_reason,
    is_claimed:data.is_claimed,
  }

  return await db('pre_authorization').where('pa_code', PA_code).update(updatedData)
}

export async function CreateFailedProviderTariffUploadModel(data) {
  const failedUpload={
    id:uuidv4(),
    reason_for_failure:data.reason_for_failure,
    item_name:data.item_name,
    item_price:data.item_price,
    description:data.description,
    provider_id:data.provider_id,
    tariff_type:data.tariff_type,
  }
    return await db('failed_provider_tariff').insert(failedUpload)

}
