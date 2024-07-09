import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';






export async function POST(req: NextRequest) {
    try {
        const {mail, subject, content} = await req.json();

        // Defining mail variables
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: mail,
            subject: subject,
            text: `
Ce message vous a été envoyé par Health Appointment.

${content}
            `
        };

        await transporter.sendMail(mailOptions);
        return Response.json({message: 'Email sent!'}, {status: 200});

    } catch (error) {
        console.log(error);
        return Response.json({ message: 'An error occured while sending mail!' }, { status: 500 });
    }
}