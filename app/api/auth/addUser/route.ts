import { NextRequest} from 'next/server';

import { MongooseError } from 'mongoose';

import connectDB from '@/server/config/db';


import patientModel from '@/server/models/users/patModel';
import secretaryModel from '@/server/models/users/secModel';
import doctorModel from '@/server/models/users/medModel';

import axios from 'axios';



export async function POST(req: NextRequest) {
    try {
        const {type, ...rest} = await req.json();
        const user = {type, ...rest};
        console.log(user);

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

            const addingToHospital = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/addDoctorToHospital`, JSON.stringify({ hospitalName: result.hospital , doctorID: result._id }), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

            if(addingToHospital.status !== 200) {
                return Response.json({message: 'Error while adding doctor to hospital!'}, {status: 500});
            }
        }


        return Response.json(result, {status: 200});

    } catch(error) {
        console.error(error);
        if(error instanceof MongooseError) {
            if (error.name === 'ValidationError') {
            return Response.json({message: 'Validation error in addUser! ' + error.message}, {status: 500});
            } else {
                return Response.json({message: 'Database error in addUser! ' + error.message}, {status: 500});
            }
        }

        return Response.json({message: 'An error while adding user! ' + error}, {status: 500});
    }
}