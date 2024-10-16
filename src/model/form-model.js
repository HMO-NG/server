import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import config from '../knexfile.js'
let db = knex(config[process.env.NODE_ENV || 'development']);

// create the principal and dependent form details
export async function createFormDetails(data) {

    const createPrincipalFormDetails = {
        id: uuidv4(),
        principal_firstname: data.principal_firstname,
        principal_surname: data.principal_surname,
        principal_othername: data.principal_othername,
        principal_occupation: data.principal_occupation,
        principal_address: data.principal_address,
        principal_phone_number: data.principal_phone_number,
        principal_sex: data.principal_sex,
        principal_health_plan: data.principal_health_plan,
        principal_genotype: data.principal_genotype,
        principal_blood_group: data.principal_blood_group,
        principal_email: data.principal_email,
        principal_dob: data.principal_dob,
        principal_name_of_employer: data.principal_name_of_employer,
        principal_address_of_employer: data.principal_address_of_employer,
        principal_name_of_hospital: data.principal_name_of_hospital,
        principal_profile_pic: data.principal_profile_pic
    }

    const spouse = {
        id: createFormDetails.id,
        spouse_surname: '',
        spouse_othername: '',
        spouse_firstname: '',
        spouse_address: '',
        spouse_occupation: '',
        spouse_sex: '',
        spouse_phone_number: '',
        spouse_email: '',
        spouse_dob: '',
        spouse_genotype: '',
        spouse_blood_group: '',
    }

    const dependantOne = {
        id: createFormDetails.id,
        dependent_one_surname: '',
        dependent_one_othername: '',
        dependent_one_firstname: '',
        dependent_one_address: '',
        dependent_one_occupation: '',
        dependent_one_sex: '',
        dependent_one_phone_number: '',
        dependent_one_email: '',
        dependent_one_dob: '',
        dependent_one_genotype: '',
        dependent_one_blood_group: '',
        dependent_one_profile_pic: '',
    }

    const dependantTwo = {
        id: createFormDetails.id,
        dependent_two_surname: '',
        dependent_two_othername: '',
        dependent_two_firstname: '',
        dependent_two_address: '',
        dependent_two_occupation: '',
        dependent_two_sex: '',
        dependent_two_phone_number: '',
        dependent_two_email: '',
        dependent_two_dob: '',
        dependent_two_genotype: '',
        dependent_two_blood_group: '',
        dependent_two_profile_pic: '',
    }

    const dependantThree = {
        id: createFormDetails.id,
        dependent_three_surname: '',
        dependent_three_othername: '',
        dependent_three_firstname: '',
        dependent_three_address: '',
        dependent_three_occupation: '',
        dependent_three_sex: '',
        dependent_three_phone_number: '',
        dependent_three_email: '',
        dependent_three_dob: '',
        dependent_three_genotype: '',
        dependent_three_blood_group: '',
        dependent_three_profile_pic: '',
    }

    const dependantFour = {
        id: createFormDetails.id,
        dependent_four_surname: '',
        dependent_four_othername: '',
        dependent_four_firstname: '',
        dependent_four_address: '',
        dependent_four_occupation: '',
        dependent_four_sex: '',
        dependent_four_phone_number: '',
        dependent_four_email: '',
        dependent_four_dob: '',
        dependent_four_genotype: '',
        dependent_four_blood_group: '',
        dependent_four_profile_pic: ''
    }

    const array = [spouse, dependantOne, dependantTwo, dependantThree, dependantFour];

    db("principal_enrollment_form_details").insert(createPrincipalFormDetails).then();



    return await db("principal_enrollment_form_details").insert(createPrincipalFormDetails);
}