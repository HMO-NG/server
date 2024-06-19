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
            code: providerDetails.code,
            state: providerDetails.state,
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
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'provider.created_by')
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
                    db.raw("user.id as `user id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered by`")
                )
                .innerJoin('user', 'user.id', 'provider.created_by')
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "created_at"}`, `${data.sort.order}`)

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

export async function getProviderByIdModel(id){

    return await db("provider").select().where("id", id)
}

