import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
let db = knex(config[process.env.NODE_ENV || 'development']);

// create health plan category
export async function createNhisServiceModel(data) {

    const createNhiaService = {
        id: uuidv4(),
        name: data.name,
        type: data.type,
        code: data.code,
        price: data.price,
        created_by: data.user_id
    }
    return await db("nhis_service").insert(createNhiaService);
}

// export async function getHealthPlanCodeModel(code) {
//     return await db("health_plan").where('health_plan_code', code)
// }