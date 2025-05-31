import {
  CreatePrivateClaimModel,
  getAllPrivateClaimsModel,
  getPrivateClaimsByIdModel,
  updateClaimByIdModel
} from "../model/private-claims-model.js";

import Exception from "../util/exception.js"

export async function CreatePrivateClaimService(data) {

  if (!data) {
      throw new PrivateClaimServiceExpection("Claim is empty", 400)
  }

  const result = await CreatePrivateClaimModel(data)

  if (!result) {
      throw new PrivateClaimServiceExpection("failed to create Claim", 500)
  }

  return result
}

export async function getAllPrivateClaimsService() {

  return await getAllPrivateClaimsModel()
}

export async function getPrivateClaimsByIdService(id) {

  return await getPrivateClaimsByIdModel(id)
}

export async function updateClaimByIdService(id,data) {

  if (!data) {
      throw new PrivateClaimServiceExpection("Claim is empty", 400)
  }

  const result = await updateClaimByIdModel(id,data)

  if (!result) {
      throw new PrivateClaimServiceExpection("failed to update Claim", 500)
  }

  return result
}

export class PrivateClaimServiceExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}
