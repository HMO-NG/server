import express, { json } from 'express'
import { auth ,verifyUserToken, verifyPermission } from '../middleware/auth-middleware.js';
import {
  CreatePrivateClaimService,
  getAllPrivateClaimsService,
  getPrivateClaimsByIdService,
  updateClaimByIdService,
} from '../service/private-claims-service.js';

import Exception from '../util/exception.js';
import { email } from '../util/email.js';
import bodyParser from 'body-parser';
const router = express.Router()


router.post('/privates/claim/create', auth, async (req, res, next) => {

  try {

      const data = req.body

      let result = await CreatePrivateClaimService(data)

      if (!result) {
          throw new Exception("encountered an issue while creating claim", 400)
      }

      res.status(200).json({
          message: "Claim created successfully",
      })
  } catch (error) {
      console.log(error.status)
      next(error)

  }
});

router.get('/privates/claim/getall', async (req, res, next) => {

  try {

      let result = await getAllPrivateClaimsService()
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }

      if (result) {
          res.status(200).json({
              message: "List of all Claims",

              data : result.map(claim => ({
                        id: claim.id,
                        claim_type: claim.claim_type,
                        diagnosis: claim.diagnosis,
                        claimed_services: claim.claimed_services,
                        encounter_date: claim.encounter_date,
                        admitted_date: claim.admitted_date,
                        discharged_date: claim.discharged_date,
                        requested_amount: claim.requested_amount,
                        approved_amount: claim.approved_amount,
                        review_comment: claim.review_comment,
                        reviewed_at: claim.reviewed_at,
                        reviewed_by: claim.reviewed_by,
                        pa_code: claim.pa_code,
                        status: claim.status,
                        created_at: claim.created_at,
                        created_by: claim.created_by,

                        enrollee: {
                          id: claim.enrollee_id,
                          name: claim.enrollee_name,
                          health_plan_id: claim.enrollee_plan,
                          health_plan_name: claim.enrollee_plan_name,
                        },

                        provider: {
                          name: claim.provider_name,
                          code: claim.provider_code,
                        },
            }))
    }
)}

  } catch (error) {
      console.log(error)
      next(error)
  }

});

router.get('/privates/claim/get/:id', async (req, res, next) => {

  try {
      const {id} = req.params

      let claim = await getPrivateClaimsByIdService(id)
       if (!claim) {
                  throw new Exception("encountered an issue", 400)
        }

      if (claim) {
          res.status(200).json({
              message: "Successfully got Claim",

              data : {
                        id: claim.id,
                        claim_type: claim.claim_type,
                        diagnosis: claim.diagnosis,
                        claimed_services: claim.claimed_services,
                        encounter_date: claim.encounter_date,
                        admitted_date: claim.admitted_date,
                        discharged_date: claim.discharged_date,
                        requested_amount: claim.requested_amount,
                        approved_amount: claim.approved_amount,
                        review_comment: claim.review_comment,
                        reviewed_at: claim.reviewed_at,
                        reviewed_by: claim.reviewed_by,
                        pa_code: claim.pa_code,
                        status: claim.status,
                        created_at: claim.created_at,
                        created_by: claim.created_by,

                        enrollee: {
                          id: claim.enrollee_id,
                          name: claim.enrollee_name,
                          health_plan_id: claim.enrollee_plan,
                          health_plan_name: claim.enrollee_plan_name,
                        },

                        provider: {
                          name: claim.provider_name,
                          code: claim.provider_code,
                        },
            }
    }
)}

  } catch (error) {
      console.log(error)
      next(error)
  }

});

router.put('/privates/claim/update/:id', auth, async (req, res, next) => {

  try {
      const {id}=req.params;
      const data = req.body

      let result = await updateClaimByIdService(id,data)

      if (!result) {
          throw new Exception("encountered an issue while creating claim", 400)
      }

      res.status(200).json({
          message: "Claim update successfully",
      })
  } catch (error) {
      console.log(error.status)
      next(error)

  }
});

export default router;
