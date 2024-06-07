import { NextRequest} from 'next/server';

import { MongooseError } from 'mongoose';

import connectDB from '@/server/config/db';


import patientModel from '@/server/models/users/patModel';
import secretaryModel from '@/server/models/users/secModel';
import doctorModel from '@/server/models/users/medModel';



export async function POST(req: NextRequest) {
    try {
        const {type, ...rest} = await req.json();
        const user = {type, ...rest};
        console.log({type, ...rest});

        await connectDB();

        let result = null;

        if(type === "pat") {
            const newUser = await new patientModel(user);
            result = await newUser.save();
        }
        else if(type === "sec") {
            const newUser = await new secretaryModel(user);
            result = await newUser.save();
        }
        else if(type === "med") {
            const newUser = await new doctorModel(user);
            result = await newUser.save();
        }


        return Response.json(JSON.stringify(result), {status: 200});

    } catch(error) {
        if(error instanceof MongooseError) {
            if (error.name === 'ValidationError') {
            return Response.json({message: 'Validation error in addUser! '+ error.message}, {status: 500});
            } else {
                return Response.json({message: 'Database error in addUser! '+ error.message}, {status: 500});
            }
        }
    }
}