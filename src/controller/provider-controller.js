import express, { json } from 'express'
import {
    createProvider,
    editProviderActivationState,
    editProviderById,
    getAllProvider,
    getProviderById,
    createNHIAProviderService,
    getNHIAProviderByHCPIDService,
    CreateProviderTariffService,
    getProviderTariffByIdService,
    getAllProviderTariffService,
    getSingleProviderTariffByIdService,
    CreatePreAuthorizationService,
    getAllPreAuthorizationService,
    getPreAuthorizationByProviderIdService,
    getSinglePreAuthorizationByIdService,
    updatePreAuthorizationByIdService,
    getPATariffAndDiagnosisByCodeService,
    updatePreAuthorizationByPACodeService,
    ProviderTariffBulkUploadService,
} from '../service/provider-service.js';
import Exception from '../util/exception.js';
import { auth, verifyUserToken, verifyPermission } from '../middleware/auth-middleware.js';
import multer from 'multer';
import ExcelJS from "exceljs";
import { Readable } from "stream"

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() });

// TODO rate limiter
// TODO roles and permission

// create provider
router.post('/provider/create', auth, async (req, res, next) => {

    try {

        const data = req.body;

        let result = await createProvider(data)
        if (result == 'provider already exists!'){
          throw new Exception("provider already exists", 409)
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
              data : result.map(PA=> ({
                        id: PA.id,
                        diagnosis: PA.diagnosis,
                        selected_tariffs: PA.selected_tariffs,
                        approved_price: PA.approved_price,
                        requested_total_price: PA.requested_total_price,
                        provider_comment: PA.provider_comment,
                        pa_code: PA.pa_code,
                        status: PA.status,
                        is_claimed: PA.is_claimed,
                        created_at: PA.created_at,
                        created_by: PA.created_by,
                        enrollee: {
                          id: PA.enrollee_id,
                          name: PA.enrollee_name,
                          plan_name: PA.enrollee_plan_name,
                        },

                         provider: {
                          id: PA.provider_id,
                          name: PA.provider_name,
                          code: PA.provider_code,
                        },
              }))
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
        const date = new Date(result.created_at);
        const formattedDate = date.toLocaleDateString();
        result.created_at = formattedDate;

      if (result) {
          res.status(200).json({
              message: `successfully gotten PA Request`,
              data:{
                id:result.id,
                diagnosis:result.diagnosis,
                selected_tariffs:result.selected_tariffs,
                approved_price:result.approved_price,
                requested_total_price:result.requested_total_price,
                provider_comment: result.provider_comment,
                pa_code: result.pa_code,
                status: result.status,
                created_at: result.created_at,
                created_by: result.created_by,
                enrollee: {
                          id: result.enrollee_id,
                          name: result.enrollee_name,
                          plan_name: result.enrollee_plan_name,
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
                is_claimed: result.is_claimed,
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

//UPDATE PRE AUTHORIZATION BY PA CODE
router.put('/preauthorization/update/code/:PA_code', auth, async (req, res, next) => {

  try {
      const {PA_code} =req.params;
      const data = req.body;

      let result = await updatePreAuthorizationByPACodeService(PA_code,data)

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

router.put('/provider/tarriff/bulk/upload/:provider_id',upload.single('file'), auth, async (req, res, next) => {
    try {
        const {provider_id} = req.params;
        const file = req.file;
        let isHeader = true;
        let result

        if (!file) {
            throw new Exception("No file uploaded", 400);
        }

        //To handle rich text cells and extract plain text
        function getCellValue(cell) {
             if (!cell) return null;

             if (typeof cell === "object" && cell.richText) {
               return cell.richText.map(rt => rt.text).join(""); // combine all fragments
             }

             return String(cell).trim();
        }

      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);

      // Stream read with ExcelJS
      const workbook = new ExcelJS.stream.xlsx.WorkbookReader(stream);
      for await (const worksheet of workbook) {
        for await (const row of worksheet) {
          if (!row || !row.values || row.values.length === 0) continue;

          const rowData = row.values.slice(1);
                   // ExcelJS rows start at index 1, so row.values[0] is usually null
                  if (isHeader) {
                    console.log("Headers:", rowData);
                    isHeader = false; // skip headers next iteration
                    continue;
                  }

            const tariff = {
                     item_name: getCellValue(rowData[0]),
                     item_price: getCellValue(rowData[1]),
                     description: getCellValue(rowData[2]),
                     tariff_type: getCellValue(rowData[3]),
                     created_by: getCellValue(rowData[4]),
                     provider_id: provider_id,
            };

          result=await ProviderTariffBulkUploadService(tariff);
        }
      }


        res.status(200).json({
            message: "Provider tariffs uploaded successfully"
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default router;
