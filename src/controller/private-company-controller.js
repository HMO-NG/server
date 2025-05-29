import express, { json } from 'express'
import { auth ,verifyUserToken, verifyPermission } from '../middleware/auth-middleware.js';
import {
  createPrivateCompanyService,
  getAllPrivateCompanyService,changePrivateCompanyStatusService,updateClientService,
} from '../service/private-company-service.js';
import Exception from '../util/exception.js';
import generatePassword from '../util/generate-enrollee-password.js';
import {
createPrivateAccount
} from '../service/private-enrollees-service.js';
const router = express.Router()
router.post('/privates/company/create', async (req, res, next) => {
    try {

        const data = req.body
        let fname=data.company_name;
        let lname=data.company_name;
        let generated_password= generatePassword(`${fname} ${lname}`)
        const user_data={
          email: data.primary_contact_email,
          first_name:data.company_name,
          last_name: data.company_name,
          phone_number: data.primary_contact_phonenumber,
          password:generated_password,
           role:"client",
           type:"private",

        }
        const create_acc =await createPrivateAccount(user_data,next)

        let result = await createPrivateCompanyService(data)
        let mainBody=`welcome to hci healthcare ${data.company_name}, these are your login details email: ${data.email} password: ${generated_password}`;
        let subject = `Hci login details`;


        // email(mainBody,data.email,subject)
        console.log(mainBody,data.primary_contact_email,subject)

        if (!result) {
            throw new Exception("encountered an issue while creating company", 400)
        }
        if(result && create_acc){
        res.status(200).json({
            message: `${data.company_name} created successfully`,
            data:{...result[0],
            profile_id:create_acc.id}
        })
      }
    } catch (error) {
        console.log(error)
        next(error)
    }

});

router.get('/privates/company/get', async (req, res, next) => {
    try {

        let result = await getAllPrivateCompanyService()

        if (!result) {
            throw new Exception("encountered an issue", 400)
        }

        res.status(200).json({
            message: `CompanyCheck: Server is online and healthy!`,
            data:result
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});
router.put('/privates/company/update/status/:id',auth, async (req, res, next) => {
  try {
    const data =req.body;
    const {id} =req.params;

      const result = await changePrivateCompanyStatusService(data,id)

      if (!result) {
          throw new Exception("encountered an issue", 400)
      }
      let new_status;
      let get_status =result.map((data)=>(
        new_status=data.is_active
      ))

      res.status(200).json({
          message: (new_status==true)?`successfully activated company status`:(new_status==false)?`successfully deactivatd company status`:'none',
          data:new_status
      })
  } catch (error) {
      console.log(error)
      next(error)
  }
});
router.put('/privates/company/update/:id', async (req, res, next) => {
  try {
    const data =req.body;
    const {id} =req.params;

      const result = await updateClientService(data,id)

      if (!result) {
          throw new Exception("encountered an issue", 400)
      }


      res.status(200).json({
          message: 'successfully updated client info ',

      })
  } catch (error) {
      console.log(error)
      next(error)
  }
});


export default router;
