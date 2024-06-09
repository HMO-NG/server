import express from 'express'
import { createProvider } from '../service/provider-service.js';
import Exception from '../util/exception.js';

const router = express.Router()

// create provider
// TODO rate limiter
// TODO roles and permission
router.post('/provider/create', async (req, res, next) => {

    try {
        let result = await createProvider(req, res, next)

        if(!result){
            throw new Exception("encountered an issue while creating provider", 401)
        }

        res.status(200).json({
            message: "provider created successfully",
            data:  result.id
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

// get
// edit
// delete

export default router;