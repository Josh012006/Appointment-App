import doctorModel from '@/server/models/medModel';

import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import connectDB from '@/server/config/db';



export async function POST (req: NextRequest, res: NextApiResponse) {
    try {

        const { id, hospital } = await req.json();

        await connectDB();

        const response = await doctorModel.findOne({ medID : id, hospital});

        if(response === null) {
            return Response.json({message: 'Doctor not found!'}, {status: 404});
        }
        else {
            return Response.json(response, {status: 200});
        }

    } catch(error) {
        return Response.json({message: 'Problem with verifymedID! '+ error}, {status: 500});
    }
}