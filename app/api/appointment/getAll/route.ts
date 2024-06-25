import appointmentModel from "@/server/models/appointmentModel";
import patientModel from "@/server/models/users/patModel";
import { NextRequest } from "next/server";




export async function POST (req: NextRequest) {
    try {
        const {id} = await req.json();

        const user = await patientModel.findById(id);

        if(!user) {
            return Response.json({message: 'User not found!'}, {status: 404});
        }
        else {
            const myAppointments = await appointmentModel.find({_id: {$in: user.appointments}});
            
            return Response.json(myAppointments, {status: 200})
        }

    } catch (error) {
        return Response.json({message: 'Problem with getAll Appointments! '+ error}, {status: 500});
    }
}