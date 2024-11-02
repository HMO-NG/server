import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import {
    createNhisEnrolleeService,
    getAndSearchNhisEnrolleeService,
    getAllNhisEnrolleeService
} from '../service/enrollee-service.js';
import Exception from '../util/exception.js';

const router = express.Router()

router.post('/nhia/enrollee/create', auth, async (req, res, next) => {
    // getAllNhisEnrolleeService
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

router.post('/nhis/enrollee/get', auth, async (req, res, next) => {

    try {

        const data = req.body

        if (!data.id || !data.dob || data.id.length === 0 || data.dob.length === 0) {
            /* 400 Bad Request indicates that the server understood the request,
            but there's a problem with the client-provided data.
            This perfectly aligns with the situation where the id or dob fields
            in the request body (req.body) are empty. */
            throw new Exception("NHIA ID or date of birth is empty", 400)
        }

        let response = await getAllNhisEnrolleeService(data)

        res.status(200).json({
            message: `response returned successfully`,
            data: response,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

export default router;