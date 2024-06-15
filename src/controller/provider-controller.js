import express from 'express'
import { createProvider, getAllProvider } from '../service/provider-service.js';
import Exception from '../util/exception.js';
import { auth, verifyUserToken, verifyPermission } from '../middleware/auth-middleware.js';

const router = express.Router()

// TODO rate limiter
// TODO roles and permission

// create provider
router.post('/provider/create', auth, async (req, res, next) => {

    try {

        const data = req.body

        let result = await createProvider(data)

        if (!result) {
            throw new Exception("encountered an issue while creating provider", 401)
        }

        res.status(200).json({
            message: "provider created successfully",
            data: result.id
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

// get all provider
router.get('/provider/get', auth, async (req, res, next) => {

        try {
            let result = await getAllProvider()

            if (result) {
                res.status(200).json({
                    message: "List of all providers",
                    data: result
                })
            }

        } catch (error) {
            console.log(error)
        }

    })
// edit
// delete

export default router;