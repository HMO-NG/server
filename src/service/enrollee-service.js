import {
    getAllAndSearchNhisEnrolleeModel,
    createNhisEnrolleeModel,
    bindUserToNhiaEnrolleeModel,
    getNhiaEnrolleeAndUserDetailsModel,
    createFailedNhisEnrolleeUploadModel,
} from "../model/enrollee-model.js";
import Exception from "../util/exception.js";

export async function createNhisEnrolleeService(data) {

    if (!data) {
        throw new EnrolleeExpection("NHIA enrollee details can not be empty", 400)
    }


    const result = await createNhisEnrolleeModel(data)
    if (result == 'NHIA Enrollee Already Exists !'){
            throw new EnrolleeExpection('NHIA Enrollee Already Exists !', 409)
    }else{
      return result
    }

};

export async function uploadNhisEnrolleeService(data) {

    if (!data) {
        throw new EnrolleeExpection("NHIA enrollee details can not be empty", 400)
    }


    const result = await createNhisEnrolleeModel(data)
    if (result == 'NHIA Enrollee Already Exists !'){
      createFailedNhisEnrolleeUploadModel({...data,reason_for_failure:'already exists'})
    }
    else if (result == 'invalid date !'){
      createFailedNhisEnrolleeUploadModel({...data,reason_for_failure:'invalid date'})
    }else if (result == 'error'){
      createFailedNhisEnrolleeUploadModel({...data,reason_for_failure:'error inserting to db'})
      console.log('error occured while inserting data to db')
    }else if (result == 'success'){
      return result
    }

};

export async function getAndSearchNhisEnrolleeService(data) {

    if (!data) {
        throw new EnrolleeExpection("NHIS service details can not be empty", 400)
    }

    return await getAllAndSearchNhisEnrolleeModel(data)

};

export async function bindUserToNhiaEnrolleeService(data) {

    // if user id is already in the linked_user table - that means user has already linked.

    if (!data) {
        throw new EnrolleeExpection("NHIS service details can not be empty", 400)
    }

    return await bindUserToNhiaEnrolleeModel(data)

};

export async function getNhiaEnrolleeAndUserDetailsService(data) {

    if (!data) {
        throw new EnrolleeExpection("basic user information missing, kindly re-login", 400)
    }

    return await getNhiaEnrolleeAndUserDetailsModel(data)

};


class EnrolleeExpection extends Exception {
    constructor(message, status) {
        super(message, status)
    }
}
