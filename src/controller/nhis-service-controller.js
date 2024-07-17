import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import {
    createNhisServiceTarrif,
    getAndSearchNhisTarrifService,
    createNhiaDrugTarrif
} from '../service/nhis-service.js';

const router = express.Router()

// create health plan
router.post('/nhis/service/tarrif/create', auth, async (req, res, next) => {

    try {

        const data = req.body

        let result = await createNhisServiceTarrif(data)

        if (!result) {
            throw new Exception("encountered an issue while creating nhis service", 401)
        }

        res.status(200).json({
            message: `${data.name} created successfully`,
            code: data.code
        })
    } catch (error) {
        console.log(error)
        next(error)

    }
});

router.post('/nhis/services/search/get', auth, async (req, res, next) => {

    try {

        const data = req.body

        let response = await getAndSearchNhisTarrifService(data)

        if (!response) {
            throw new Exception("encountered an issue while get or searching nhis service", 401)
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

router.post('/nhis/drug/tarrif/create', auth, async (req, res, next) => {
    try {

        const data = req.body

        let result = await createNhiaDrugTarrif(data)

        if (!result) {
            throw new Exception("encountered an issue while creating nhis service", 401)
        }

        res.status(200).json({
            message: `${data.name} created successfully`,
            code: data.code
        })
    } catch (error) {
        console.log(error)
        next(error)

    }
});


export default router;
