import connectDB from "@/server/config/db";
import requestModel from "@/server/models/requestModel";
import { NextRequest } from "next/server";






export async function GET(req:NextRequest, {params}: {params:{id: string}}) {
    try {
        
        const {id} = params;
        
        await connectDB();

        const request = await requestModel.findOne({appointID: id});

        if(!request) {
            return Response.json({message: 'Request not found'}, {status: 404});
        }
        else {
            return Response.json(request, {status: 200});
        }

    } catch (error) {
        console.log(error);
        return Response.json({message: 'An error occurred while getting Request By AppointID'}, {status: 500});
    }
}