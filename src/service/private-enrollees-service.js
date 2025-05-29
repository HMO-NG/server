import Exception from "../util/exception.js";
import {
getAllProviderNameAndIdModel,
createPrivateEnrolleeModel,getPrivateEnrolleeByIdModel,updatePrivateEnrolleeByIdAndCreateProfileModel,
createPrivateEnrolleeDependantsModel,getAllPrivateEnrolleeModel, getPrivateEnrolleeByClientIdModel,onboardSinglePrivateEnrolleeModel
} from '../model/private-enrollees-model.js';
import {
  createUser, getUserByEmail, getUserByPhoneNumber,
  updateUserDetails,
} from "../model/user-model.js"
import { generateUniqueReferralCode } from "../util/referral-code.js"
export async function createPrivateEnrolleeService(data,company_id,enrolled_by){
    if (!data) {
        throw new PrivateExpection("enrollee details cannot be empty", 400)
    }

    return await createPrivateEnrolleeModel(data,company_id,enrolled_by)
}
export async function getAllProviderForPrivatesService() {
try{
  return await getAllProviderNameAndIdModel()
}catch{error}{
  return error
}


};
export async function getPrivateEnrolleeByIdService(id) {
    try {
        if (!id) {
            throw new PrivateExpection("enrollee id cannot be empty", 400)
       }
       else{
        return await getPrivateEnrolleeByIdModel(id)
       }

  } catch (error) {
      return error
  }

}

export async function  updatePrivateEnrolleeByIdAndCreateProfileService(id,data,profile_id){
  try {
    return await  updatePrivateEnrolleeByIdAndCreateProfileModel(id,data,profile_id)
} catch (error) {
    return error
}
}
export async function createPrivateAccount(data, next) {

    try {

        // check if email/user already exist
        const doesUserHaveAnEmail = await getUserByEmail(data.email)

        if (doesUserHaveAnEmail.length) {
            // throw an exception
            throw new Exception('email address already in use', 409)
        }

        // check if phone number already exist.
        const doesPhoneNumberAlreadyExist = await getUserByPhoneNumber(data.phone_number)

        if (doesPhoneNumberAlreadyExist.length) {
            // throw an exception
            throw new Exception('Phone number already in use', 409)
        }

        //generate a unique referal code
        const referralCode = await generateUniqueReferralCode(5)

        const userCreationResult = await createUser(data, referralCode)

        // if user obj is empty, throw an error
        if (!userCreationResult) {
            throw new Exception('user not created', 400)
        }


        return userCreationResult;

    } catch (error) {
        next(error)
    }

}

export async function  createPrivateEnrolleeDependantsService(data,beneficiary_of,profile_id){
  try {
    return await  createPrivateEnrolleeDependantsModel(data,beneficiary_of,profile_id)
} catch (error) {
    return error
}
}
export async function getAllPrivateEnrolleeService(){
  try{
  return  await getAllPrivateEnrolleeModel()
  }catch(error){
    return error
  }
}
export async function getPrivateEnrolleeByClientIdService(id){
  try{
  return  await getPrivateEnrolleeByClientIdModel(id)
  }catch(error){
    return error
  }
}
export async function onboardSinglePrivateEnrolleeService(data,profile_id){
  try{
  return  await onboardSinglePrivateEnrolleeModel(data,profile_id)
  }catch(error){
    return error
  }
}

export class privateEnrolleeseExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}

