import { config as env } from 'dotenv'
import nodemailer from 'nodemailer';
env({ path: '../../.env' })


const transport = nodemailer.createTransport({
    host: "smtp.zeptomail.com",
    port: 587,
    auth: {
        user: process.env.ZEPTOMAIL_USERNAME,
        pass: process.env.ZEPTOMAIL_PASSWORD
    }
});

export async function email(clientDetails, senderDetails) {


    const info = await transport.sendMail({
        from: '"Client Registration" <noreply@hcihealthcare.ng>',
        to: 'ikechukwu.wami@hcihealthcare.ng, wamiikechukwu@gmail.com',
        subject: 'A new client registered',
        html: `<div>${clientDetails}</div>`,
    });

    console.log("Message sent: %s", info.messageId);
}

// transport.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Successfully sent');
// });