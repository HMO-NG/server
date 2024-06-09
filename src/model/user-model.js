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
export async function getUserByReferralCode(userReferralCode) {
    return await db('user').select().where('referral_code', userReferralCode);
}
