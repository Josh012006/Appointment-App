import connectDB from "@/server/config/db";
import patientModel from "@/server/models/users/patModel";

import { NextRequest } from "next/server";





export async function DELETE(req: NextRequest) {
    try {
        
        const userId = await req.nextUrl.searchParams.get('userId');
        const requestId = await req.nextUrl.searchParams.get('requestId');

        await connectDB();

        const existingPat = await patientModel.findById(userId);


        
        if (!existingPat) {
            return Response.json({message: 'Patient not found!'}, {status: 404});
        }

        // Retirer l'ID de la requête de la liste des requêtes du patient
        existingPat.requests = existingPat.requests.filter((request: any) => request !== requestId);

        // Enregistrer les modifications
        const deletion = await existingPat.save();

        if(!deletion) {
            return Response.json({error: 'Request not found!'}, {status: 404});
        }
        else {
            return Response.json({message: 'Request deleted successfully from user tab!'}, {status: 200});
        }

    } catch (error) {
        console.error(error);
        return Response.json({error: 'An error occured while deleting the request from user tab!'}, {status: 500})
    }
}