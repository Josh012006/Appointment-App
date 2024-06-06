import { NextRequest} from 'next/server';

import connectDB from '@/server/config/db';
import mongoose from 'mongoose';

const patientModel = mongoose.model('patient');
const secretaryModel = mongoose.model('secretary');
const doctorModel = mongoose.model('doctor');



export async function POST(req: NextRequest) {
    try {
        const {type, fields} = await req.json();
        console.log({type, fields});

        await connectDB();
        console.log("Connected to the database!");

        let result;

        if(type === "pat") {
            result = await patientModel.findOne({ ...fields });
        }
        else if(type === "sec") {
            result = await secretaryModel.findOne({ ...fields });
        }
        else if(type === "med") {
            result = await doctorModel.findOne({ ...fields });
        }

        if(result === null) {
            return Response.json({message: 'User not found!'}, {status: 404});
        }
        else {
            return Response.json(JSON.stringify(result), {status: 200});
        }

    } catch(error) {
        return Response.json({message: 'Problem with findUser'+ error}, {status: 500});
    }
}