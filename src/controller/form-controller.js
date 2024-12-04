import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import { createFormService } from '../service/forms-service.js';
import Exception from '../util/exception.js';

const router = express.Router()

// NOTE no auth - as this end point doesn't need auth.
router.post('/client/form/registration', async (req, res, next) => {
    try {

        const data = req.body.details
        const auth = req.body.auth

        console.log(data)
        console.log(auth)

        let result = await createFormService(data)

        if (!result) {
            throw new Exception("encountered an issue while performing your registration", 503)
        }

        res.status(200).json({
            message: `${data.firstname} your registration was created successfully`,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

export default router;