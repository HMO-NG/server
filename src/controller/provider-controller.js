import express, { json } from 'express'
import {
    createProvider, editProviderActivationState, editProviderById, getAllProvider, getProviderById,
    createNHIAProviderService,
    getNHIAProviderByHCPIDService,CreateProviderTariffService,getProviderTariffByIdService,
    getAllProviderTariffService,getSingleProviderTariffByIdService,
    CreatePreAuthorizationService,getAllPreAuthorizationService,getPreAuthorizationByProviderIdService,
    getSinglePreAuthorizationByIdService,updatePreAuthorizationByIdService,getPATariffAndDiagnosisByCodeService,
} from '../service/provider-service.js';
import Exception from '../util/exception.js';
import { auth, verifyUserToken, verifyPermission } from '../middleware/auth-middleware.js';

const router = express.Router()

// TODO rate limiter
// TODO roles and permission

// create provider
router.post('/provider/create', auth, async (req, res, next) => {

    try {

        const data = req.body

        let result = await createProvider(data)
        if (result == 'provider already exists!'){
          throw new Exception("provider already exists", 422)
        }

        if (!result) {
            throw new Exception("encountered an issue while creating provider", 400)
        }

        res.status(200).json({
            message: "provider created successfully",
            data: result.id
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

// get all provider
router.post('/provider/get', auth, async (req, res, next) => {

    try {
        const data = req.body
        let result = await getAllProvider(data)

        if (result) {
            res.status(200).json({
                message: "List of all providers",
                data: result.result,
                total: result.total
            })
        }

    } catch (error) {
        console.log(error)
        next(error)
    }

})

// get provider by id
router.post('/provider/get/id', auth, async (req, res, next) => {

    try {


        const provider = req.body

        let result = await getProviderById(provider.id)

        console.log(provider.id)
        console.log(result)

        if (result) {
            res.status(200).json({
                message: "a single provider",
                data: result,
            })
        }
    } catch (error) {
        next(error)
    }
})

// edit
router.put('/provider/edit', auth, async (req, res, next) => {

    try {

        const data = req.body;

        const isDataUpdated = await editProviderById(data.id, data)

        if (isDataUpdated) {
            res.status(201).json({
                message: `${data.name} successfully updated`
            })
        }

    } catch (error) {
        console.log(error)
    }
})

// edit provider status
router.patch('/provider/status/edit', auth, async (req, res, next) => {

    try {

        const data = req.body;

        const isDataUpdated = await editProviderActivationState(data.id, data)

        if (isDataUpdated) {
            res.status(201).json({
                message: `${data.name} activation status updated successfully`
            })
        }

    } catch (error) {
        console.log(error)
        next(error)
    }

})

// --- FOR NHIA PROVIDERS ---

// create NHIA provider
router.post('/provider/nhia/create', auth, async (req, res, next) => {

    try {

        const data = req.body

        let result = await createNHIAProviderService(data)

        if (!result) {
            throw new Exception("encountered an issue while creating provider", 400)
        }

        res.status(200).json({
            message: "provider created successfully",
            data: result.id
        })
    } catch (error) {
        console.log(error.status)
        next(error)

    }
});

// get NHIA provider by HCP ID
router.post('/provider/nhia/get', auth, async (req, res, next) => {

    try {
        const data = req.body

        if (data.hcpId.length === 0) {
            throw new Exception("Hcp Id is an empty string", 400)
        }

        let result = await getNHIAProviderByHCPIDService(data.hcpId)

        if (result) {
            res.status(200).json({
                message: "result returned successfully",
                data: result,
            })
        }
    } catch (error) {
        next(error)
    }
})

// Create Provider tariff
router.post('/provider/tariff/create', auth, async (req, res, next) => {

  try {

      const data = req.body

      let result = await CreateProviderTariffService(data)
      if (result == 'provider tariff already exists!'){
        throw new Exception("provider tariff already exists!", 422)
      }

      if (!result) {
          throw new Exception("encountered an issue while creating provide Servie tariff", 400)
      }

      res.status(200).json({
          message: "Tariff created successfully",
          // data: result.id
      })
  } catch (error) {
      console.log(error.status)
      next(error)

  }
});
router.get('/provider/tariff/get/:id', async (req, res, next) => {

    try {
      const {id} =req.params
        let result = await getProviderTariffByIdService(id)
        let tariff_count=  parseInt(result.count[0].count)
         if (!result) {
                    throw new Exception("encountered an issue", 400)
          }

        if (result) {
            res.status(200).json({
                message: "List of all tariffs under this provider",
                data:result.result,
                count:tariff_count
            })
        }

    } catch (error) {
        console.log(error)
        next(error)
    }

});
router.get('/provider/tariff/getall', async (req, res, next) => {

  try {

      let result = await getAllProviderTariffService()
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }

      if (result) {
          res.status(200).json({
              message: "List of all tariffs",
              data:result
          })
      }

  } catch (error) {
      console.log(error)
      next(error)
  }

});
//This is to get single PROVIDER TARIFF'S by tariff ID
router.get('/provider/tariff/:id', async (req, res, next) => {

  try {
    const {id} =req.params
      let result = await getSingleProviderTariffByIdService(id)
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }

      if (result) {
          res.status(200).json({
              message: `successfully gotten ${result[0].item_name}`,
              data:result[0]
          })
      }

  } catch (error) {
      console.log(error)
      next(error)
  }

});



router.post('/preauthorization/create', auth, async (req, res, next) => {

  try {

      const data = req.body

      let result = await CreatePreAuthorizationService(data)

      if (!result) {
          throw new Exception("encountered an issue while creating pre authoriation", 400)
      }

      res.status(200).json({
          message: "Pre Authorization created successfully",
      })
  } catch (error) {
      console.log(error.status)
      next(error)

  }
});

router.get('/preauthorization/getall', async (req, res, next) => {

  try {

      let result = await getAllPreAuthorizationService()
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }

      if (result) {
          res.status(200).json({
              message: "List of all preauthorization requests",
              data:result
          })
      }

  } catch (error) {
      console.log(error)
      next(error)
  }

});

router.get('/preauthorization/get/byprovider/:id', async (req, res, next) => {

  try {
    const {id} =req.params
      let result = await getPreAuthorizationByProviderIdService(id)
      let tariff_count=  parseInt(result.count[0].count)
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }

      if (result) {
          res.status(200).json({
              message: "List of all PreAuthorization requests under this provider",
              data:result,
              // count:tariff_count
          })
      }

  } catch (error) {
      console.log(error)
      next(error)
  }

});
router.get('/preauthorization/:id', async (req, res, next) => {

  try {
    const {id} =req.params
      let result = await getSinglePreAuthorizationByIdService(id)
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }
        const date = new Date(result[0].created_at);
        const formattedDate = date.toLocaleDateString();
        result[0].created_at = formattedDate;

      if (result) {
          res.status(200).json({
              message: `successfully gotten PA Request`,
              data:result[0]
          })
      }

  } catch (error) {
      console.log(error)
      next(error)
  }

});

router.put('/preauthorization/update/:id', auth, async (req, res, next) => {

  try {
      const {id} =req.params;
      const data = req.body;

      let result = await updatePreAuthorizationByIdService(id,data)

      if (!result) {
          throw new Exception("encountered an issue while updating pre authoriation", 400)
      }

      res.status(200).json({
          message: "Pre Authorization updated successfully",
      })
  } catch (error) {
      console.log(error.status)
      next(error)

  }
});

router.get('/preauthorization/get/pa/code/:PA_code', async (req, res, next) => {

  try {
    const {PA_code} =req.params
      let result = await getPATariffAndDiagnosisByCodeService(PA_code)
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }


      if (result) {
          res.status(200).json({
              message: `successfully gotten PA Request`,
              data:{
                id:result.id,
                diagnosis:result.diagnosis,
                selected_tariffs:result.selected_tariffs,
                approved_price:result.approved_price,
                requested_total_price:result.requested_total_price,
                created_at: result.created_at,
                created_by: result.created_by,
                enrollee: {
                          id: result.enrollee_id,
                          name: result.enrollee_name,
                        },

                 provider: {
                          id: result.provider_id,
                          name: result.provider_name,
                          code: result.provider_code,
                        },

              }
          })
      }

  } catch (error) {
      console.log(error)
      next(error)
  }

});

export default router;
