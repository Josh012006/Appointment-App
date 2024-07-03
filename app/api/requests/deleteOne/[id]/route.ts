import connectDB from "@/server/config/db";
import requestModel from "@/server/models/requestModel";

import { NextRequest } from "next/server";





export async function DELETE(req: NextRequest, {params} : {params: {id: string}}) {
    try {
        const { id } = params;

        await connectDB();

        const deletion = await requestModel.findByIdAndDelete(id);

        if(!deletion) {
            return Response.json({error: 'Request not found!'}, {status: 404});
        }
        else {
            return Response.json({message: 'Request deleted successfully!'}, {status: 200});
        }

    } catch (error) {
        console.error(error);
        return Response.json({error: 'An error occured while deleting the request!'}, {status: 500})
    }
}