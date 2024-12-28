import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import {
    createHealthPlanCategoryService,
    createBenefitService,
    getAndSearchBenefitListService,
    getHealthPlanCategoryService,
    getAndSearchHealthPlanCategoryService,
    createHealthPlanService,
    getAndSearchHealthPlanService,
    getSingleHealthPlanCategory,
    getAllBenefitList,
    createAttachedBenefitService,
    getAttachedBenefitByHealthPlanIdService,
    updateAttachedBenefitService,
    deleteAttachedBenefitService
} from '../service/health-plan-service.js';
import Exception from "../util/exception.js";

const router = express.Router()

// get all health plan category
router.get('/healthplan/category/get', auth, async (req, res, next) => {

    try {
        let result = await getHealthPlanCategoryService()
        if (!result) {
            throw new Exception("encountered an issue while getting health plan category", 400)
        }

        res.status(200).json({
            message: `${result.length} returned successfully`,
            data: result
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

router.post('/healthplan/benefit/create', auth, async (req, res, next) => {

    try {

        const data = req.body

        let result = await createBenefitService(data)

        if (!result) {
            throw new Exception("encountered an issue while creating health benefit", 400)
        }

        res.status(200).json({
            message: `${data.benefit_name} created successfully`,
            data: data
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

// create health plan
router.post('/healthplan/create', auth, async (req, res, next) => {

    try {

        const data = req.body

        let result = await createHealthPlanService(data)

        if (!result) {
            throw new Exception("encountered an issue while creating health plan", 400)
        }

        res.status(200).json({
            message: `${data.plan_name} created successfully`,
            data: data
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

router.post('/healthplan/benefit/view', auth, async (req, res, next) => {

    try {

        const data = req.body

        let response = await getAndSearchBenefitListService(data)

        if (!response) {
            throw new Exception("encountered an issue while returning health benefit data", 400)
        }

        res.status(200).json({
            message: `health benefit list returned successfully`,
            data: response.result,
            total: response.total
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

router.post('/healthplan/category/view', auth, async (req, res, next) => {

    try {

        const data = req.body

        let response = await getAndSearchHealthPlanCategoryService(data)

        if (!response) {
            throw new Exception("encountered an issue while returning health benefit data", 400)
        }

        res.status(200).json({
            message: `health plan category list returned successfully`,
            data: response.result,
            total: response.total
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

router.post('/healthplan/view', auth, async (req, res, next) => {

    try {

        const data = req.body

        let response = await getAndSearchHealthPlanService(data)

        if (!response) {
            throw new Exception("encountered an issue while returning health benefit data", 400)
        }

        res.status(200).json({
            message: `health plan returned successfully`,
            data: response.result,
            total: response.total
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

router.post('/healthplan/category/create', auth, async (req, res, next) => {
    try {
        const data = req.body;

        let response = await createHealthPlanCategoryService(data)

        if (!response) {
            throw new Exception("encountered an issue while returning health benefit data", 400)
        }

        res.status(200).json({
            message: `${data.name} created successfully`,
            data: response.result,
            total: response.total
        })

    } catch (error) {
        console.log(error.status)
        next(error)
    }
})

// get a single health plan category by id
router.post('/healthplan/category/get', auth, async (req, res, next) => {
    try {
        const data = req.body;

        let response = await getSingleHealthPlanCategory(data.id)


        if (!response) {
            throw new Exception("encountered an issue while returning health plan category data", 400)
        }

        res.status(200).json({
            message: `${data.id} returned successfully`,
            data: response,
        })

    } catch (error) {
        console.log(error.status)
        next(error)
    }

})

// get all benefit lists
router.get('/healthplan/benefit/get', auth, async (req, res, next) => {
    try {

        let response = await getAllBenefitList()


        if (!response) {
            throw new Exception("encountered an issue while returning health benefit list data", 400)
        }

        res.status(200).json({
            message: "benfit list returned successfully",
            data: response,
        })

    } catch (error) {
        console.log(error.status)
        next(error)
    }

})

// create/save attached benefit lists
router.post('/healthplan/benefit/attach', auth, async (req, res, next) => {
    try {

        const data = req.body;

        if (!data) {
            throw new Exception("request body for attach benefit is empty", 400)
        }
        let response = await createAttachedBenefitService(data.data, data.userId, data.healthPlanId, data.healthPlanName)

        if (!response) {
            throw new Exception(`Error in encountered while attaching benefits to ${data.healthPlanName}`, 400)
        }


        res.status(200).json({
            message: "attached benefit to health plan successfully",
        })

    } catch (error) {
        console.log(error.status)
        next(error)
    }

})

// get attached benefit by health plan ID
router.post('/healthplan/benefit/attach/get', auth, async (req, res, next) => {
    try {

        const healthPlanId = req.body

        let response = await getAttachedBenefitByHealthPlanIdService(healthPlanId.id)

        if (!response) {
            throw new Exception("encountered an issue while returning the attached health plan benefit list", 400)
        }

        res.status(200).json({
            message: "attached benfit list returned successfully",
            data: response,
        })

    } catch (error) {
        console.log(error.status)
        next(error)
    }
})

// update attached benefit
router.post('/healthplan/benefit/attach/update', auth, async (req, res, next) => {
    try {

        const { id, data } = req.body

        let response = await updateAttachedBenefitService(id, data)

        if (!response) {
            throw new Exception("encountered an issue while returning the attached health plan benefit list", 400)
        }

        res.status(200).json({
            message: "health plan benefit updated successfully",
            data: response,
        })

    } catch (error) {
        console.log(error.status)
        next(error)
    }
})

// delete attached benefit
router.delete('/healthplan/benefit/attach/delete/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params

        if (!id) {
            throw new Exception("No attached benefit ID included", 400)
        }

        let response = await deleteAttachedBenefitService(id)

        if (!response) {
            throw new Exception("encountered an issue while deleting the attached health plan benefit", 400)
        }

        res.status(200).json({
            message: "health plan benefit deleted successfully",
            data: response,
        })

    } catch (error) {
        console.log(error.status)
        next(error)
    }
})

export default router;
