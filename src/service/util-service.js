import { createOTP, getOTP } from "../model/user-model.js"
import { email } from "../util/email.js";
import Exception from "../util/exception.js"


export async function createOTP(data){
    try {
        return await createOTP(data)
    } catch (error) {
        if(!data){
            throw new UtilServiceExpection("No ", 400)
        }
    }
}
export class UtilServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}