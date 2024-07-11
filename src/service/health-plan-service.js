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
    createAttachedBenefitModel

} from "../model/health-plan-model.js";
import Exception from "../util/exception.js";
import { generateUniqueHealthPlanCategoryCode } from "../util/generate-healthplan-code.js";

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

export async function getSingleHealthPlanCategory(id) {

    if (!id) {
        throw new HealthPlanServiceExpection("id can not be empty", 403)
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

class HealthPlanServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}