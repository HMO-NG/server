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
        provider_Address: data.provider_Address,
        created_by: data.created_by
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
                    'nhis_enrollee.provider_id',
                    'nhis_enrollee.provider_name',
                    db.raw(`"user"."id" as "user_id"`),
                    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "entered_by"`)
                )
                .innerJoin('user', 'user.id', '=', "nhis_enrollee.created_by")
                .whereILike('policy_id', `%${data.query}%`)
                .limit(`${data.pageSize}`)
                .offset(`${(data.pageIndex - 1) * data.pageSize}`)
                .orderBy(`${data.sort.key ? data.sort.key : "nhis_enrollee.created_at"}`, `${data.sort.order}`)


            total = await db("nhis_enrollee").whereILike('policy_id', `%${data.query}%`)
                .orWhereILike('surname', `%${data.query}%`).count()

        } else {
            result = await db('nhis_enrollee')
                .select(
                    'nhis_enrollee.id',
                    'nhis_enrollee.policy_id',
                    'nhis_enrollee.surname',
                    'nhis_enrollee.other_names',
                    'nhis_enrollee.dob',
                    'nhis_enrollee.sex',
                    'nhis_enrollee.provider_id',
                    'nhis_enrollee.provider_name',
                    db.raw(`"user"."id" as "user_id"`),
                    db.raw(`concat("user"."first_name", \' \', "user"."last_name") as "entered_by"`)
                )
                .innerJoin('user', 'user.id', '=', "nhis_enrollee.created_by")
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

// get all nhis enrollee by id and dob - for unique searching
export async function bindUserToNhiaEnrolleeModel(data) {

    //db.raw("to_char(dob, 'YYYY-MM-DD') as dob") had to be use as the returned value (2012-10-15T23:00:00.000Z) from the db was converted
    // using UTC timezone, will removed -1hour from the Date

    const hasNhiaIdBeenUsed = await db('nhis_enrollee').where('policy_id', data.id)
        .whereRaw("dob::date = ?::date", [data.dob])

    console.log("data from db for linkedUser", hasNhiaIdBeenUsed)

    if (hasNhiaIdBeenUsed[0].linked_to_user === data.userid) {
        return 'NHIA ID already linked to your user account'
    }

    if (hasNhiaIdBeenUsed[0].linked_to_user != null && hasNhiaIdBeenUsed[0].linked_to_user !== data.userid){
        return `NHIA ID is linked to this user, ${hasNhiaIdBeenUsed[0].surname +' '+ hasNhiaIdBeenUsed[0].other_names +' with policy number '+ hasNhiaIdBeenUsed[0].policy_id}. If you think this is mistake, kindly contact support@hcihealthcare.ng for corrections`
    }


    return await db('nhis_enrollee')
        .where('policy_id', data.id)
        .whereRaw("dob::date = ?::date", [data.dob])
        .update({ linked_to_user: data.userid })
        .returning([
            db.raw('nhis_enrollee.*'),
            db.raw("to_char(dob, 'YYYY-MM-DD') as dob")
        ]);
}

//get nhis enrollee + binded user details in the mobile app
export async function getNhiaEnrolleeAndUserDetailsModel(data) {
    try {

        return await db('nhis_enrollee')
            .select(
                'nhis_enrollee.id',
                'nhis_enrollee.policy_id',
                'nhis_enrollee.relationship',
                'nhis_enrollee.surname',
                'nhis_enrollee.other_names',
                'nhis_enrollee.dob',
                'nhis_enrollee.sex',
                'nhis_enrollee.company_id',
                'nhis_enrollee.provider_id',
                'nhis_enrollee.provider_name',
                'user.email',
                'user.phone_number',
                'user.type',
                'user.address',
                'user.employer_name',
            )
            .innerJoin('user', 'user.id', '=', "nhis_enrollee.linked_to_user")
            .where('linked_to_user', data.userid)

    } catch (error) {
        console.log(error)
    }
}

// NHIA - Check if user is linked to an NHIA id
export async function checkIfNhiaIdIsLinked(data) {

    return await db('nhis_enrollee').select('linked_to_user').where('linked_to_user', data.userid)
}