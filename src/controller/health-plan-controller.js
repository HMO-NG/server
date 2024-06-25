import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import { createHealthPlan } from '../service/health-plan-service.js';

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

export default router;
