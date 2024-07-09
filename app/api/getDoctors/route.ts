import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import connectDB from '@/server/config/db';
import doctorModel from '@/server/models/users/medModel';


export async function GET (req: NextRequest, res: NextApiResponse) {
    try {
        await connectDB();

        const response = await doctorModel.find({type: 'med'});

        if(response === null) {
            return Response.json({message: 'Un problème interne est intervenu.'}, {status: 500});
        }
        else if(response.length === 0) {
            return Response.json(response, {status: 404});
        }
        else {
            return Response.json(response, {status: 200});
        }
    } catch (error) {
        console.error(error);
        return Response.json({message: 'Problem with getDoctors! '+ error}, {status: 500});
    }
}