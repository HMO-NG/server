import Exception from "../util/exception.js";
import {
  createPrivateCompanyModel,
  getAllPrivateCompany,changePrivateCompanyStatusModel,updateClientModel,
} from '../model/private-company-model.js';
import {
getPrivateEnrolleeByIdModel
} from '../model/private-enrollees-model.js';

export async function createPrivateCompanyService(data) {

    if (!data) {
        throw new PrivateExpection("Company details cannot be empty", 400)
    }

    return await createPrivateCompanyModel(data)

};
export async function getAllPrivateCompanyService() {

try{
  return await getAllPrivateCompany()
}catch{error}{
  return error
}


};

export async function changePrivateCompanyStatusService(data,id) {

  try{
    return await changePrivateCompanyStatusModel(data,id)
  }catch{error}{
    return error
  }


  };
  export async function updateClientService(data,id) {

    try{
      return await updateClientModel(data,id)
    }catch{error}{
      return error
    }


    };
  updateClientModel

class PrivateExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}
