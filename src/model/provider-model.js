import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
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
            code:providerDetails.code,
            state:providerDetails.state,
            medical_director_name: providerDetails.medical_director_name,
            medical_director_phone_no: providerDetails.medical_director_phone_no,
            created_by: providerDetails.user_id
        }
        // insert into db
        await db("provider").insert(data);

        return data
    } catch (error) {
        console.log(error)
    }

}

//get all providers
export async function getAllProviderModel(){
    try {

        // get all from db
       return await db("provider").select();

    } catch (error) {
        console.log(error)
    }
}

// get provider by id
// edit provider by id
