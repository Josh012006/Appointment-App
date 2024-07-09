import { NextRequest} from 'next/server';

import connectDB from '@/server/config/db';


import patientModel from '@/server/models/users/patModel';
import secretaryModel from '@/server/models/users/secModel';
import doctorModel from '@/server/models/users/medModel';



export async function POST(req: NextRequest) {
    try {
        const {type, fields} = await req.json();

        await connectDB();

        let result = null;

        if(type === "pat") {
            result = await patientModel.findOne({ ...fields, type });
        }
        else if(type === "sec") {
            result = await secretaryModel.findOne({ ...fields, type });
        }
        else if(type === "med") {
            result = await doctorModel.findOne({ ...fields, type });
        }

        if(result === null) {
            return Response.json({message: 'User not found!'}, {status: 404});
        }
        else {
            return Response.json(result, {status: 200});
        }

    } catch(error) {
        console.error(error);
        return Response.json({message: 'Problem with findUser! '+ error}, {status: 500});
    }
}