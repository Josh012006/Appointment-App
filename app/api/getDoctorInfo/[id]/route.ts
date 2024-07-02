import connectDB from "@/server/config/db";
import doctorModel from "@/server/models/users/medModel";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";





export async function GET (req: NextRequest, {params} : {params: {id: string}}) {
    try {

        const { id } = params;     

        await connectDB();

        const doctor = await doctorModel.findById(id);

        if(!doctor) {
            return Response.json({message: 'Aucun docteur trouvé!'}, {status: 404});
        }
        else {
            return Response.json(doctor, {status: 200});
        }
    } catch (error) {
        console.log(error);
        return Response.json({message: 'Une erreur interne est survenue au niveau du fetchDoctorInfo!'}, {status: 500});
    }
}