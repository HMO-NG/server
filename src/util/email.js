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

export async function email(mainBody) {


    const info = await transport.sendMail({
        from: '"Client Registration" <noreply@hcihealthcare.ng>',
        to: 'abdulkadri.osumah@hcihealthcare.ng, ikechukwu.wami@hcihealthcare.ng, wamiikechukwu@gmail.com',
        subject: 'A new client registered',
        html: `<div>${mainBody}</div>`,
    });

    console.log("Message sent: %s", info.messageId);
}