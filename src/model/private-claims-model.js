import knex from "knex";
import { v4 as uuidv4, v4 } from 'uuid'
import config from '../knexfile.js'
import { DoesDataExist } from "../util/reusable.js";
let db = knex(config[process.env.NODE_ENV || 'development']);

export async function CreatePrivateClaimModel(data) {
  const claim={
    id:uuidv4(),
    claim_type: data.claim_type, // e.g., 'outpatient', 'inpatient'
    diagnosis: data.diagnosis,
    encounter_date: data.encounter_date,

    admitted_date: data.admitted_date,
    discharged_date: data.discharged_date,



    claimed_services: data.selected_tariffs ,
    // date_submitted: new Date(),

    enrollee_id: data.enrollee_id,
    provider_id: data.provider_id,
    pre_auth_id: data.pre_auth_id || null,
    created_by: data.created_by,

    pa_code: data.pa_code,
    requested_amount: data.requested_amount,
    related_documents: data.related_documents,
  }
    return await db('claims').insert(claim)
}

export async function getAllPrivateClaimsModel() {
  try {

  let result =await db('claims').select(
    'claims.id',
    'claims.claim_type',
    'claims.diagnosis',
    'claims.claimed_services',
    'claims.encounter_date',
    'claims.admitted_date',
    'claims.discharged_date',
    'claims.requested_amount',
    'claims.approved_amount',
    'claims.review_comment',
    'claims.reviewed_at',
    'claims.reviewed_by',
    'claims.pa_code',
    'claims.enrollee_id',
    db.raw(`"enrollee"."health_plan_id" as "enrollee_plan"`),
    db.raw(`"health_plan"."plan_name" as "enrollee_plan_name"`),
    db.raw(`concat("enrollee"."first_name" , \' \', "enrollee"."middle_name", \' \', "enrollee"."last_name") as "enrollee_name"`),
    'claims.status',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"provider"."code" as "provider_code"`),

    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`),
    'claims.created_at',

)
.innerJoin('user', 'user.id', '=', 'claims.created_by')
.innerJoin('enrollee', 'enrollee.id', '=', 'claims.enrollee_id')
.leftJoin('health_plan', 'enrollee.health_plan_id', '=', 'health_plan.id')
.leftJoin("provider","provider.id", '=' , "claims.provider_id")

  return result
  } catch (error) {
    console.error("Error fetching all Claims", error);
    throw error;
  }
}

export async function getPrivateClaimsByIdModel(id) {
  try {

  let result =await db('claims').select(
    'claims.id',
    'claims.claim_type',
    'claims.diagnosis',
    'claims.claimed_services',
    'claims.encounter_date',
    'claims.admitted_date',
    'claims.discharged_date',
    'claims.requested_amount',
    'claims.approved_amount',
    'claims.review_comment',
    'claims.reviewed_at',
    'claims.reviewed_by',
    'claims.pa_code',
    'claims.enrollee_id',
    db.raw(`"enrollee"."health_plan_id" as "enrollee_plan"`),
    db.raw(`"health_plan"."plan_name" as "enrollee_plan_name"`),
    db.raw(`concat("enrollee"."first_name" , \' \', "enrollee"."middle_name", \' \', "enrollee"."last_name") as "enrollee_name"`),
    'claims.status',
    db.raw(`"provider"."name" as "provider_name"`),
    db.raw(`"provider"."code" as "provider_code"`),

    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "created_by"`),
    'claims.created_at',

).where('claims.id',id)
.innerJoin('user', 'user.id', '=', 'claims.created_by')
.innerJoin('enrollee', 'enrollee.id', '=', 'claims.enrollee_id')
.leftJoin('health_plan', 'enrollee.health_plan_id', '=', 'health_plan.id')
.leftJoin("provider","provider.id", '=' , "claims.provider_id")

  return result[0]
  } catch (error) {
    console.error("Error fetching Claims", error);
    throw error;
  }
}

export async function updateClaimByIdModel(id,data) {
  try{

  const updatedData = {
    requested_total_price:data.requested_total_price,
    approved_amount:data.approved_amount,
    diagnosis:data.diagnosis,
    // pa_code:data.pa_code,
    claimed_services:data.claimed_services,
    status:data.status,
    review_comment:data.provider_comment,
    approved_date:data.approved_date,
    // denial_reason:data.denial_reason,
  }

  return await db('claims').where('id', id).update(updatedData)
}catch(error){
  console.error(error)
}
}

