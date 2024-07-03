"use client"

import MyRequest from "@/interfaces/requestInterface";
import axios from "axios";





function RequestDisplay({request, SetError} : {request: MyRequest, SetError: (error: boolean) => void}) {


    const handleCancel = async () => {
        try {
            
            const result = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/deleteOne/${request._id}`, { validateStatus: status => status >= 200 });

            if(result.status === 200) {
                location.reload();
            }
            else {
                throw Error('An error occured while deleting the request!');
            }

        } catch (error) {
            console.error(error);
            SetError(true);
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }

    const color = request.status === 'En attente' ? 'bg-yellow-200 text-yellow-500' : request.status === 'En étude' ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500';


    return (
        <div className='rounded-lg border p-4 m-4 bg-white min-h-28 text-justify'>
            <h1 className="text-2xl my-2 font-bold text-center">Demande à {request.hospital} pour consultation en {request.patientInfo.specialty}</h1>
            <h2 className="text-xl my-1 underline">Vos informations générales</h2>
            <div className="flex flex-col lg:grid lg:grid-cols-2">
                <p className="my-1"><span className="font-bold">Nom:</span> {request.patientInfo.name}</p>
                <p className="my-1"><span className="font-bold">Mail:</span> <span className="whitespace-normal">{request.patientInfo.mail}</span></p>
                <p className="my-1"><span className="font-bold">Age:</span> {request.patientInfo.age} ans</p>
                <p className="my-1"><span className="font-bold">Téléphone:</span> +221 {request.patientInfo.phone}</p>
            </div>
            <p className="my-1"><span className="font-bold">Description:</span> <br/>{request.patientInfo.description}</p>
            <p className="my-1"><span className="font-bold">Statut:</span> <span className={`${color}`}>{request.status}</span></p>
            {(request.status === 'En attente') && <button className="text-white rounded-lg p-2 my-2 mx-auto" style={{backgroundColor: 'var(--main_color)'}} onClick={handleCancel}>Annuler</button>}
        </div>
    )
}

export default RequestDisplay;