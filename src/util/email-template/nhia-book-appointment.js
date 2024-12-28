export default function NhiaBookAppointment(data, appointmentInfo) {
    return ` <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px;">
    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); max-width: 600px; margin: auto;">
        <div style="text-align: center; font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 20px;">
            NHIA Appointment and Complaint Details
        </div>
        <div style="font-size: 16px; color: #555555; line-height: 1.6;">
            <p style="margin: 8px 0;"><strong>Policy ID:</strong> ${data.policy_id}</p>
            <p style="margin: 8px 0;"><strong>Relationship:</strong> ${data.relationship}</p>
            <p style="margin: 8px 0;"><strong>Surname:</strong> ${data.surname}</p>
            <p style="margin: 8px 0;"><strong>Other Name:</strong> ${data.other_name}</p>
            <p style="margin: 8px 0;"><strong>Date of Birth:</strong> ${data.dob}</p>
            <p style="margin: 8px 0;"><strong>Sex:</strong> ${data.sex}</p>
            <p style="margin: 8px 0;"><strong>Company ID:</strong> ${data.company_id}</p>
            <p style="margin: 8px 0;"><strong>Provider ID:</strong> ${data.provider_id}</p>
            <p style="margin: 8px 0;"><strong>Provider Name:</strong> ${data.provider_name}</p>
            <p style="margin: 8px 0;"><strong>User Email:</strong> ${data.email}</p>
            <p style="margin: 8px 0;"><strong>User Phone Number:</strong> ${data.phone_number}</p>
            <p style="margin: 8px 0;"><strong>User Address:</strong> ${data.address}</p>
            <p style="margin: 8px 0;"><strong>Employer Name:</strong> ${data.employer_name}</p>
            <p style="margin: 8px 0;"><strong>User Complaint:</strong> ${appointmentInfo.user_complain}</p>
            <p style="margin: 8px 0;"><strong>User Selected Appointment Date:</strong> ${appointmentInfo.date_of_appointment}</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #999999;">
            &copy; 2024 HCI Healthcare LTD. All rights reserved.
        </div>
    </div>
</body>`
}