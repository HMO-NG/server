import express, { json } from 'express'
import {
    createProvider, editProviderActivationState, editProviderById, getAllProvider, getProviderById,
    createNHIAProviderService,
    getNHIAProviderByHCPIDService,CreateProviderServiceTariffService,getProviderServiceTariffByIdService,
    getAllProviderServiceTariffService,getSingleProviderServiceTariffByIdService,CreateProviderDrugTariffService,
    getProviderDrugTariffByIdService,getAllProviderDrugTariffService,getSingleProviderDrugTariffByIdService,
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

// Create Provider Servie tariff
router.post('/provider/service/tariff/create', auth, async (req, res, next) => {

  try {

      const data = req.body

      let result = await CreateProviderServiceTariffService(data)
      if (result == 'provider service tariff already exists!'){
        throw new Exception("provider service tariff already exists!", 422)
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
router.get('/provider/service/tariff/get/:id', async (req, res, next) => {

    try {
      const {id} =req.params
        let result = await getProviderServiceTariffByIdService(id)
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
router.get('/provider/service/tariff/getall', async (req, res, next) => {

  try {

      let result = await getAllProviderServiceTariffService()
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }

      if (result) {
          res.status(200).json({
              message: "List of all service tariffs",
              data:result
          })
      }

  } catch (error) {
      console.log(error)
      next(error)
  }

});
//This is to get single PROVIDER SERVICE TARIFF'S by tariff ID
router.get('/provider/service/tariff/:id', async (req, res, next) => {

  try {
    const {id} =req.params
      let result = await getSingleProviderServiceTariffByIdService(id)
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

// Create Provider drug tariff
router.post('/provider/drug/tariff/create', auth, async (req, res, next) => {

  try {

      const data = req.body

      let result = await CreateProviderDrugTariffService(data)
      if (result == 'provider drug tariff already exists!'){
        throw new Exception("provider drug tariff already exists!", 422)
      }

      if (!result) {
          throw new Exception("encountered an issue while creating provide drug tariff", 400)
      }

      res.status(200).json({
          message: "Tariff created successfully",
      })
  } catch (error) {
      console.log(error.status)
      next(error)

  }
});

router.get('/provider/drug/tariff/get/:id', async (req, res, next) => {

  try {
    const {id} =req.params
      let result = await getProviderDrugTariffByIdService(id)
      let tariff_count=  parseInt(result.count[0].count)
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }

      if (result) {
          res.status(200).json({
              message: "List of all drug tariffs under this provider",
              data:result.result,
              count:tariff_count
          })
      }

  } catch (error) {
      console.log(error)
      next(error)
  }

});
router.get('/provider/drug/tariff/getall', async (req, res, next) => {

  try {

      let result = await getAllProviderDrugTariffService()
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }

      if (result) {
          res.status(200).json({
              message: "List of all drug tariffs",
              data:result
          })
      }

  } catch (error) {
      console.log(error)
      next(error)
  }

});

router.get('/provider/drug/tariff/:id', async (req, res, next) => {

  try {
    const {id} =req.params
      let result = await getSingleProviderDrugTariffByIdService(id)
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


export default router;
