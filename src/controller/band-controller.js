import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import {
   createBandService,
   updateBandByIdService,
   getBandByIdService,
   getAllBandsService,
}from "../service/band-service.js";
import Exception from "../util/exception.js";

const router = express.Router()

router.post('/band/create', auth, async (req, res, next) => {

  try {

    const data = req.body

    let result = await createBandService(data)

    if (!result) {
      throw new Exception("encountered an issue while creating Band", 400)
    }

    res.status(200).json({
      message: `${data.name} created successfully`,
      data: data
    })
  } catch (error) {
    console.error(error)
    next(error)

  }
});

router.patch('/band/update/:id',auth,async(req,res,next)=>{
  try{
    const data=req.body;
    const {id} =req.params;

    const response=updateBandByIdService(id,data);

    if (response){
      res.status(200).json({
        message:'health plan category has been updated sucessfully'
      })
    }


  }catch (error) {
         console.log(error)
         next(error)

  }

})

router.get('/band/get/:id',auth, async (req, res, next) => {
    try {
      const {id} =req.params;

        let result = await getBandByIdService(id)

          if (!result) {
            throw new Exception("encountered an issue", 400)
        }

        res.status(200).json({
            message: `sucessfully fetched band`,
            data:result
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get('/band/fetch',auth, async (req, res, next) => {
    try {

        let result = await getAllBandsService()

          if (!result) {
            throw new Exception("encountered an issue", 400)
        }

        res.status(200).json({
            message: `sucessfully fetched band`,
            data:result
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});


export default router;
