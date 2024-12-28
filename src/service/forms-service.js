import { createFormDetails } from "../model/form-model.js";
import {email} from "../util/email.js";
import Exception from "../util/exception.js";
import { TemplateOne } from "../util/email-template/template-one.js";

export async function createFormService(data) {

    if (!data) {
        throw new FormsExpection("forms details can not be empty", 400)
    }

    email(TemplateOne(data))

    return await createFormDetails(data)


};


class FormsExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}