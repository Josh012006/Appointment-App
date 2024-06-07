import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import connectDB from '@/server/config/db';


import patientModel from '@/server/models/users/patModel';
import secretaryModel from '@/server/models/users/secModel';
import doctorModel from '@/server/models/users/medModel';


export async function PATCH(req: NextRequest, res: NextApiResponse) {
    try {
        const { id, type, newInfos } = await req.json();

        await connectDB();

        let result;

        if(type === "pat") {
            result = await patientModel.findByIdAndUpdate(id, {...newInfos}, { new: true });
        }
        else if(type === "sec") {
            console.log(id);
            result = await secretaryModel.findByIdAndUpdate(id, {...newInfos}, { new: true });
        }
        else if(type === "med") {
            result = await doctorModel.findByIdAndUpdate(id, {...newInfos}, { new: true });
        }

        if(result === null) {
            return Response.json({message: 'User not found!'}, {status: 404});
        }
        else {
            return Response.json(result, {status: 200});
        }

    } catch(error) {
        return Response.json({message: 'Problem with updateUser! '+ error}, {status: 500});
    }
}