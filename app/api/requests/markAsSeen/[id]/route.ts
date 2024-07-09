import connectDB from "@/server/config/db";
import requestModel from "@/server/models/requestModel";

import { NextRequest } from "next/server";





export async function PATCH(req: NextRequest, {params} : {params: {id: string}}) {
    try {
        const { id } = params;

        await connectDB();

        const update = await requestModel.findByIdAndUpdate(id, {status: 'En étude'}, {new: true});

        if(!update) {
            return Response.json({error: 'Request not found!'}, {status: 404});
        }
        else {
            return Response.json({message: 'Successfully updated'}, {status: 200});
        }

    } catch (error) {
        console.error(error);
        return Response.json({error: 'An error occurred while marking request as seen!'}, {status: 500})
    }
}