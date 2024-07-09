import connectDB from "@/server/config/db";
import requestModel from "@/server/models/requestModel";
import { NextApiResponse } from "next";

import { NextRequest } from "next/server";





export async function PATCH(req: NextRequest, res: NextApiResponse) {
    try {
        const { id, appointID } = await req.json();

        await connectDB();

        const update = await requestModel.findByIdAndUpdate(id, {appointID}, {new: true});

        if(!update) {
            return Response.json({error: 'Request not found!'}, {status: 404});
        }
        else {
            return Response.json({message: 'Successfully updated'}, {status: 200});
        }

    } catch (error) {
        console.error(error);
        return Response.json({error: 'An error occurred while adding appointID!'}, {status: 500})
    }
}