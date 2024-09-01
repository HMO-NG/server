import knex from "knex";
import config from "../knexfile.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import 'dotenv/config';

let db = knex(config[process.env.NODE_ENV || 'development']);

// create user
export async function createUser(userDetails, referralCode) {

    const data = {
        id: uuidv4(),
        email: userDetails.email,
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        phone_number: userDetails.phone_number,
        role: userDetails.role,
        type: userDetails.type,
        referral_code: referralCode
    };

    function passwordToString() {
        const isPasswordString = userDetails.password;
        if (typeof isPasswordString !== 'string') {
            throw new Error('user password is either empty or undefined');
        }
        return isPasswordString;
    }
    // encrypt password
    const salt = await bcrypt.genSalt(13);
    data.password = await bcrypt.hash(passwordToString(), salt);

    // insert into db
    // TODO uncomment when you want to launch
    await db("user").insert(data);

    // delete the password from variable
    if (data.password) {
        delete data.password;
    }
    return data;
}

// get user by email
export async function getUserByEmail(userEmail) {
    return await db('user').select().where('email', userEmail);
}

// get user by id
export async function getUserById(id) {
    return await db('user').select().where('id', id);
}

export async function getUserByReferralCode(userReferralCode) {
    return await db('user').select().where('referral_code', userReferralCode);
}

// get all users (email and full-name)
export async function getAllUsersOnlyEmailAndFullName(data) {

    let result;
    let total;

    if (data.query) {

        result = await db('user').select(
            'id',
            'email',
            db.raw(`concat("first_name", \' \', "last_name") as "user_full_name"`)
        )
            .whereILike('email', `%${data.query}%`)
            .orWhereILike('first_name', `%${data.query}%`)
            .orWhereILike('last_name', `%${data.query}%`)
            .limit(`${data.pageSize}`)
            .offset(`${(data.pageIndex - 1) * data.pageSize}`)
            .orderBy(`${data.sort.key ? data.sort.key : "user.created_at"}`, `${data.sort.order}`)

        total = await db("user").whereILike('email', `%${data.query}%`).orWhereILike('first_name', `%${data.query}%`)
            .orWhereILike('last_name', `%${data.query}%`).count()
    } else {
        result = await db('user').select(
            'id',
            'email',
            db.raw(`concat("first_name", \' \', "last_name") as "user_full_name"`)
        )
            .limit(`${data.pageSize}`)
            .offset(`${(data.pageIndex - 1) * data.pageSize}`)
            .orderBy(`${data.sort.key ? data.sort.key : "user.created_at"}`, `${data.sort.order}`)

        total = await db("user").count()
    }

    return { total, result }
}
