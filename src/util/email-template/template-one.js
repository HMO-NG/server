export function TemplateOne(data) {
    return `
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        ${data.firstname ? `
            <h1 style="color: #2c3e50; text-align: center; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Client Registration</h1>

            <h2 style="color: #2980b9; margin-top: 20px;">${data.firstname} has registered, see the registration details below.</h2>
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">

        <div style="width: 48%;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                <tr style="background-color: #3498db; color: white;">
                    <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Items</th>
                    <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Values</th>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Firstname</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.firstname}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Surname</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.surname}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Othername</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.othername}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Occupation</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.occupation}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Address</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.address}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Phone Number</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.principal_phone_number}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Sex</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.sex}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Health Plan</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.principal_health_plan}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Genotype</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.principal_genotype}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Blood Group</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.principal_blood_group}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Email</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Date of Birth</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.dob}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 8px; border: 1px solid #ddd;">Name of Employe</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.name_of_employer}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Address of Employer</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.address_of_employer}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Primary Hospital</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.name_of_hospital}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Principal Profile Pic.</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${data.principal_profile_pic}</td>
                </tr>
            </table>
        </div>
        ` : ''
        }
                ${data.number_of_dependent >= 1 ?
           ` <div style="width: 48%;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                    <tr style="background-color: #3498db; color: white;">
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Items</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Values</th>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse Surname</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_surname}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse Othername</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_othername}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse Firstname</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_firstname}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse Address</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_address}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse Occupation</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_occupation}</td>v
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse sex</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_sex}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse Phone Number</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_phone_number}</td>v
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse Email</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_email}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse Date of Birth</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_dob}</td>v
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse Genotype</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_genotype}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse Blood Group</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_blood_group}</td>v
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Spouse Profile Pic.</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.spouse_profile_pic}</td>
                    </tr>
                </table>
            </div>
            ` : ''
        }

            </div >


            <div style="display: flex; justify-content: space-between;">
            ${data.number_of_dependent >= 2 ?
            `<div style="width: 48%;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #3498db; color: white;">
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Items</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Values</th>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Surname</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_surname}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Othername</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_othername}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Firstname</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_firstname}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Address</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_address}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Occupation</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_occupation}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Occupation</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_occupation}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Sex</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_sex}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Phone Number</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_phone_number}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Email</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_email}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Dob</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_dob}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Genotype</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_genotype}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Blood Group</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_blood_group}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent One Profile Pic</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_one_profile_pic}</td>
                    </tr>
                </table>
            </div>
            ` : ''
        }
            ${data.number_of_dependent >= 3 ?
           ` <div style="width: 48%;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #3498db; color: white;">
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Items</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Values</th>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Surname</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_surname}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Othername</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_othername}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Firstname</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_firstname}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Address</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_address}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Occupation</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_occupation}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Occupation</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_occupation}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Sex</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_sex}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Phone Number</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_phone_number}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Email</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_email}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Dob</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_dob}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Genotype</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_genotype}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Blood Group</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_blood_group}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Two Profile Pic</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Two_profile_pic}</td>
                    </tr>
                </table>
            </div>
           ` : ''
        }
            </div>

        <div style="display: flex; justify-content: space-between;">
        ${data.number_of_dependent >= 4 ?
           ` <div style="width: 48%;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #3498db; color: white;">
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Items</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Values</th>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Surname</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_surname}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Othername</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_othername}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Firstname</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_firstname}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Address</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_address}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Occupation</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_occupation}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Occupation</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_occupation}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Sex</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_sex}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Phone Number</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_phone_number}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Email</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_email}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Dob</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_dob}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Genotype</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_genotype}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Blood Group</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_blood_group}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Three Profile Pic</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Three_profile_pic}</td>
                    </tr>
                </table>
            </div>
           ` : ''
        }
        ${data.number_of_dependent >= 5 ?
            `<div style="width: 48%;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #3498db; color: white;">
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Items</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Values</th>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Surname</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_surname}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Othername</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_othername}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Firstname</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_firstname}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Address</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_address}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Occupation</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_occupation}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Occupation</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_occupation}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Sex</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_sex}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Phone Number</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_phone_number}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Email</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_email}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Dob</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_dob}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Genotype</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_genotype}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Blood Group</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_blood_group}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 8px; border: 1px solid #ddd;">Dependent Four Profile Pic</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${data.dependent_Four_profile_pic}</td>
                    </tr>
                </table>
            </div> ` : ''
        }
        </div>
        </div>

        </body >


    `;
}