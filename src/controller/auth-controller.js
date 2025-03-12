import express, { response } from 'express'
import { signJWT, verifyJWT } from '../util/jwt.js'
import {
    create, signin, getAllUserByEmailFirstNameAndLastName,
    updateUserDetailsService, bookAppointmentService
} from '../service/auth-service.js';
import { auth } from '../middleware/auth-middleware.js';
import Exception from '../util/exception.js';



const router = express.Router()

// create user

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Endpoint to register a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@domain.com"
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               phone_number:
 *                 type: string
 *                 example: "+1234567890"
 *               role:
 *                 type: string
 *                 example: "admin"
 *               type:
 *                 type: string
 *                 example: "premium"
 *     responses:
 *       201:
 *         description: User successfully created.
 *       400:
 *         description: |
 *           Bad request. Possible reasons include:
 *           - user password is either empty or undefined
 *           - user not created
 *       409:
 *         description: |
 *           Conflict. Possible reasons include:
 *           - Phone number already in use
 *           - Email address already in use
 */

router.post('/auth/signup', async (req, res, next) => {

    try {

        const data = req.body;

        const userService = await create(data, next)

        console.log(userService)

        if (userService) {
            res.status(200).json({
                message: `${data.email} created successfully`,
                data: userService.id
            })
        }

    } catch (error) {
        console.log(error)
        next(error)
    }

});

// signin a user
router.post('/auth/signin', async (req, res, next) => {

    try {

        const data = req.body;

        req.session.remember_me = true;

        const { comparePassword, isEmailValid } = await signin(data, next)

        const token = await signJWT({
            role: isEmailValid[0].role,
            id: isEmailValid[0].id,
        }, '24hr')

        if (comparePassword) {
            res.status(200).json({
                message: `${data.email} login successfully`,
                token: token,
                user:
                {
                    user_id: isEmailValid[0].id,
                    email: isEmailValid[0].email,
                    first_name: isEmailValid[0].first_name,
                    last_name: isEmailValid[0].last_name,
                    authority: isEmailValid[0].role


                }
            })
        }

    } catch (error) {
        console.log(error)
        next(error)
    }

});

// get all user (returns only email and full name)
router.post('/auth/user/permission', auth, async (req, res, next) => {
    try {

        const { result, total } = await getAllUserByEmailFirstNameAndLastName(req.body)

        res.status(200).json({
            message: `returned successfully`,
            data: result,
            total: total
        })


    } catch (error) {
        console.log(error)
        next(error)
    }
})

// update user
router.post('/auth/user/update', auth, async (req, res, next) => {
    try {

        const { id, data } = req.body

        let reponse = updateUserDetailsService(id, data)

        if (!response) {
            throw new Exception('Response empty, mostly like user details did not save', 400)
        }

        res.status(200).json({
            message: `Your information saved successfully`,
        })


    } catch (error) {
        console.log(error)
        next(error)
    }
})

// send user complain
router.post('/auth/user/bookapointment', auth, async (req, res, next) => {
    try {

        const { data } = req.body

        let response = await bookAppointmentService(data)

        res.status(200).json({
            message: `Your appointment booked successfully, you will be contacted shortly.`,
        })


    } catch (error) {
        console.log(error)
        next(error)
    }
})

// forget user password
// signout user

export default router;