import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import {
    createNhisEnrolleeService,
    getAndSearchNhisEnrolleeService
} from '../service/nhis-service.js';

const router = express.Router()

router.post('/nhia/enrollee/create', auth, async (req, res, next) => {
    try {

        const data = req.body

        let result = await createNhisEnrolleeService(data)

        if (!result) {
            throw new Exception("encountered an issue while creating nhis enrollee", 400)
        }

        res.status(200).json({
            message: `${data.other_names} created successfully`,
            code: data.policy_id
        })
    } catch (error) {
        console.log(error)
        next(error)

    }
});

router.post('/nhis/enrollee/search', auth, async (req, res, next) => {

    try {

        const data = req.body

        let response = await getAndSearchNhisEnrolleeService(data)

        if (!response) {
            throw new Exception("encountered an issue while getting or searching nhis enrollee", 400)
        }

        res.status(200).json({
            message: `response returned successfully`,
            data: response.result,
            total: response.total
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

export default router;