import { getUserByReferralCode } from "../model/user-model.js";


function generateReferralCode(length) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
async function isReferralCodeUnique(referralCode) {
    const data = await getUserByReferralCode(referralCode);
    if (!data.length) {
        return true;
    }
    else {
        return false;
    }
}
export async function generateUniqueReferralCode(length) {
    const result = await isReferralCodeUnique(generateReferralCode(length));
    if (!result) {
        generateUniqueReferralCode(length);
    }
    return generateReferralCode(length);
}
