import { createProviderModel, getAllProviderModel } from "../model/provider-model.js";


export async function createProvider(data) {



    // TODO get user id
    // TODO validate data
    try {

        return await createProviderModel(data)

    } catch (error) {
        console.log(error)

        return error
    }



}

export async function getAllProvider() {
    try {
        return await getAllProviderModel()
    } catch (error) {
        return error
    }
}