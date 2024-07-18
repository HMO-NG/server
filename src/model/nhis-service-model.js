import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
let db = knex(config[process.env.NODE_ENV || 'development']);

// create nhia service tarrif (procudure and investigation)
export async function createNhisServiceTarrifModel(data) {

    const createNhiaService = {
        id: uuidv4(),
        name: data.name,
        tarrif_type: data.tarrif_type,
        service_type: data.service_type,
        nhia_code: data.nhia_code,
        category: data.category,
        sub_category: data.sub_category,
        plan_type: data.plan_type,
        price: data.price,
        created_by: data.user_id
    }
    return await db("nhis_service_tarrif").insert(createNhiaService);
}

//get all nhis procedures and can search
export async function getAllAndSearchNhisTarrifModel(data) {
    try {

        // get all from db
        let total;
        let result;

        if (data.query) {
            console.log(data.query)
            result = await db('nhis_service_tarrif')
                .select(
                    'nhis_service_tarrif.id',
                    'nhis_service_tarrif.name',
                    'nhis_service_tarrif.nhia_code',
                    'nhis_service_tarrif.price',
                    'nhis_service_tarrif.tarrif_type',
                    'nhis_service_tarrif.service_type',
                    'nhis_service_tarrif.category',
                    'nhis_service_tarrif.sub_category',
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'nhis_service_tarrif.created_by')
                .whereILike('name', `%${data.query}%`)
                .orWhereILike('nhia_code', `%${data.query}%`)
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "nhis_service_tarrif.created_at"}`, `${data.sort.order}`)


            total = await db("nhis_service_tarrif").whereILike('name', `%${data.query}%`)
                .orWhereILike('nhia_code', `%${data.query}%`).count()

        } else {
            result = await db('nhis_service_tarrif')
                .select(
                    'nhis_service_tarrif.id',
                    'nhis_service_tarrif.name',
                    'nhis_service_tarrif.nhia_code',
                    'nhis_service_tarrif.price',
                    'nhis_service_tarrif.tarrif_type',
                    'nhis_service_tarrif.service_type',
                    'nhis_service_tarrif.category',
                    'nhis_service_tarrif.sub_category',
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'nhis_service_tarrif.created_by')
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "nhis_service_tarrif.created_at"}`, `${data.sort.order}`)

            total = await db("nhis_service_tarrif").count()
        }

        return { total, result }

    } catch (error) {
        console.log(error)
    }
}

// create nhia drug category
export async function createNhisDrugTarrifModel(data) {

    const createNhiaDrugService = {
        id: uuidv4(),
        name_of_drug: data.name_of_drug,
        dosage_form: data.dosage_form,
        nhia_code: data.nhia_code,
        strength: data.strength,
        presentation: data.presentation,
        category: data.category,
        plan_type: data.plan_type,
        price: data.price,
        created_by: data.user_id
    }
    return await db("nhis_drug_tarrif").insert(createNhiaDrugService);
}

//get all nhis procedures and can search
export async function getAllAndSearchNhisDrugModel(data) {
    try {

        // get all from db
        let total;
        let result;

        if (data.query) {
            console.log(data.query)
            result = await db('nhis_drug_tarrif')
                .select(
                    'nhis_drug_tarrif.id',
                    'nhis_drug_tarrif.name_of_drug',
                    'nhis_drug_tarrif.nhia_code',
                    'nhis_drug_tarrif.price',
                    'nhis_drug_tarrif.dosage_form',
                    'nhis_drug_tarrif.strength',
                    'nhis_drug_tarrif.presentation',
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'nhis_drug_tarrif.created_by')
                .whereILike('name_of_drug', `%${data.query}%`)
                .orWhereILike('nhia_code', `%${data.query}%`)
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "nhis_drug_tarrif.created_at"}`, `${data.sort.order}`)


            total = await db("nhis_drug_tarrif").whereILike('name_of_drug', `%${data.query}%`)
                .orWhereILike('nhia_code', `%${data.query}%`).count()

        } else {
            result = await db('nhis_drug_tarrif')
                .select(
                    'nhis_drug_tarrif.id',
                    'nhis_drug_tarrif.name_of_drug',
                    'nhis_drug_tarrif.nhia_code',
                    'nhis_drug_tarrif.price',
                    'nhis_drug_tarrif.dosage_form',
                    'nhis_drug_tarrif.strength',
                    'nhis_drug_tarrif.presentation',
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'nhis_drug_tarrif.created_by')
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "nhis_drug_tarrif.created_at"}`, `${data.sort.order}`)

            total = await db("nhis_drug_tarrif").count()
        }

        return { total, result }

    } catch (error) {
        console.log(error)
    }
}

// export async function getHealthPlanCodeModel(code) {
//     return await db("health_plan").where('health_plan_code', code)
// }
