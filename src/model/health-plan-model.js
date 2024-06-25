import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
let db = knex(config[process.env.NODE_ENV || 'development']);

// create health plan category
export async function createHealthPlanModel(data) {

    const createHealthPlan = {
        id: uuidv4(),
        name: data.name,
        is_active: true,
        health_plan_code: data.health_plan_code,
        band: data.band,
        description: data.description,
        created_by: data.user_id,

    }
    return await db("health_plan").insert(createHealthPlan);
}

export async function getHealthPlanCodeModel(code) {
    return await db("health_plan").where('health_plan_code', code)
}