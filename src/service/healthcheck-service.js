import {
    getCountOfAllUsersModel,
} from "../model/healthcheck-model.js";

export async function getHealthCheckService() {

    return await getCountOfAllUsersModel()

};