import {
    createNhisServiceTarrifModel,
    getAllAndSearchNhisTarrifModel,
    getAllAndSearchNhisDrugModel,
    createNhisDrugTarrifModel,
    createNhiaClaimModel
} from "../model//nhis-service-model.js";
import Exception from "../util/exception.js";

export async function createNhisServiceTarrif(data) {

    if (!data) {
        throw new NHISServiceExpection("NHIS service details can not be empty", 400)
    }

    return await createNhisServiceTarrifModel(data)

};

export async function getAndSearchNhisTarrifService(data) {

    if (!data) {
        throw new NHISServiceExpection("NHIS service details can not be empty", 400)
    }

    return await getAllAndSearchNhisTarrifModel(data)

};

export async function createNhiaDrugTarrif(data) {
    if (!data) {
        throw new NHISServiceExpection("NHIS service details can not be empty", 400)
    }

    return await createNhisDrugTarrifModel(data)
}

export async function getAndSearchDrugTarrifService(data) {

    if (!data) {
        throw new NHISServiceExpection("NHIS service details can not be empty", 400)
    }

    return await getAllAndSearchNhisDrugModel(data)

};

// --- NHIA drug
export async function createNhiaClaimService(data){

    if (!data) {
        throw new NHISServiceExpection("NHIS claim input can not be empty", 400)
    }

    return createNhiaClaimModel(data)
}

class NHISServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}