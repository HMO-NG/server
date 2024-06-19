import { createProviderModel, getAllProviderModel, getProviderByIdModel } from "../model/provider-model.js";
import { NigerianState } from "../util/nigerian-states.js";
import { generateUniqueProviderCode } from "../util/provider-code.js";


export async function createProvider(data) {

    // TODO validate data
    try {

        const result = NigerianState.find(state => state.label === data.state);

        const providerCode = await generateUniqueProviderCode(result.value, 5)

        data.code = providerCode

        return await createProviderModel(data)

    } catch (error) {
        console.log(error)

        return error
    }



}

export async function getAllProvider(data) {
    try {
        return await getAllProviderModel(data)
    } catch (error) {
        return error
    }
}

export async function getProviderById(id) {
    try {
        return await getProviderByIdModel(id)
    } catch (error) {
        return error
    }
}