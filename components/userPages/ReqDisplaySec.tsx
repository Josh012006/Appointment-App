"use client"

import MyRequest from "@/interfaces/requestInterface";
import axios from "axios";

import { useRouter } from "next/navigation";





function ReqDisplaySec({request} : {request: MyRequest}) {

    const router = useRouter();

    const handleClick = async () => {
        try {

            const result = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/markAsSeen/${request._id}`, { headers: { 'Content-Type': 'application/json' }, validateStatus: (status:any) => status >= 200 });

            if (result.status === 200) {
                console.log('Request successfully updated!');
                router.push(`pending/${request._id}`);
            }
            else {
                throw Error('An error occured while marking request as seen!');
            }

        } catch (error) {
            console.log(error);
            location.reload();
        }
    }

    return (
        <div className='rounded-lg border shadow-md p-4 m-4 bg-white min-h-28 text-justify'>
            <p className="my-1"><span className="font-bold">Nom et prénom du patient:</span> {request.patientInfo.name}</p>
            <p className="my-1"><span className="font-bold">Mail:</span> <span className="whitespace-normal">{request.patientInfo.mail}</span></p>
            <p className="my-1"><span className="font-bold">Numéro de téléphone:</span> +221 {request.patientInfo.phone}</p>
            <p className="my-1"><span className="font-bold">Date de la demande:</span> {new Date(request.createdAt??  "").toLocaleDateString('fr-FR')}</p>
            <div><button className="text-white font-bold py-2 px-4 rounded-lg my-2 mx-auto" style={{backgroundColor: 'var(--main_color)'}} onClick={handleClick}>Attribuer un rendez-vous</button></div>
        </div>
    )
}



export default ReqDisplaySec;