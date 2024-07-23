import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import Exception from '../util/exception.js';
import { getHealthCheckService } from '../service/healthcheck-service.js';


const router = express.Router()

router.get('/healthcheck', async (req, res, next) => {
    try {

        let result = await getHealthCheckService()

        if (!result) {
            throw new Exception("encountered an issue with the health check", 400)
        }

        res.status(200).json({
            message: `Health Check: Server is online and healthy!`,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get('/session/checker', auth, async (req, res, next) => {
    try {

        res.status(200).json({
            message: `session checker!`,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

export default router;