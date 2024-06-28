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

//get all nhis procedures and can search
export async function getAllAndSearchNhisProcedureModel(data) {
    try {

        // get all from db
        let total;
        let result;

        if (data.query) {
            console.log(data.query)
            result = await db('nhis_procedure')
                .select(
                    'nhis_procedure.id',
                    'nhis_procedure.name',
                    'nhis_procedure.type',
                    'nhis_procedure.sub_category',
                    'nhis_procedure.code',
                    'nhis_procedure.category',
                    'nhis_procedure.price',
                    'nhis_procedure.plan_type',
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'provider.created_by')
                .whereILike('name', `%${data.query}%`)
                .orWhereILike('code', `%${data.query}%`)
                .orWhereILike('sub_category', `%${data.query}%`)
                .orWhereILike('category', `%${data.query}%`)
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "code"}`, `${data.sort.order}`)


            total = await db("nhis_procedure").count()

        } else {
            result = await db('nhis_procedure')
            .select(
                'nhis_procedure.id',
                'nhis_procedure.name',
                'nhis_procedure.type',
                'nhis_procedure.sub_category',
                'nhis_procedure.code',
                'nhis_procedure.category',
                'nhis_procedure.price',
                'nhis_procedure.plan_type',
                db.raw("user.id as `user_id`"),
                db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
            )
                .innerJoin('user', 'user.id', 'provider.created_by')
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "code"}`, `${data.sort.order}`)

            total = await db("nhis_procedure").count()
        }

        return { total, result }

    } catch (error) {
        console.log(error)
    }
}

// export async function getHealthPlanCodeModel(code) {
//     return await db("health_plan").where('health_plan_code', code)
// }