import {
    createBandModel,
    updateBandByIdModel,
    getBandByIdModel,
    getAllBandsdModel,

}from "../model/band-model.js";
import Exception from "../util/exception.js";

export async function createBandService(data) {
    if (!data) {
        throw new HealthPlanServiceExpection("band data can not be empty", 400)
    }

    return await createBandModel(data)
}
export async function updateBandByIdService(id, data) {
    if (!id) {
        throw new HealthPlanServiceExpection("band ID can not be empty", 404)
    }
    if (!data) {
        throw new HealthPlanServiceExpection("band data to be updated can not be empty", 404)
    }
    return await updateBandByIdModel(id, data)
}
export async function getBandByIdService(id) {
  try{
   if (!id) {
        throw new HealthPlanServiceExpection("band ID can not be empty", 404)
    }
    return await getBandByIdModel(id)
  } catch (error) {
    console.error(error)
  }
}
export async function getAllBandsService() {
   try{
     return await getAllBandsdModel()
  } catch (error) {
    console.error(error)
  }

}


class HealthPlanServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}
