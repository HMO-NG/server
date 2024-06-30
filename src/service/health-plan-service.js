import {
    createHealthPlanModel,
    getAndSearchBenefitListModel,
    createBenefitModel,
    getAllHealthPlanCategoryModel
} from "../model/health-plan-model.js";
import Exception from "../util/exception.js";
import { generateUniqueHealthPlanCode } from "../util/generate-healthplan-code.js";

export async function createHealthPlan(data) {

    if (!data) {
        throw new HealthPlanServiceExpection("data body can not be empty", 403)
    }

    // generate code
    const code = await generateUniqueHealthPlanCode(5)

    data.health_plan_code = `band/${data.band}/${code}`;

    return await createHealthPlanModel(data)

}
export async function getHealthPlanCategoryService() {

    return await getAllHealthPlanCategoryModel(data)

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

};

class HealthPlanServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}