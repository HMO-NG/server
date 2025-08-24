import {
    createNhisServiceTarrifModel,
    getAllAndSearchNhisTarrifModel,
    getAllAndSearchNhisDrugModel,
    createNhisDrugTarrifModel,
    createNhiaClaimModel,
    getNhiaClaimModel,
    getNhiaClaimByIDModel,
    updateNhiaClaimModel,
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
export async function getNhiaClaimService() {
  try{
    return getNhiaClaimModel()
  } catch (error) {
    console.error(error);
    throw new Exception("Error fetching NHIA claims", 500);
  }
}

export async function updateNhiaClaimService(id, data) {
  try{
    if (!id || !data) {
      throw new NHISServiceExpection("NHIS claim ID and data can not be empty", 400);
    }

    return await updateNhiaClaimModel(id, data);

  }catch (error) {
    console.error(error);
    throw new Exception("Error updating NHIA claims", 500);
  }
}

export async function getNhiaClaimByIDService(id) {
  try{
    if (!id) {
      throw new NHISServiceExpection("NHIS claim ID can not be empty", 400);
    }

    return await getNhiaClaimByIDModel(id);

  }catch (error) {
    console.error(error);
    throw new Exception("Error fetching NHIA claims", 500);
  }
}

class NHISServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}
