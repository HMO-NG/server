import express from 'express'
import { signJWT, verifyJWT } from '../util/jwt.js'
import { create, signin } from '../service/auth-service.js';

const router = express.Router()

// create user
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

    const userService = await signin(data, next)

    const token = signJWT({
        role: userService[0].role,
        id: userService[0].id,
    }, '24hr')

    if (userService) {
        res.status(200).json({
            message: `${data.email} login successfully`,
            data: token
        })
        }

    } catch (error) {
        console.log(error)
        next(error)
    }

});

// forget user password
// signout user

export default router;