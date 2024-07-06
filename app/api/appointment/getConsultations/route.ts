import connectDB from "@/server/config/db";
import appointmentModel from "@/server/models/appointmentModel";
import { NextRequest } from "next/server";





export async function POST (req: NextRequest) {
    try {
        const { id } = await req.json();

        await connectDB();

        const appointments = await appointmentModel.find({medID: id});

        if(!appointments) {
            return Response.json({message: 'No appointments found!'}, {status: 404});
        }
        else {
            return Response.json(appointments, {status: 200})
        }

    } catch (error) {
        console.log(error);
        return Response.json({message: 'Problem with getConsultations! '+ error}, {status: 500});
    }
}