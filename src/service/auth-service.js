import { createUser, getUserByEmail } from "../model/user-model.js"
import bcrypt from 'bcrypt'
import Exception from "../util/exception.js"
import { generateUniqueReferralCode } from "../util/referral-code.js"
import session from "express-session"

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

        const comparePassword = bcrypt.compare(data.password, getHashedPassword)

        if (!comparePassword) {
            throw new Exception("password incorrect", 401)
        }

        return isEmailValid;

}

export class AuthServiceExpection extends Exception{
    constructor(message, status){
        super(message, status)
    }
}