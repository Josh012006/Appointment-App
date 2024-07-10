import connectDB from "@/server/config/db";
import appointmentModel from "@/server/models/appointmentModel";

import { NextRequest } from "next/server";





export async function GET(req: NextRequest, {params} : {params: {id: string}}) {
    try {
        const { id } = params;

        await connectDB();

        const search = await appointmentModel.findById(id).select('ID start').exec();

        if(!search) {
            return Response.json({error: 'Appointment not found!'}, {status: 404});
        }
        else {
            return Response.json(search, {status: 200});
        }

    } catch (error) {
        console.error(error);
        return Response.json({error: 'An error occurred while getting appoint Infos!'}, {status: 500})
    }
}