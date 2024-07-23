import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
let db = knex(config[process.env.NODE_ENV || 'development']);

// get all count of all user
// this is just a way to check that the db is active

export async function getCountOfAllUsersModel() {
    return await db('user').select().count()
}
