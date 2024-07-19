import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
let db = knex(config[process.env.NODE_ENV || 'development']);

// create nhia enrollee
export async function createNhisEnrolleeModel(data) {

    const createNhiaEntrollee = {
        id: uuidv4(),
        policy_id: data.policy_id,
        relationship: data.relationship,
        surname: data.surname,
        other_names: data.other_names,
        dob: data.dob,
        sex: data.sex,
        company_id: data.company_id,
        provider_id: data.provider_id,
        provider_name: data.provider_name,
        provider_Address:data.provider_Address,
        created_at: data.user_id
    }
    return await db("nhis_enrollee").insert(createNhiaEntrollee);
}

//get all nhis enrollee and can search
export async function getAllAndSearchNhisEnrolleeModel(data) {
    try {

        // get all from db
        let total;
        let result;

        if (data.query) {
            console.log(data.query)
            result = await db('nhis_enrollee')
                .select(
                    'nhis_enrollee.id',
                    'nhis_enrollee.policy_id',
                    'nhis_enrollee.surname',
                    'nhis_enrollee.other_names',
                    'nhis_enrollee.dob',
                    'nhis_enrollee.sex',
                    'nhis_enrollee.company_id',
                    'nhis_enrollee.provider_id',
                    'nhis_enrollee.provider_name',
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'nhis_enrollee.created_by')
                .whereILike('policy_id', `%${data.query}%`)
                .orWhereILike('surname', `%${data.query}%`)
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "nhis_enrollee.created_at"}`, `${data.sort.order}`)


            total = await db("nhis_enrollee").whereILike('policy_id', `%${data.query}%`)
                .orWhereILike('surname', `%${data.query}%`).count()

        } else {
            result = await db('nhis_enrollee')
                .select(
                    'nhis_enrollee.id',
                    'nhis_enrollee.name',
                    'nhis_enrollee.nhia_code',
                    'nhis_enrollee.price',
                    'nhis_enrollee.tarrif_type',
                    'nhis_enrollee.service_type',
                    'nhis_enrollee.category',
                    'nhis_enrollee.sub_category',
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'nhis_enrollee.created_by')
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "nhis_enrollee.created_at"}`, `${data.sort.order}`)

            total = await db("nhis_enrollee").count()
        }

        return { total, result }

    } catch (error) {
        console.log(error)
    }
}