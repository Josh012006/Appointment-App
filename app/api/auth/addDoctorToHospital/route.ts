import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import connectDB from '@/server/config/db';
import hospitalModel from '@/server/models/hospitalModel';





export async function PATCH(req: NextRequest, res: NextApiResponse) {
    try {
        const { hospitalName, doctorID } = await req.json();

        await connectDB();

        // Vérifier si l'hôpital existe
        const existingHospital = await hospitalModel.findOne({ hospitalName });

        if (!existingHospital) {
            return Response.json({message: 'Hospital not found!'}, {status: 404});
        }

        // Ajouter l'ID du médecin à la liste des ID de médecins de l'hôpital
        existingHospital.doctorsID.push(doctorID);

        // Enregistrer les modifications
        const updatedHospital = await existingHospital.save();

        if(!updatedHospital) {
            return Response.json({message: 'Sauvegarde dans addDoctorToHospital a échoué!'}, {status: 500});
        }
        else {
            return Response.json(updatedHospital, {status: 200});
        }

    } catch(error) {
        return Response.json({message: 'Problem with addDoctorToHospital! '+ error}, {status: 500});
    }
}