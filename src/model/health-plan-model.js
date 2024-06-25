import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
let db = knex(config[process.env.NODE_ENV || 'development']);

// create health plan category
export async function createHealthPlan(data) {

    const createHealthPlan = {
        id: uuidv4(),
        name: data.name,
        is_active: data.is_active,
        health_plan_code: data.health_plan_code,
        band:data.band,
        description: data.description,
        created_by: data.created_by,

    }
    return await db("health_plan").insert(createHealthPlan);
}