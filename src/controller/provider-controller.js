import express, { json } from 'express'
import { createProvider, editProviderById, getAllProvider, getProviderById } from '../service/provider-service.js';
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
router.post('/provider/get', auth, async (req, res, next) => {

    try {
        const data = req.body
        let result = await getAllProvider(data)

        if (result) {
            res.status(200).json({
                message: "List of all providers",
                data: result.result,
                total: result.total
            })
        }

    } catch (error) {
        console.log(error)
    }

})

// get provider by id
router.post('/provider/get/id', auth, async (req, res, next) => {

    try {


        const provider = req.body

        let result = await getProviderById(provider.id)

        console.log(provider.id)
        console.log(result)

        if (result) {
            res.status(200).json({
                message: "a single provider",
                data: result,
            })
        }
    } catch (error) {
        return error
    }
})
// edit
router.put('/provider/edit', auth, async (req, res, next) => {

    try {

        const data = req.body;

        const isDataUpdated = await editProviderById(data.id, data)

        if (isDataUpdated) {
            res.status(201).json({
                message: `${data.name} successfully updated`
            })
        }

    } catch (error) {

    }
})

// delete

export default router;