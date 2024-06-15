import { getProviderByQuery } from "../model/provider-model.js";

async function generateProviderCode(state,length) {
    const digit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    let randomNum = '';

    for (let i = 0; i < length; i++) {
        randomNum += Math.floor(Math.random() * digit.length).toString()
    }

    return `${state}/${randomNum}`
}

async function doesProviderCodeExist(providerCode) {

    // the query to search and the column name
    const data = await getProviderByQuery("code", providerCode);

    if (data.length > 0) {
        return true
    } else {
        return false
    }
}

export async function generateUniqueProviderCode(state, length) {
    const isProviderCodeUnique = await doesProviderCodeExist(generateProviderCode(state, length))

    if (isProviderCodeUnique) {
        return generateUniqueProviderCode(length)
    }

    console.log(`this is the unique provider code ${isProviderCodeUnique}`)

    return generateProviderCode(state,length)
}

