import express, { json } from 'express'
import {
    createProvider, editProviderActivationState, editProviderById, getAllProvider, getProviderById,
    createNHIAProviderService,
    getNHIAProviderByHCPIDService
} from '../service/provider-service.js';
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
            throw new Exception("encountered an issue while creating provider", 400)
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
        next(error)
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
        next(error)
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
        console.log(error)
    }
})

// edit provider status
router.patch('/provider/status/edit', auth, async (req, res, next) => {

    try {

        const data = req.body;

        const isDataUpdated = await editProviderActivationState(data.id, data)

        if (isDataUpdated) {
            res.status(201).json({
                message: `${data.name} activation status updated successfully`
            })
        }

    } catch (error) {
        console.log(error)
        next(error)
    }

})

// --- FOR NHIA PROVIDERS ---

// create NHIA provider
router.post('/provider/nhia/create', auth, async (req, res, next) => {

    try {

        const data = req.body

        let result = await createNHIAProviderService(data)

        if (!result) {
            throw new Exception("encountered an issue while creating provider", 400)
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

// get NHIA provider by HCP ID
router.post('/provider/nhia/get', auth, async (req, res, next) => {

    try {
        const data = req.body

        if (data.hcpId.length === 0) {
            throw new Exception("Hcp Id is an empty string", 400)
        }

        let result = await getNHIAProviderByHCPIDService(data.hcpId)

        if (result) {
            res.status(200).json({
                message: "result returned successfully",
                data: result,
            })
        }
    } catch (error) {
        next(error)
    }
})
export default router;