import { NextRequest } from 'next/server';

import connectDB from '@/server/config/db';

import nodemailer from 'nodemailer';
import axios from 'axios';
import generator from 'generate-password';
import { hashPassword } from '@/server/utils/hashPassword';




export async function PATCH(req: NextRequest) {

    try {
        // Récupération du type et du mail;
        const {type, mail} = await req.json();
        console.log({type, mail});

        await connectDB();


        // Je vérifie que l'utilisateur existe vraiment
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/findUser`, JSON.stringify({type, fields: { mail }}), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

        console.log(response.data);

        if(response.status === 500) {
            return Response.json({message: 'Une erreur interne est survenue avec findUser!' + response.data}, {status: 500});
        }
        else if (response.status === 404) {
            return Response.json({message: 'User not found!'}, {status: 404});
        }
        else if (response.status === 200) {
            // Générer un nouveau mot de passe
            
            const generatedPassword = generator.generate({
                length: 8,
                numbers: true,
                symbols: true,
                uppercase: true,
                lowercase: true,
                strict: true
            });

            console.log(generatedPassword);

            const hashedPassword = await hashPassword(generatedPassword);

            // Update le mot de passe avec la route updateUser
            const result = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/updateUser`, JSON.stringify({id: response.data._id, type, newInfos: {password: hashedPassword}}), {
                validateStatus: (status: number): boolean => { return status >= 200 }
            });

            if(result.status === 500) {
                return Response.json({message: 'Une erreur interne est survenue avec updateUser!' + result.data}, {status: 500});
            }
            else if(result.status === 404) {
                return Response.json({message: 'User not found!'}, {status: 404});
            }
            else if(result.status === 200) {

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
                    subject: 'Votre nouveau mot de passe',
                    text: `
Ce message vous a été envoyé par Health Appointment.

Voici votre nouveau mot de passe: ${generatedPassword}.  Utilisez-le pour vous connecter et n'oubliez pas de le changer 
lorsque vous accéderai à votre profil.
                    `
                };
        
                await transporter.sendMail(mailOptions);
                return Response.json({message: 'Email sent!'}, {status: 200});
            }
        }

    } catch (error) {
        console.log(error);
        return Response.json({message: error}, {status: 500});
    }
}