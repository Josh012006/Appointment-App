import { NextRequest} from 'next/server';

import { MongooseError } from 'mongoose';

import connectDB from '@/server/config/db';
import appointmentModel from '@/server/models/appointmentModel';
import patientModel from '@/server/models/users/patModel';




export async function POST(req: NextRequest) {
    try {
        const {id, appointment} = await req.json();

        await connectDB();

        const newAppoint = await new appointmentModel(appointment);
        const result = await newAppoint.save();

        const existingPat = await patientModel.findById(id);


        
        if (!existingPat) {
            return Response.json({message: 'Patient not found!'}, {status: 404});
        }

        // Ajouter l'ID du rendez-vous à la liste des rendez-vous du patient
        existingPat.appointments.push(result._id);

        // Enregistrer les modifications
        const updatedPat = await existingPat.save();

        if(!updatedPat) {
            return Response.json({message: 'Sauvegarde dans addAppointment a échoué!'}, {status: 500});
        }
        else {
            return Response.json(updatedPat, {status: 200});
        }

    } catch (error) {
        if(error instanceof MongooseError) {
            if (error.name === 'ValidationError') {
            return Response.json({message: 'Validation error in addAppointment! ' + error.message}, {status: 500});
            } else {
                return Response.json({message: 'Database error in addAppointment! ' + error.message}, {status: 500});
            }
        }

        return Response.json({message: 'An error while adding appointment! ' + error}, {status: 500});
    }
}