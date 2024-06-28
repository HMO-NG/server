import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import { createNhisService } from '../service/nhis-service.js';

const router = express.Router()

// create health plan
router.post('/nhis/services/create', auth, async (req, res, next) => {

  try {

    const data = req.body

    let result = await createNhisService(data)

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
