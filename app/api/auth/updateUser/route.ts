import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import connectDB from '@/server/config/db';

import mongoose from 'mongoose';

const patientModel = mongoose.model('patient');
const secretaryModel = mongoose.model('secretary');
const doctorModel = mongoose.model('doctor');


export async function PATCH(req: NextRequest, res: NextApiResponse) {
    try {
        const { id, type, newInfos } = await req.json();

        await connectDB();
        console.log("Connected to the database!");

        let result;

        if(type === "pat") {
            result = await patientModel.findByIdAndUpdate(id, {...newInfos}, { new: true });
        }
        else if(type === "sec") {
            result = await secretaryModel.findByIdAndUpdate(id, {...newInfos}, { new: true });
        }
        else if(type === "med") {
            result = await doctorModel.findByIdAndUpdate(id, {...newInfos}, { new: true });
        }

        if(result === null) {
            return Response.json({message: 'User not found!'}, {status: 404});
        }
        else {
            return Response.json(JSON.stringify(result), {status: 200});
        }

    } catch(error) {
        return Response.json({message: 'Problem with updateUser'+ error}, {status: 500});
    }
}