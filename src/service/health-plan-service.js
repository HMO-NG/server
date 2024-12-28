import {
    createHealthPlanCategoryModel,
    getAndSearchBenefitListModel,
    createBenefitModel,
    getAllHealthPlanCategoryModel,
    getAndSearchHealthPlanCategoryModel,
    createHealthPlanModel,
    getAndSearchHealthPlan,
    getSingleHealthCategoryModelById,
    getAllBenefitListModel,
    createAttachedBenefitModel,
    getAttachBenefitByHealthPlanIdModel,
    updateAttachBenefitModel,
    deleteAttachBenefitModel

} from "../model/health-plan-model.js";
import Exception from "../util/exception.js";
import { generateUniqueHealthPlanCategoryCode } from "../util/generate-healthplan-code.js";

export async function createHealthPlanCategoryService(data) {

    if (!data) {
        throw new HealthPlanServiceExpection("data body can not be empty", 400)
    }

    // generate code
    const code = await generateUniqueHealthPlanCategoryCode(5)

    const removeWhiteSpaceFromBandName = data.band.replace(/\s+/g, '')

    data.health_plan_code = `${removeWhiteSpaceFromBandName}/${code}`;



    return await createHealthPlanCategoryModel(data)

}

export async function createHealthPlanService(data) {

    if (!data) {
        throw new HealthPlanServiceExpection("data body can not be empty", 400)
    }

    return await createHealthPlanModel(data)

}

export async function getHealthPlanCategoryService() {

    return await getAllHealthPlanCategoryModel()

}

export async function createBenefitService(data) {
    if (!data) {
        throw new HealthPlanServiceExpection("data body can not be empty", 400)
    }

    return await createBenefitModel(data)
}

export async function getAndSearchBenefitListService(data) {

    if (!data) {
        throw new HealthPlanServiceExpection("benefit list can not be empty", 400)
    }

    return await getAndSearchBenefitListModel(data)

}

export async function getAndSearchHealthPlanCategoryService(data) {

    if (!data) {
        throw new HealthPlanServiceExpection("plan category can not be empty", 400)
    }

    return await getAndSearchHealthPlanCategoryModel(data)

}

export async function getAndSearchHealthPlanService(data) {

    if (!data) {
        throw new HealthPlanServiceExpection("health plan can not be empty", 400)
    }

    return await getAndSearchHealthPlan(data)

}

export async function getSingleHealthPlanCategory(id) {

    if (!id) {
        throw new HealthPlanServiceExpection("id can not be empty", 400)
    }

    return await getSingleHealthCategoryModelById(id)
}
export async function getAllBenefitList() {

    return await getAllBenefitListModel()
}

export async function createAttachedBenefitService(data, userId, healthPlanId, healthPlanName) {

    const extractData = data.benefit_limit;

    const newDetails = extractData.map((item) => {
        return {
            benefit_name: item.benefit_name,
            limit_type: item.limit_type,
            limit_value: item.limit_value,
            benefit_item_id: item.benefit_id,
            health_plan_id: healthPlanId,
            created_by: userId,
            health_plan_name: healthPlanName,

        }
    })

    const createdAttachedBenefitList = await Promise.all(newDetails.map((data) => createAttachedBenefitModel(data)))

    return createdAttachedBenefitList
}

export async function getAttachedBenefitByHealthPlanIdService(id){

    // console.log("id", id)
    if (!id) {
        throw new HealthPlanServiceExpection("health plan ID can not be empty", 404)
    }

    return getAttachBenefitByHealthPlanIdModel(id)
}

export async function updateAttachedBenefitService(id, data){

    if (!id) {
        throw new HealthPlanServiceExpection("health plan ID can not be empty", 404)
    }

    if (!data) {
        throw new HealthPlanServiceExpection("health plan data to be updated can not be empty", 404)
    }

    return updateAttachBenefitModel(id, data)
}

export async function deleteAttachedBenefitService(id){
    return deleteAttachBenefitModel(id)
}

class HealthPlanServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}