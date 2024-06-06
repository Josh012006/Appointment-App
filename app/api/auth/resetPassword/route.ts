import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

import pool from '@/server/config/db';
import axios from 'axios';




export async function UPDATE(req: NextRequest, res: NextApiResponse) {

    try {
        // Récupération du type et du mail;
        const {type, mail} = await req.json();
        console.log({type, mail});

        const connection = await pool.getConnection();
        console.log("Connected to the database!");

        const response = await axios.post('/api/auth/findUser', JSON.stringify({type, mail}));
        if(response.status === 500) {
            throw Error('Une erreur interne est survenue avec findUser!');
        }
        else if (response.status === 404) {
            res.status(404).json('Not found!');
        }
        else if (response.status === 200) {
            // Générer un nouveau mot de passe
            const generatedPassword = "";

            // Update le mot de passe avec une route update user

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
            return res.status(200).json('Email sent successfully.');
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}