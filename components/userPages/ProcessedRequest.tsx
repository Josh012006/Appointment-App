import RequestMut from "@/interfaces/requestMutateInterface";

import dayjs from 'dayjs';



function ProcessedRequest({ request }: { request: RequestMut }) {

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className="bg-white border-2 border-gray-300 p-3 rounded-md shadow-md">
            <p className="text-center font-bold">ID: {request.ID}</p>
            <p><span className="font-bold">Nom du patient:</span> {request.requestInfo.patientInfo.name}</p>
            <p><span className="font-bold">Mail:</span> <span className="whitespace-normal">{request.requestInfo.patientInfo.mail}</span></p>
            <p><span className="font-bold">Numéro de téléphone:</span> +221 {request.requestInfo.patientInfo.phone}</p>
            <p><span className="font-bold">Date du rendez-vous:</span> {request.appointmentDate.toLocaleDateString('fr-FR', options)}</p>
            <p><span className="font-bold">Heure du rendez-vous:</span> {dayjs(request.appointmentDate.toISOString()).hour()}h {dayjs(request.appointmentDate.toISOString()).minute()}min</p>
        </div>
    )
}



export default ProcessedRequest;