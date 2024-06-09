import { createProviderModel } from "../model/provider-model.js";


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