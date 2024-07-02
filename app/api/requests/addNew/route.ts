import { NextRequest} from 'next/server';

import { MongooseError } from 'mongoose';

import connectDB from '@/server/config/db';


import requestModel from '@/server/models/requestModel';
import patientModel from '@/server/models/users/patModel';




export async function POST(req: NextRequest) {
    try {
        const request = await req.json();

        await connectDB();

        const newRequest = await new requestModel(request);
        const result = await newRequest.save();

        const existingPat = await patientModel.findById(request.patientInfo.patientID);


        
        if (!existingPat) {
            return Response.json({message: 'Patient not found!'}, {status: 404});
        }

        // Ajouter l'ID de la requête à la liste des requêtes du patient
        existingPat.requests.push(result._id);

        // Enregistrer les modifications
        const updatedPat = await existingPat.save();

        if(!updatedPat) {
            return Response.json({message: 'Sauvegarde dans addRequest a échoué!'}, {status: 500});
        }
        else {
            return Response.json(updatedPat, {status: 200});
        }

    } catch (error) {
        if(error instanceof MongooseError) {
            if (error.name === 'ValidationError') {
            return Response.json({message: 'Validation error in addRequest! ' + error.message}, {status: 500});
            } else {
                return Response.json({message: 'Database error in addRequest! ' + error.message}, {status: 500});
            }
        }

        return Response.json({message: 'An error while adding request! ' + error}, {status: 500});
    }
}