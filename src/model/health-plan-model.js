import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'

let db = knex(config[process.env.NODE_ENV || 'development']);

// create health plan category
export async function createHealthPlanCategoryModel(data) {

    const createHealthPlan = {
        id: uuidv4(),
        name: data.name,
        is_active: true,
        health_plan_code: data.health_plan_code,
        band: data.band,
        description: data.description,
        created_by: data.user_id,

    }
    return await db("health_plan_category").insert(createHealthPlan);
}

export async function createHealthPlanModel(data) {

    const createHealthPlan = {
        id: uuidv4(),
        plan_name: data.plan_name,
        plan_category: data.plan_category,
        plan_type: data.plan_type,
        allow_dependent: data.allow_dependent,
        max_dependant: data.max_dependant,
        plan_age_limit: data.plan_age_limit,
        plan_cost: data.plan_cost,
        created_by: data.user_id,

    }
    return await db("health_plan").insert(createHealthPlan);
}

export async function getHealthPlanCodeModel(code) {
    return await db("health_plan_category").where('health_plan_code', code)
}

export async function getAllHealthPlanCategoryModel() {
    return await db("health_plan_category").select();
}

export async function createBenefitModel(data) {

    const createBenefit = {
        id: uuidv4(),
        benefit_name: data.benefit_name,
        category: data.category,
        sub_category: data.sub_category,
        created_by: data.user_id
    }

    return await db("benefit_list").insert(createBenefit)
}

//get the entire benefit and search via query
export async function getAndSearchBenefitListModel(data) {
    try {

        // get all from db
        let total;
        let result;

        if (data.query) {
            console.log(data.query)
            result = await db('benefit_list')
                .select(
                    'benefit_list.id',
                    'benefit_list.benefit_name',
                    'benefit_list.sub_category',
                    'benefit_list.category',
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'benefit_list.created_by')
                .whereILike('name', `%${data.query}%`)
                .orWhereILike('sub_category', `%${data.query}%`)
                .orWhereILike('category', `%${data.query}%`)
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "benefit_name"}`, `${data.sort.order}`)


            total = await db("benefit_list").count()

        } else {
            result = await db('benefit_list')
                .select(
                    'benefit_list.id',
                    'benefit_list.benefit_name',
                    'benefit_list.sub_category',
                    'benefit_list.category',
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'benefit_list.created_by')
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "benefit_name"}`, `${data.sort.order}`)

            total = await db("benefit_list").count()
        }

        return { total, result }

    } catch (error) {
        console.log(error)
    }
}

export async function getAndSearchHealthPlanCategoryModel(data) {
    try {

        // get all from db
        let total;
        let result;

        if (data.query) {
            console.log(data.query)
            result = await db('health_plan_category')
                .select(
                    'health_plan_category.id',
                    'health_plan_category.name',
                    'health_plan_category.is_active',
                    'health_plan_category.health_plan_code',
                    'health_plan_category.band',
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'health_plan_category.created_by')
                .whereILike('name', `%${data.query}%`)
                .orWhereILike('band', `%${data.query}%`)
                .orWhereILike('health_plan_code', `%${data.query}%`)
                .orWhereILike('created_by', `%${data.query}%`)
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "health_plan_category.created_at"}`, `${data.sort.order}`)


            total = await db("health_plan_category").count()

        } else {
            result = await db('health_plan_category')
                .select(
                    'health_plan_category.id',
                    'health_plan_category.name',
                    'health_plan_category.is_active',
                    'health_plan_category.health_plan_code',
                    'health_plan_category.band',
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'health_plan_category.created_by')
                .whereILike('name', `%${data.query}%`)
                .orWhereILike('band', `%${data.query}%`)
                .orWhereILike('health_plan_code', `%${data.query}%`)
                .orWhereILike('created_by', `%${data.query}%`)
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "health_plan_category.created_at"}`, `${data.sort.order}`)

            total = await db("health_plan_category").count()
        }

        return { total, result }

    } catch (error) {
        console.log(error)
    }
}

export async function getAndSearchHealthPlan(data) {
    try {

        // get all from db
        let total;
        let result;

        if (data.query) {
            console.log(data.query)
            result = await db('health_plan')
                .select(
                    'health_plan.id',
                    'health_plan.plan_name',
                    'health_plan.plan_type',
                    'health_plan.allow_dependent',
                    'health_plan.max_dependant',
                    'health_plan.plan_age_limit',
                    'health_plan.plan_cost',
                    'health_plan.created_at',
                    db.raw("health_plan_category.name as health_plan_category_name"),
                    db.raw("health_plan_category.health_plan_code as health_plan_category_code"),
                    db.raw("health_plan_category.band as health_plan_category_band"),
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'health_plan.created_by')
                .innerJoin('health_plan_category', 'health_plan.plan_category', 'health_plan_category.id')
                .whereILike('plan_name', `%${data.query}%`)
                .orWhereILike('plan_category', `%${data.query}%`)
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "health_plan.created_at"}`, `${data.sort.order}`)


            total = await db("health_plan").whereILike('plan_name', `%${data.query}%`)
                .orWhereILike('plan_category', `%${data.query}%`).count()

        } else {
            result = await db('health_plan')
                .select(
                    'health_plan.id',
                    'health_plan.plan_name',
                    'health_plan.plan_type',
                    'health_plan.allow_dependent',
                    'health_plan.max_dependant',
                    'health_plan.plan_age_limit',
                    'health_plan.plan_cost',
                    'health_plan.created_at',
                    db.raw("health_plan_category.name as health_plan_category_name"),
                    db.raw("health_plan_category.health_plan_code as health_plan_category_code"),
                    db.raw("health_plan_category.band as health_plan_category_band"),
                    db.raw("user.id as `user_id`"),
                    db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
                )
                .innerJoin('user', 'user.id', 'health_plan.created_by')
                .innerJoin('health_plan_category', 'health_plan.plan_category', 'health_plan_category.id')
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "created_at"}`, `${data.sort.order ? data.sort.order : "asc"}`)

            total = await db("health_plan").count()
        }

        return { total, result }

    } catch (error) {
        console.log(error)
    }
}
export async function getAllHealthPlan(data) {
    try {

        result = await db('health_plan')
            .select(
                'health_plan.id',
                'health_plan.plan_name',
                'health_plan.plan_type',
                'health_plan.allow_dependent',
                'health_plan.max_dependant',
                'health_plan.plan_age_limit',
                'health_plan.plan_cost',
                'health_plan.created_at',
                db.raw("health_plan_category.name as health_plan_category_name"),
                db.raw("health_plan_category.health_plan_code as health_plan_category_code"),
                db.raw("health_plan_category.band as health_plan_category_band"),
                db.raw("user.id as `user_id`"),
                db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
            )
            .innerJoin('user', 'user.id', 'health_plan.created_by')
            .innerJoin('health_plan_category', 'health_plan.plan_category', 'health_plan_category.id')
            .orderBy("health_plan.plan_name", `asc`)

    } catch (error) {
        console.log(error)
    }
}

export async function getSingleHealthCategoryModelById(id) {
    return await db('health_plan_category')
        .select(
            'health_plan_category.id',
            'health_plan_category.name',
            'health_plan_category.is_active',
            'health_plan_category.health_plan_code',
            'health_plan_category.description',
            'health_plan_category.band',
            db.raw("user.id as user_id"),
            db.raw("user.email as user_email"),
            db.raw("user.phone_number as user_phone_number"),
            db.raw("user.role as user_role"),
            db.raw("user.user_disabled as is_user_account_active"),
            db.raw("user.last_active_at as user_last_active_at"),
            db.raw("concat(user.first_name, ' ', user.last_name) as `entered_by`")
        )
        .innerJoin('user', 'user.id', 'health_plan_category.created_by')
        .where('health_plan_category.id', `${id}`)
}

// Save Attach benefit
export async function createAttachedBenefitModel(data) {

    const createAttachedBenefit = {
        id: uuidv4(),
        benefit_name: data.benefit_name,
        limit_type: data.limit_type,
        limit_value: data.limit_value,
        health_plan_name: data.health_plan_name,
        benefit_item_id: data.benefit_item_id,
        created_by: data.created_by,
        health_plan_id: data.health_plan_id
    }

    return await db("attached_benefit").insert(createAttachedBenefit)
}

/*
Returns all benefit list
Use: in attaching benefits to health plan.
 */
export async function getAllBenefitListModel() {
    return await db('benefit_list')
        .select(
            'benefit_list.id',
            'benefit_list.benefit_name',
            'benefit_list.sub_category',
            'benefit_list.category',
        )

}

