import express, { json } from 'express'
import { auth ,verifyUserToken, verifyPermission } from '../middleware/auth-middleware.js';
import Exception from '../util/exception.js';
import {
addDocumentsService
} from '../service/document-service.js';
const router = express.Router()

router.post('/doc/add',auth,async (req,res,next)=>{
  const data= req.body;
  try{
    const response =addDocumentsService(data)
  if (response) {
    res.status(200).json({
        message: "successfully added documents",

    })
}

} catch (error) {
console.log(error)
next(error)
}

});

export default router;
