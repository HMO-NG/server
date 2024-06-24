import {
    createProviderModel,
    getAllProviderModel,
    getProviderByIdModel,
    editProviderByIdModel,
    editProviderActivationStateModel
} from "../model/provider-model.js";
import { NigerianState } from "../util/nigerian-states.js";
import { generateUniqueProviderCode } from "../util/provider-code.js";
import Exception from "../util/exception.js"


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

export async function editProviderById(id, data) {

        if (!data) {
            throw new ProviderServiceExpection("provider details to update empty", 400)
        }

        const result = await editProviderByIdModel(id, data)

        if (!result) {
            throw new ProviderServiceExpection("provider details update failed", 500)
        }

        return result
}

export async function editProviderActivationState(id, activateState){
    if(!id){
        throw new ProviderServiceExpection("Provider Id needed", 400)
    }
    // if(!activateState){
    //     throw new ProviderServiceExpection("Provider activation stated required", 400)
    // }

    const result = await editProviderActivationStateModel(id, activateState)

    if(!result){
        throw new ProviderServiceExpection("updating provider activation status failed", 500)
    }

    return result;
}

export class ProviderServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}