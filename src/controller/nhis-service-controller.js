import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import { createNhisService } from '../service/nhis-service.js';

const router = express.Router()

// create health plan
router.post('/nhis/services/create', auth, async (req, res, next) => {

    try {
        const data = req.body

        if (Array.isArray(data)) {

            for (let i = 0; i < data.length; i++) {
            //   const batch = data.slice(1);
              try {
                // await Promise.all(batch.map(item => createNhisServiceModel(item)));

                console.log(`Processed batch ${i}`);
                await createNhisService(data[i])
              } catch (error) {
                console.error(`Error processing batch ${i}`, error);
              }
            }
          }

        // let result = await createNhisService(data)

        if (!result) {
            throw new Exception("encountered an issue while creating nhis service", 401)
        }

        res.status(200).json({
            message: `${data.name} created successfully`,
            code: data.code
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

export default router;
