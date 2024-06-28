import {
    createNhisServiceModel,
    getAllAndSearchNhisProcedureModel
} from "../model//nhis-service-model.js";
import Exception from "../util/exception.js";

export async function createNhisService(data) {

    if (!data) {
        throw new NHISServiceExpection("NHIS service details can not be empty", 403)
    }

    return await createNhisServiceModel(data)

};
export async function getAndSearchNhisService (data){

    if (!data) {
        throw new NHISServiceExpection("NHIS service details can not be empty", 403)
    }

    return await getAllAndSearchNhisProcedureModel(data)

};

class NHISServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}