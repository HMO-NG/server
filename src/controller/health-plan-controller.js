import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import {
    createHealthPlan,
    createBenefitService,
    getAndSearchBenefitListService,
    getHealthPlanCategoryService
} from '../service/health-plan-service.js';

const router = express.Router()

// create health plan
router.post('/healthplan/create', auth, async (req, res, next) => {

    try {

        const data = req.body
        let result = await createHealthPlan(data)
        if (!result) {
            throw new Exception("encountered an issue while creating health plan", 401)
        }

        res.status(200).json({
            message: `${data.name} created successfully`,
            code: data.health_plan_code
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

// get all health plan category
router.get('/healthplan/category/get', auth, async (req, res, next) => {

    try {
        let result = await getHealthPlanCategoryService()
        if (!result) {
            throw new Exception("encountered an issue while getting health plan category", 401)
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
            throw new Exception("encountered an issue while creating health benefit", 401)
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

router.post('/healthplan/benefit/view', auth, async (req, res, next) => {

    try {

        const data = req.body

        let response = await getAndSearchBenefitListService(data)

        if (!response) {
            throw new Exception("encountered an issue while returning health benefit data", 401)
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

export default router;
