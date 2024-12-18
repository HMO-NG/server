import {
    createUser, getUserByEmail, getUserByPhoneNumber,
    updateUserDetails
} from "../model/user-model.js"
import { getNhiaEnrolleeAndUserDetailsModel } from "../model/enrollee-model.js"
import bcrypt from 'bcrypt'
import Exception from "../util/exception.js"
import { generateUniqueReferralCode } from "../util/referral-code.js"
import session from "express-session"
import { getAllUsersOnlyEmailAndFullName } from '../model/user-model.js'
import { email } from "../util/email.js";


// import { createOTP, getOTP } from "../data-access/models/opt.js"
// import vine, { errors } from "@vinejs/vine"
// import transporter from "../../util/email.js"
// import { generateUniqueOtp } from "../../util/opt.js"
// import { signJWT } from "../../util/jwt.js"


/**
 * create a new user
 */

export async function create(data, next) {

    try {

        // check if email/user already exist
        const doesUserHaveAnEmail = await getUserByEmail(data.email)

        if (doesUserHaveAnEmail.length) {
            // throw an exception
            throw new Exception('email address already in use', 409)
        }

        // check if phone number already exist.
        const doesPhoneNumberAlreadyExist = await getUserByPhoneNumber(data.phone_number)

        if (doesPhoneNumberAlreadyExist.length) {
            // throw an exception
            throw new Exception('Phone number already in use', 409)
        }

        //generate a unique referal code
        const referralCode = await generateUniqueReferralCode(5)

        const userCreationResult = await createUser(data, referralCode)

        // if user obj is empty, throw an error
        if (!userCreationResult) {
            throw new Exception('user not created', 400)
        }
        // TODO if the frontend doesn't navigate to the signin page automatically, then add add the session manager.

        // generate an OTP and save to db
        // let otp = await generateUniqueOtp(5)

        // createOTP(otp, userCreationResult.id!)

        // send email verification
        // let mailOptions = {
        //     from: '"Example Team" <wami@abegshare.com>',
        //     to: 'wamiikechukwu@gmail.com',
        //     subject: 'Test Email',
        //     html: `Test email sent successfully with this token ${otp}`,
        // };

        // transporter.sendMail(mailOptions)

        return userCreationResult;

    } catch (error) {
        next(error)
    }

}

/*
 * sign in a user
 */
export async function signin(data) {

    const isEmailValid = await getUserByEmail(data.email)

    if (!isEmailValid.length) {
        throw new AuthServiceExpection('User email not found', 409)
    }

    const getHashedPassword = isEmailValid[0].password

    const comparePassword = await bcrypt.compare(data.password, getHashedPassword)

    if (!comparePassword) {
        throw new Exception("password incorrect", 401)
    }

    return { comparePassword, isEmailValid };

}

// return all users (email, first name and last name only)
export async function getAllUserByEmailFirstNameAndLastName(data) {

    return getAllUsersOnlyEmailAndFullName(data)

}

// update user information
export async function updateUserDetailsService(id, data) {

    if (!id) {
        throw new AuthServiceExpection('UserId not set', 400)
    }

    if (!data) {
        throw new AuthServiceExpection('data to update not found', 400)
    }

    return updateUserDetails(id, data)
}

// book user appointment
export async function bookAppointmentService(data) {

    const result = getNhiaEnrolleeAndUserDetailsModel(data)

    email("", 'ikechukwu.wami@hcihealthcare.ng', 'NEW NHIA User Complain')

}


export class AuthServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}