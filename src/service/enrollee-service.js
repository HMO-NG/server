import {
    getAllAndSearchNhisEnrolleeModel,
    createNhisEnrolleeModel,
    bindUserToNhiaEnrolleeModel,
    getNhiaEnrolleeAndUserDetailsModel
} from "../model/enrollee-model.js";
import Exception from "../util/exception.js";

export async function createNhisEnrolleeService(data) {

    if (!data) {
        throw new EnrolleeExpection("NHIA enrollee details can not be empty", 403)
    }

    return await createNhisEnrolleeModel(data)

};

export async function getAndSearchNhisEnrolleeService(data) {

    if (!data) {
        throw new EnrolleeExpection("NHIS service details can not be empty", 400)
    }

    return await getAllAndSearchNhisEnrolleeModel(data)

};

export async function bindUserToNhiaEnrolleeService(data) {

    if (!data) {
        throw new EnrolleeExpection("NHIS service details can not be empty", 400)
    }

    return await bindUserToNhiaEnrolleeModel(data)

};

export async function getNhiaEnrolleeAndUserDetailsService(data) {

    if (!data) {
        throw new EnrolleeExpection("basic user information missing, kindly re-login", 400)
    }

    return await getNhiaEnrolleeAndUserDetailsModel(data)

};


class EnrolleeExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}