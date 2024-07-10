import connectDB from "@/server/config/db";
import requestModel from "@/server/models/requestModel";

import { NextRequest } from "next/server";





export async function GET(req: NextRequest, {params} : {params: {medID: string}}) {
    try {
        const { medID } = params;

        await connectDB();

        const search = await requestModel.find({"doctorInfo.medID": medID, status: 'Confirmé'}).sort({createdAt: -1});

        if(!search) {
            return Response.json({error: 'Request not found!'}, {status: 404});
        }
        else {
            return Response.json(search, {status: 200});
        }

    } catch (error) {
        console.error(error);
        return Response.json({error: 'An error occurred while getting processed requests!'}, {status: 500})
    }
}