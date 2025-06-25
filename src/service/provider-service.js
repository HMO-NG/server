import {
    createProviderModel,
    getAllProviderModel,
    getProviderByIdModel,
    editProviderByIdModel,
    editProviderActivationStateModel,
    createNHIAProviderModel,
    getAllNhisProviderModel,
    CreateProviderTariffModel,
    getProviderTariffByIdModel,
    getAllProviderTariffModel,
    getSingleProviderTariffByIdModel,
    CreatePreAuthorizationModel,
    getAllPreAuthorizationModel,
    getPreAuthorizationByProviderIdModel,
    getSinglePreAuthorizationByIdModel,
    updatePreAuthorizationByIdModel,
    UpdateProviderTariffModel,
    getPATariffAndDiagnosisByCodeModel,
    updatePreAuthorizationByPACodeModel,
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

export async function editProviderActivationState(id, activateState) {
    if (!id) {
        throw new ProviderServiceExpection("Provider Id needed", 400)
    }
    // if(!activateState){
    //     throw new ProviderServiceExpection("Provider activation stated required", 400)
    // }

    const result = await editProviderActivationStateModel(id, activateState)

    if (!result) {
        throw new ProviderServiceExpection("updating provider activation status failed", 500)
    }

    return result;
}

// ---FOR NHIA PROVIDERS
export async function createNHIAProviderService(data) {
    if (!data) {
        throw ProviderServiceExpection("NHIA data can not be empty", 400)
    }

    return await createNHIAProviderModel(data)
}

export async function getNHIAProviderByHCPIDService(id) {

        return await getAllNhisProviderModel(id)
}

export async function CreateProviderTariffService(data) {

  if (!data) {
      throw new ProviderServiceExpection("provider service tariff is empty", 400)
  }

  const result = await CreateProviderTariffModel(data)

  if (!result) {
      throw new ProviderServiceExpection("failed to create tariff", 500)
  }

  return result
}
export async function getProviderTariffByIdService(id) {

  return await getProviderTariffByIdModel(id)
}
export async function getAllProviderTariffService() {

  return await getAllProviderTariffModel()
}
export async function getSingleProviderTariffByIdService(id) {

  return await getSingleProviderTariffByIdModel(id)
}

export async function UpdateProviderTariffService(id,data) {

  if (!data) {
      throw new ProviderServiceExpection("provider service tariff is empty", 400)
  }

  const result = await UpdateProviderTariffModel(id,data)

  if (!result) {
      throw new ProviderServiceExpection("failed to create tariff", 500)
  }

  return result
}

export async function CreatePreAuthorizationService(data) {

  if (!data) {
      throw new ProviderServiceExpection("PA is empty", 400)
  }

  const result = await CreatePreAuthorizationModel(data)

  if (!result) {
      throw new ProviderServiceExpection("failed to create PA", 500)
  }

  return result
}

export async function getAllPreAuthorizationService() {

  return await getAllPreAuthorizationModel()
}
export async function getPreAuthorizationByProviderIdService(id) {

  return await getPreAuthorizationByProviderIdModel(id)
}
export async function getSinglePreAuthorizationByIdService(id) {

  return await getSinglePreAuthorizationByIdModel(id)
}
export async function updatePreAuthorizationByIdService(id, data) {
  return await updatePreAuthorizationByIdModel(id,data)
}

export async function getPATariffAndDiagnosisByCodeService(PA_code) {

  return await getPATariffAndDiagnosisByCodeModel(PA_code)
}

export async function updatePreAuthorizationByPACodeService(PA_code, data) {
  return await updatePreAuthorizationByPACodeModel(PA_code,data)
}

export class ProviderServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}
