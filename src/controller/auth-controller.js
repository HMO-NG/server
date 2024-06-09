import express from 'express'
import { createProvider } from '../service/provider-service.js';
import Exception from '../util/exception.js';
import { create, get } from '../service/auth-service.js';

const router = express.Router()

// create user
router.post('/auth/signup', async (req, res, next) => {

    try {

        const data = req.body;

        const userService = await create(data, next)

        console.log(userService)

        if(userService){
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

// get user
router.post('/auth/signin', async (req, res, next) => {

    try {

        const data = req.body;

        req.session.remember_me = true;
        console.log(req.session)


        const userService = await get(data, next)

        if(userService){
            res.status(200).json({
            message: `${data.email} login successfully`,
            data: userService.id
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