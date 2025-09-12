import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import {
    createNhisServiceTarrif,
    getAndSearchNhisTarrifService,
    createNhiaDrugTarrif,
    getAndSearchDrugTarrifService,
    createNhiaClaimService,
    getNhiaClaimService,
    getNhiaClaimByIDService,
    updateNhiaClaimService,
} from '../service/nhis-service.js';
import Exception from '../util/exception.js';
import multer from 'multer';
import ExcelJS from "exceljs";
import { Readable } from "stream"

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() });

// create health plan
router.post('/nhis/service/tarrif/create', auth, async (req, res, next) => {

    try {

        const data = req.body

        let result = await createNhisServiceTarrif(data)

        if (!result) {
            throw new Exception("encountered an issue while creating nhis service", 400)
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

router.post('/nhis/services/search/get', auth, async (req, res, next) => {

    try {

        const data = req.body

        let response = await getAndSearchNhisTarrifService(data)

        if (!response) {
            throw new Exception("encountered an issue while get or searching nhis service", 400)
        }

        res.status(200).json({
            message: `response returned successfully`,
            data: response.result,
            total: response.total
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.post('/nhis/drug/tarrif/create', auth, async (req, res, next) => {
    try {

        const data = req.body

        let result = await createNhiaDrugTarrif(data)

        if (!result) {
            throw new Exception("encountered an issue while creating nhis service", 400)
        }

        res.status(200).json({
            message: `${data.name_of_drug} created successfully`,
            code: data.code
        })
    } catch (error) {
        console.log(error)
        next(error)

    }
});

router.post('/nhis/drug/tarrif/search', auth, async (req, res, next) => {

    try {

        const data = req.body

        let response = await getAndSearchDrugTarrifService(data)

        if (!response) {
            throw new Exception("encountered an issue while get or searching nhis service", 400)
        }

        res.status(200).json({
            message: `response returned successfully`,
            data: response.result,
            total: response.total
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.post('/nhis/service/tarrif/upload/:created_by',upload.single('file'), auth, async (req, res, next) => {

    try {

        const data = req.body
        const file = req.file;
        const {created_by}=req.params;
        let isHeader = true;
        let result

        function getCellValue(cell) {
             if (!cell) return null;

             if (typeof cell === "object" && cell.richText) {
               return cell.richText.map(rt => rt.text).join(""); // combine all fragments
             }

             return String(cell).trim();
        }

        if (!file) {
                    throw new Exception("No file uploaded", 400);
         }


         const stream = new Readable();
         stream.push(file.buffer);
         stream.push(null);


        const workbook = new ExcelJS.stream.xlsx.WorkbookReader(stream);
              for await (const worksheet of workbook) {
                for await (const row of worksheet) {
                   if (!row || !row.values || row.values.length === 0) continue;

                  const rowData = row.values.slice(1);
                   // ExcelJS rows start at index 1, so row.values[0] is usually null
                  console.log(row.values);
                  if (isHeader) {
                    console.log("Headers:", rowData);
                    isHeader = false; // skip headers next iteration
                    continue;
                  }
                   console.log("Row Data:", rowData);
                       const nhisData = {
                          nhia_code: getCellValue(rowData[0]),
                          description: getCellValue(rowData[1]),
                          dosage_form: getCellValue(rowData[2]),
                          strength: getCellValue(rowData[3]),
                          presentation: getCellValue(rowData[4]),
                          price: rowData[5] != null ? parseFloat(rowData[5]) : null,
                          plan_type: getCellValue(rowData[6]),
                          user_id:created_by,
                      };


                   console.log("Mapped Row:", nhisData);

                  result=await createNhisServiceTarrif(nhisData)
                }
              }

        if (!result) {
            throw new Exception("encountered an issue while creating nhis service", 400)
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

router.post('/nhis/claim/create', auth, async (req, res, next) => {

    try {

        const data = req.body

        let response = await createNhiaClaimService(data)

        if (!response) {
            throw new Exception("encountered an issue while creating nhis claim, check the input", 400)
        }

        res.status(200).json({
            message: `nhia claim created successfully`,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get('/nhis/claim/getall', async (req, res, next) => {

  try {

      let result = await getNhiaClaimService()
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }

      if (result) {
          res.status(200).json({
              message: "Successfully feched Claims",
              data : result.result,
              total: parseInt(result.count[0].count)
       }
      )}

  } catch (error) {
      console.log(error)
      next(error)
  }

});

router.get('/nhis/claim/:id', async (req, res, next) => {

  try {
      const {id} = req.params;

      let result = await getNhiaClaimByIDService(id)
       if (!result) {
                  throw new Exception("encountered an issue", 400)
        }

      if (result) {
          res.status(200).json({
              message: "Successfully feched Claim",
              data : result,
       }
      )}

  } catch (error) {
      console.log(error)
      next(error)
  }

});

router.patch('/nhis/claim/:id', auth, async (req, res, next) => {
  try{
    const {id}=req.params;
    const data = req.body;

    const response = await updateNhiaClaimService(id, data);
    if (!response) {
                  throw new Exception("encountered an issue", 400)
        }
    if (response) {
          res.status(200).json({
              message: "Successfully updated Claims",
    }
)}

  }catch (error) {
      console.log(error)
      res.status(500).json({
              message: "Something went wrong while updating claim",
     })
      next(error)
  }
});


export default router;
