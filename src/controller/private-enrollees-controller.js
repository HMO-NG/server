import express, { json } from 'express'
import { auth ,verifyUserToken, verifyPermission } from '../middleware/auth-middleware.js';
import {
  getAllProviderForPrivatesService,
  createPrivateEnrolleeService,getPrivateEnrolleeByIdService,updatePrivateEnrolleeByIdAndCreateProfileService,createPrivateAccount,
  createPrivateEnrolleeDependantsService,getAllPrivateEnrolleeService,
  getPrivateEnrolleeByClientIdService,onboardSinglePrivateEnrolleeService
} from '../service/private-enrollees-service.js';

import generatePassword from '../util/generate-enrollee-password.js';
import Exception from '../util/exception.js';
import uploadImage from '../util/upload_image.js';
import { email } from '../util/email.js';
import bodyParser from 'body-parser';
const router = express.Router()




router.post('/privates/enrollee/company-masterlist',async (req,res,next)=>{
  try{
    const {data}= req.body;
    const {company_info}= req.body;
    const {enrolled_by}= req.body;

    let response = await createPrivateEnrolleeService(data,company_info.company_id,enrolled_by)
    let link;
    if (data.beneficiary_type=="individual"){
      link = `http://localhost:5174/${response[0].id}/${company_info.company_name}/${enrolled_by}/false/null/mainform`;
    }
    else if(data.beneficiary_type=="family"){
      link = `http://localhost:5174/${response[0].id}/${company_info.company_name}/${enrolled_by}/true/${data.family_size}/mainform`;
    }
    let mainBody=`welcome to hci healthcare ${data.first_name}, please use this link ${link} to register and add the rest of your details`;
    let subject = `Self enrollement portal ${company_info.company_name} enrollee`;


    email(mainBody,data.email,subject)
   console.log(mainBody,data.email,subject)
    res.status(200).json({
      message:'successfully sent onboarding mail',
      data:response,
    })
  }catch(error){
    console.error(error);
    next(error)
  }



});

//this is to onboard individual enrolee from the CRM 
router.post('/privates/enrollee/onboarding',async (req,res,next)=>{
  try{
    const data= req.body;
    let fname=data.first_name;
    let lname=data.last_name;
    let generated_password= generatePassword(`${fname} ${lname}`)
    const user_data={
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      password:generated_password,
       role:"private",
       type:"enrollee",

    }
    const create_acc =await createPrivateAccount(user_data,next)
    const response = await onboardSinglePrivateEnrolleeService(data,create_acc.id)

    let mainBody=`welcome to hci healthcare ${data.first_name}, these are your login details email: ${data.email} password: ${generated_password}`;
    let subject = `Hci login details`;


    email(mainBody,data.email,subject)
   console.log(mainBody,data.email,subject)
   if(response && create_acc){
    res.status(200).json({
      message:"successfully added enrollee information and created profile",
      data:response
    })
  }
  }catch(error){
    console.error(error);
    next(error)
  }



});

router.get('/privates/provider/get', async (req, res, next) => {

    try {
        let result = await getAllProviderForPrivatesService()
         if (!result) {
                    throw new Exception("encountered an issue", 400)
          }

        if (result) {
            res.status(200).json({
                message: "List of all providers",
                data:result
            })
        }

    } catch (error) {
        console.log(error)
        next(error)
    }

});

router.get('/privates/enrollee/get/:id', async (req, res, next) => {

  try {
      const {id} = req.params
      let response = await getPrivateEnrolleeByIdService(id)
       if (!response) {
                  throw new Exception("encountered an issue", 400)
        }

      if (response) {
          res.status(200).json({
              message: "successfully got employee data",
              data:response
          })
      }

  } catch (error) {
      console.log(error)
      next(error)
  }

});

// This generate a temporary password and send to the PRINCIPAL email address.
//AND NOT TO THE DEPENDENTS
router.put('/privates/enrollee/form/:id', async (req, res, next) => {
try{
  const data = req.body
  const {id} = req.params
  let fname=data.first_name;
  let lname=data.last_name;
  let generated_password= generatePassword(`${fname} ${lname}`)
  data.is_active=true
  const user_data={
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
    password:generated_password,
     role:"private",
     type:"enrollee",

  }
  const create_acc =await createPrivateAccount(user_data,next)
  const result = await updatePrivateEnrolleeByIdAndCreateProfileService(id, data,create_acc.id)
  let mainBody=`welcome to hci healthcare ${data.first_name}, these are your login details email: ${data.email} password: ${generated_password}`;
  let subject = `Hci login details`;


  email(mainBody,data.email,subject)
  if(result && create_acc){
    res.status(200).json({
      message:"successfully added enrollee information and created profile",
    })
  }
}catch(error){
  console.error(error)
  next(error)
}
});
router.post('/privates/enrollee/dependent/:id', async (req, res, next) => {

  try {
      const {id} = req.params
      const data= req.body
      let fname=data.first_name;
      let lname=data.last_name;
      let generated_password= generatePassword(`${fname} ${lname}`)
      data.is_active=true
      const user_data={
        email: data.email,
        first_name:data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        password:generated_password,
         role:"dependent",
         type:"enrollee",

      }
      const create_acc =await createPrivateAccount(user_data,next)
      const response = await createPrivateEnrolleeDependantsService(data,id,create_acc.id)
      let mainBody=`welcome to hci healthcare ${data.first_name}, you have been registered as a dependant these are your login details email: ${data.email} password: ${generated_password}`;
      let subject = `Hci login details`;
      email(mainBody,data.email,subject)
       if (!response) {
                  throw new Exception("encountered an issue", 400)
        }

      if (response && create_acc) {
          res.status(200).json({
              message: "successfully created beneficiaries",
          })
      }

  } catch (error) {
      console.log(error)
      next(error)
  }

});
router.get('/privates/enrollee/getall', auth,async (req, res, next) => {
try{
   const response = await getAllPrivateEnrolleeService()
   if (!response) {
    throw new Exception("encountered an issue", 400)
}
   if (response){
    res.status(200).json(
      {message:"sucessfully got all enrollees",
       data:response,
      }
    )
   }

}catch(error){
  console.error()
  next(error)
}
});
router.get('/privates/enrollee/get/by/client/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
     const response = await getPrivateEnrolleeByClientIdService(id)
     let enrolee_count=  parseInt(response.count[0].count)
     if (!response) {
      throw new Exception("encountered an issue", 400)
  }
     if (response){
      res.status(200).json(
        {message:"sucessfully got all enrollees registered under this client",
         data:response.result,
         count:enrolee_count
        }
      )
     }

  }catch(error){
    console.error()
    next(error)
  }
  });


export default router;
