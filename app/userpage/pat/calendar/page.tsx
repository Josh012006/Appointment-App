"use client"

import MyCalendar from '@/components/userPages/MyCalendar';
import Appointment from '@/interfaces/appointmentInterface';
import User from '@/interfaces/userInterface';
import { useAppSelector } from '@/redux/store';
import axios from 'axios';
import { createPostponedAbortSignal } from 'next/dist/server/app-render/dynamic-rendering';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


function PatCalendar() {

    const [events, setEvents] = useState<Appointment[]>([]);

    const user = useAppSelector(state => state.auth.infos) as User;

    const router = useRouter();


    useEffect(() => {
        async function fetchAppointments () {
            try {
                const userId = user._id;

                const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/appointment/getAll`, JSON.stringify({id: userId}), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });
                
                if(result.status !== 200) {
                    throw Error('An error occured while fetching appointments!');
                }
                else {
                    console.log(result.data);
                    let appointments: Appointment[] = result.data.filter((appointment: Appointment) => appointment.status === 'confirmed' && new Date(new Date(appointment.end).getTime() + 2 * 60 * 60 * 1000) >= new Date());

                    appointments.forEach(appointment => {
                        appointment.start = new Date(appointment.start);
                        appointment.end = new Date(appointment.end);
                    });
                    console.log(appointments);
                    setEvents(appointments);
                }

            } catch (error) {
                location.reload();
            }
        }

        fetchAppointments();
    }, [user]);




    // Gestion du popup lors de la sélection d'un événement
    const [showPopup, setShowPopup] = React.useState<boolean>(false);
    const [popupEvent, setPopupEvent] = React.useState<any>(null);

    const handleClosing = () => {  
        setShowPopup(false);
        setPopupEvent(null);
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };


    return (
        <>
            {showPopup && <div className='absolute flex justify-center items-center w-full h-full z-50' style={{backgroundColor: 'rgba(100, 116, 139, 0.7)'}}>
                <div className='rounded-lg border p-4 bg-white w-4/5 lg:w-1/3 h-96'>
                    <i className="fa-solid fa-xmark cursor-pointer" onClick={handleClosing} aria-hidden="true"></i>
                    <div className='my-auto'>
                        <h1 className="text-2xl font-bold text-center">{popupEvent.title}</h1>
                        <p className="text-center">{new Date(popupEvent.start).toLocaleDateString('fr-FR', options)}</p>
                        <p className="text-center">{popupEvent.hospital}</p>
                        <p className="text-center">Rendez-vous avec {popupEvent.medName} pour {popupEvent.medSpecialty}.</p>
                    </div>
                </div>
            </div>}
            <div>
                <h1 className="mx-auto text-2xl font-bold text-center">Mon Calendrier</h1>
                <MyCalendar Events={events} SetPopup={setShowPopup} eventPop={popupEvent} SetSelected = {setPopupEvent} />
            </div>
        </>
    )
}


export default PatCalendar;