import { getHealthPlanCodeModel } from "../model/health-plan-model.js";

export function generateRandomNum(length) {
    const digit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    let randomNum = '';

    for (let i = 0; i < length; i++) {
        randomNum += Math.floor(Math.random() * digit.length).toString()
    }

    return randomNum
}

async function doesHealthPlanCodeExist(code) {
    const data = await getHealthPlanCodeModel(code);

    if (data.length > 0) {
        return true
    } else {
        return false
    }
}

export async function generateUniqueHealthPlanCode(length) {
    const isOtpUnique = await doesHealthPlanCodeExist(generateRandomNum(length))

    if (isOtpUnique) {
        return generateUniqueOtp(length)
    }

    return generateRandomNum(length)
}