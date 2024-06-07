import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import connectDB from '@/server/config/db';
import hospitalModel from '@/server/models/hospitalModel';


export async function GET (req: NextRequest, res: NextApiResponse) {
    try {
        await connectDB();

        const response = await hospitalModel.find({});

        if(response === null) {
            return Response.json({message: 'No hospital saved!'}, {status: 404});
        }
        else {
            return Response.json(response, {status: 200});
        }
    } catch (error) {
        return Response.json({message: 'Problem with getHospitals! '+ error}, {status: 500});
    }
}