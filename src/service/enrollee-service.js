import {
    getAllAndSearchNhisEnrolleeModel,
    createNhisEnrolleeModel
} from "../model//nhis-service-model.js";
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


class EnrolleeExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}