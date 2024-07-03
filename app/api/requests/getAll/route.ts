import connectDB from "@/server/config/db";
import requestModel from "@/server/models/requestModel";

import { NextApiResponse } from "next";
import { NextRequest } from "next/server";




export async function POST(req:NextRequest, res:NextApiResponse) {
    try {

        const { id } = await req.json();

        await connectDB();

        const results = await requestModel.find({"patientInfo.patientID": id});

        if(!results) {
            return Response.json({message: 'No request found!'}, {status: 404});
        }
        else {
            return Response.json(results, {status: 200});
        }

    } catch (error) {
        console.log(error);
        return Response.json({message: 'Problem with getAllRequests! '+ error}, {status: 500});
    }
}