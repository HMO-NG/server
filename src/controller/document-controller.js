import 'dotenv/config'
import express, { json } from 'express'
import { auth ,verifyUserToken, verifyPermission } from '../middleware/auth-middleware.js';
import Exception from '../util/exception.js';
import {
addDocumentsService
} from '../service/document-service.js';
import axios from 'axios';
import multer from 'multer';
import FormData from 'form-data';
import { v2 as cloudinary } from 'cloudinary';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
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

router.post('/docs/upload/raw' ,upload.single('file'),auth,async (req,res,next)=>{
  const data = req.body;
   const file = req.file;

  let response;
  try{

    const originalName = file.originalname.replace(/\//g, '-');


    const fileExtension = originalName.split('.').pop().toLowerCase();

    const save_toCloudinary = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
        resource_type: 'raw',
        upload_preset: 'hciimage',
        public_id: originalName,
        context: `filetype=${file.mimetype.split('/')[1]}`
      });



    if (save_toCloudinary.secure_url) {
        response =await addDocumentsService({
            name:save_toCloudinary.display_name,
            url:save_toCloudinary.secure_url,
            doc_type:fileExtension,
            user_type:data.user_type,
            user_id:data.user_id,
            created_by:data.created_by,
      })
    }
    if (!save_toCloudinary.secure_url) {
      throw new Exception("Failed to upload file to Cloudinary", 500);
    }

  if (response) {
    res.status(200).json({
        message: `successfully added ${save_toCloudinary.display_name} document`,

    })
}

} catch (error) {
console.log(error)
next(error)
}

});


export default router;
