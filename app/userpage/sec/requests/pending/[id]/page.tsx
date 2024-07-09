"use client"

import MyRequest from "@/interfaces/requestInterface";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import "dayjs/locale/fr";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import Loader from "@/components/Loader";
import Appointment from "@/interfaces/appointmentInterface";

import generateAppointID from "@/server/utils/generateAppointID";



function SeeRequest() {

    const router = useRouter();

    const id = useParams().id as string;

    const [request, setRequest] = useState<MyRequest>();
    const [loading1, setLoading1] = useState<boolean>(false);

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());

    useEffect(() => {
        async function fetchRequest() {
            try {
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/getRequest/${id}`, { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                if(result.status === 404) {
                    console.log('Request not found!');
                }
                else if (result.status === 200) {
                    setRequest(result.data);
                }
                else if(result.status === 500){
                    throw Error('An error occured while fetching request!');
                }
            } catch (error) {
                console.log(error);
                location.reload();
            }
        }

        fetchRequest();

    }, [id]);


    const handleConfirmation = async () => {
        try {
            setLoading1(true);
            if(selectedDate && selectedTime) {
                const date = new Date(selectedDate?.toDate().getFullYear(), selectedDate?.toDate().getMonth(), selectedDate?.toDate().getDate(), selectedTime?.hour(), selectedTime?.minute());
                console.log(date);

                const appointment: Appointment = {
                    title: 'Rendez vous avec ' + request?.patientInfo.specialty,
                    start: date,
                    end: date,
                    status: 'confirmed',
                    hospital: request?.hospital?? "",
                    medName: request?.doctorInfo.medName?? "",
                    medID: request?.doctorInfo.doctorId?? "",
                    patientID: request?.patientInfo.patientID?? "",
                    medSpecialty: request?.patientInfo.specialty?? "",
                    ID: generateAppointID()
                }

                const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/appointment/addOne`, JSON.stringify({id: request?.patientInfo.patientID, appointment}), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                if(result.status === 200) {
                    const appointID = result.data._id;

                    const res1 = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/addAppointID`, JSON.stringify({id, appointID}), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                    if(res1.status === 200) {
                        const res2 = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/markAsConfirmed/${id}`, { headers: { 'Content-Type': 'application/json' }, validateStatus: (status:any) => status >= 200 });
                        if(res2.status === 200) {
                            const res3 = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sendMail`, JSON.stringify({mail: request?.patientInfo.mail, subject: 'Notification de rendez-vous sur Health Appointment', content: `Vous venez de recevoir une confirmation de rendez-vous à ${request?.hospital} pour le ${date.toLocaleDateString('fr-FR')} à ${date.toLocaleTimeString('fr-FR')}. Ne le manquez pas et meilleure santé à vous! `}), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                            if(res3.status === 200) {
                                const res4 = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/deleteFromUserTab?userId=${request?.patientInfo.patientID}&requestId=${request?._id}`, { validateStatus: status => status >= 200 });

                                if(res4.status === 200) {
                                    setLoading1(false);
                                    router.push('/userpage/sec/requests/pending');
                                }
                                else {
                                    throw Error('An error occured while deleting the request from user tab!');
                                }
                            }
                            else {
                                throw Error('Erreur lors de l\'envoi du mail de confirmation!');
                            }
                        }
                        else {
                            throw Error('Erreur lors du marquage de la confirmation du rendez-vous!');
                        }
                    }
                    else {
                        throw Error('Erreur lors de l\'ajout d\'appointID!');
                    }
                }
                else if(result.status === 404) {
                    throw Error('Patient non trouvé!');
                }
                else if(result.status === 500) {
                    throw Error('Erreur lors de l\'ajout du rendez-vous!');
                }
            }
            else {
                throw Error('Veuillez choisir une date et un horaire!');
            }
        } catch (error) {
            console.log(error);
            location.reload();
        }
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    return (
        <div className="p-3 flex flex-col">
            <h1 className="my-3 underline text-center text-2xl">Informations du patient</h1>
            {!request && <div className="mx-auto my-5"><Loader color="#36d7b7" size={40} /></div>}
            {request && <div className='rounded-lg border shadow-md p-4 m-4 bg-white min-h-28 text-justify grid grid-cols-1 lg:grid-cols-2'>
                <p className="my-1"><span className="font-bold">Nom et prénom du patient:</span> {request.patientInfo.name}</p>
                <p className="my-1"><span className="font-bold">Mail:</span> <span className="whitespace-normal">{request.patientInfo.mail}</span></p>
                <p className="my-1"><span className="font-bold">Numéro de téléphone:</span> +221 {request.patientInfo.phone}</p>
                <p className="my-1"><span className="font-bold">Date de la demande:</span> {new Date(request.createdAt??  "").toLocaleDateString('fr-FR')}</p>
                <p className="my-1"><span className="font-bold">Age:</span> {request.patientInfo.age}</p>
                <p className="my-1"><span className="font-bold">Profession:</span> {request.patientInfo.profession}</p>
            </div>}
            <br />
            <h1 className="my-3 underline text-center text-2xl">Attribuer une date et un horaire</h1>
            <div className='rounded-lg border shadow-md p-4 m-4 bg-white min-h-28 text-justify flex flex-col items-center'>
                <p className="my-1"><span className="font-bold">Date de la consultation:</span> {selectedDate?.toDate().toLocaleDateString('fr-FR', options)}</p>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                    <DateCalendar value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} minDate={dayjs()} />
                </LocalizationProvider>
                <br />
                <p className="my-2"><span className="font-bold">Heure de la consultation:</span> {selectedTime?.hour()}h {selectedTime?.minute()}min</p>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                    <TimePicker
                        label="Choisir le temps"
                        value={selectedTime}
                        onChange={(newValue: any) => setSelectedTime(newValue)}
                    />
                </LocalizationProvider>
                <br />
                <button className="text-white font-bold py-2 px-4 rounded-lg my-2 mx-auto" style={{backgroundColor: 'var(--main_color)'}} onClick={handleConfirmation}>Confirmer</button>

                {loading1 && <div className="mx-auto my-5"><Loader color="#36d7b7" size={40} /></div>}
            </div>
        </div>
    )
}


export default SeeRequest;