export function OTPEmailTemplate(data) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your One-Time Password (OTP)</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #f7f7f7;">
        <!-- Header -->
        <tr>
            <td style="padding: 20px; background-color: #1a73e8; text-align: center;">
                <h1 style="color: #ffffff; margin: 0;">${data.companyname}</h1>
            </td>
        </tr>

        <!-- Content -->
        <tr>
            <td style="padding: 30px 20px;">
                <h2 style="color: #2d3748; margin-top: 0;">Your One-Time Password</h2>
                <p style="color: #4a5568;">Hello [User Name],</p>
                <p style="color: #4a5568;">Your OTP for authentication is:</p>

                <!-- OTP Display -->
                <div style="background-color: #ffffff; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #1a73e8;">
                ${data.otp}
                </div>

                <!-- Important Note -->
                <div style="background-color: #fff3cd; padding: 15px; border-radius: 6px; margin: 20px 0;">
                    <p style="color: #856404; margin: 0;">⚠️ This OTP will expire in 15 minutes. Do not share this code with anyone.</p>
                </div>

                <!-- Additional Information -->
                <p style="color: #4a5568;">If you didn't request this OTP, please immediately contact our support team or ignore this email.</p>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="padding: 20px; background-color: #ffffff; text-align: center; font-size: 12px; color: #718096;">
                <p style="margin: 0;">©${getFullYear()} ${data.companyname}. All rights reserved.</p>
                <p style="margin: 10px 0 0 0;">
                    <a href="[Unsubscribe Link]" style="color: #718096; text-decoration: none;">Unsubscribe</a> |
                    <a href="[Privacy Policy Link]" style="color: #718096; text-decoration: none;">Privacy Policy</a> |
                    <a href="[Contact Us Link]" style="color: #718096; text-decoration: none;">Contact Us</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`}