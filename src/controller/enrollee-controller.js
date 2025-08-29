import express, { json } from 'express'
import { auth } from '../middleware/auth-middleware.js';
import {
    createNhisEnrolleeService,
    getAndSearchNhisEnrolleeService,
    bindUserToNhiaEnrolleeService,
    getNhiaEnrolleeAndUserDetailsService,
    uploadNhisEnrolleeService,
} from '../service/enrollee-service.js';
import Exception from '../util/exception.js';
import multer from 'multer';
import ExcelJS from "exceljs";
import { Readable } from "stream"

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() });

router.post('/nhia/enrollee/create', auth, async (req, res, next) => {
    try {

        const data = req.body

        let result = await createNhisEnrolleeService(data)

        if (!result) {
            throw new Exception("encountered an issue while creating nhis enrollee", 400)
        }

        res.status(200).json({
            message: `${data.other_names} created successfully`,
            code: data.policy_id
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.post('/nhis/enrollee/upload',upload.single('file'), auth, async (req, res, next) => {

    try {

        const data = req.body
        const file = req.file;
        let isHeader = true;
        let result
        
        //To handle rich text cells and extract plain text
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
                       const enrollee = {
                          provider_id: getCellValue(rowData[0]),
                          provider_name: getCellValue(rowData[1]),
                          surname: getCellValue(rowData[2]),
                          other_names: getCellValue(rowData[3]),
                          relationship: getCellValue(rowData[4]),
                          policy_id: getCellValue(rowData[5]),
                          sex: getCellValue(rowData[6]),
                          dob: getCellValue(rowData[7]),
                          company_id: rowData[8],
                          provider_Address: getCellValue(rowData[9]),
                          user_id: getCellValue(rowData[10]),
                          linked_to_user: getCellValue(rowData[11]),
                      };


                   console.log("Mapped Row:", enrollee);

                  result=await uploadNhisEnrolleeService(enrollee)
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

router.post('/nhis/enrollee/search', auth, async (req, res, next) => {

    try {

        const data = req.body

        let response = await getAndSearchNhisEnrolleeService(data)

        if (!response) {
            throw new Exception("encountered an issue while getting or searching nhis enrollee", 400)
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

router.post('/nhis/enrollee/bind', auth, async (req, res, next) => {

    try {

        const data = req.body

        if (!data.id || !data.dob || !data.userid || data.id.length === 0 || data.dob.length === 0 || data.userid.length === 0) {
            /* 400 Bad Request indicates that the server understood the request,
            but there's a problem with the client-provided data.
            This perfectly aligns with the situation where the id or dob fields
            in the request body (req.body) are empty. */
            throw new Exception("NHIA ID or date of birth or user id is empty", 400)
        }

        let response = await bindUserToNhiaEnrolleeService(data)

        if(response.length === 0){
            throw new Exception("No NHIA enrollee found with that ID or Date of Birth, contact support@hcihealthcare.ng", 400)
        }

        res.status(200).json({
            message: `response returned successfully`,
            data: response,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.post('/nhis/enrollee/get', auth, async (req, res, next) => {

    try {

        const data = req.body

        if ( !data.userid || data.userid.length === 0) {
            /* 400 Bad Request indicates that the server understood the request,
            but there's a problem with the client-provided data.
            This perfectly aligns with the situation where the id or dob fields
            in the request body (req.body) are empty. */
            throw new Exception("user id is empty", 400)
        }

        let response = await getNhiaEnrolleeAndUserDetailsService(data)

        if(response.length === 0){
            throw new Exception('You need to link your NHIA Policy ID, to update your information, if you are facing any challenge, send us an email via clientexperience@hcihealthcare.ng', 400)
        }

        res.status(200).json({
            message: `response returned successfully`,
            data: response,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
});

export default router;
