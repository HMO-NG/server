import { createFormDetails } from "../model/form-model.js";
import Exception from "../util/exception.js";

export async function createFormService(data) {

    if (!data) {
        throw new FormsExpection("forms details can not be empty", 403)
    }

    return await createFormDetails(data)

};


class FormsExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}