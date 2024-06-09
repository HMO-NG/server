import { createProviderModel } from "../model/provider-model.js";


export async function createProvider(req, res, next) {



    // TODO get user id
    // TODO validate data
    try {
        const data = req.body;

        return await createProviderModel(data)

    } catch (error) {
        console.log(error)
        return error
    }



}