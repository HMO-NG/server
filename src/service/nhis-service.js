import {
    createNhisServiceTarrifModel,
    getAllAndSearchNhisTarrifModel
} from "../model//nhis-service-model.js";
import Exception from "../util/exception.js";

export async function createNhisServiceTarrif(data) {

    if (!data) {
        throw new NHISServiceExpection("NHIS service details can not be empty", 403)
    }

    return await createNhisServiceTarrifModel(data)

};
export async function getAndSearchNhisTarrifService (data){

    if (!data) {
        throw new NHISServiceExpection("NHIS service details can not be empty", 400)
    }

    return await getAllAndSearchNhisTarrifModel(data)

};

class NHISServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}