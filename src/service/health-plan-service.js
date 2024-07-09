import {
    createHealthPlanCategoryModel,
    getAndSearchBenefitListModel,
    createBenefitModel,
    getAllHealthPlanCategoryModel,
    getAndSearchHealthPlanCategoryModel,
    createHealthPlanModel,
    getAndSearchHealthPlan,
    getSingleHealthCategoryModelById,
    getAllBenefitListModel

} from "../model/health-plan-model.js";
import Exception from "../util/exception.js";
import {generateUniqueHealthPlanCategoryCode} from "../util/generate-healthplan-code.js";

export async function createHealthPlanCategoryService(data) {

    if (!data) {
        throw new HealthPlanServiceExpection("data body can not be empty", 403)
    }

    // generate code
    const code = await generateUniqueHealthPlanCategoryCode(5)

    const removeWhiteSpaceFromBandName = data.band.replace(/\s+/g, '')

    data.health_plan_code = `${removeWhiteSpaceFromBandName}/${code}`;



    return await createHealthPlanCategoryModel(data)

}

export async function createHealthPlanService(data) {

    if (!data) {
        throw new HealthPlanServiceExpection("data body can not be empty", 403)
    }

    return await createHealthPlanModel(data)

}

export async function getHealthPlanCategoryService() {

    return await getAllHealthPlanCategoryModel()

}

export async function createBenefitService(data) {
    if (!data) {
        throw new HealthPlanServiceExpection("data body can not be empty", 403)
    }

    return await createBenefitModel(data)
}

export async function getAndSearchBenefitListService(data) {

    if (!data) {
        throw new HealthPlanServiceExpection("benefit list can not be empty", 403)
    }

    return await getAndSearchBenefitListModel(data)

}

export async function getAndSearchHealthPlanCategoryService(data) {

    if (!data) {
        throw new HealthPlanServiceExpection("plan category can not be empty", 403)
    }

    return await getAndSearchHealthPlanCategoryModel(data)

}

export async function getAndSearchHealthPlanService(data) {

    if (!data) {
        throw new HealthPlanServiceExpection("health plan can not be empty", 403)
    }

    return await getAndSearchHealthPlan(data)

}

export async function getSingleHealthPlanCategory(id){

    if (!id) {
        throw new HealthPlanServiceExpection("id can not be empty", 403)
    }

    return await getSingleHealthCategoryModelById(id)
}
export async function getAllBenefitList(){

    return await getAllBenefitListModel()
}

class HealthPlanServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}