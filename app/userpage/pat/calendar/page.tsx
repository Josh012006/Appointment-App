"use client"

import MyCalendar from '@/components/userPages/MyCalendar';
import Appointment from '@/interfaces/appointmentInterface';
import User from '@/interfaces/userInterface';
import { useAppSelector } from '@/redux/store';
import axios from 'axios';

import { useEffect, useState } from 'react';


function PatCalendar() {

    const [events, setEvents] = useState<Appointment[]>([]);

    const user = useAppSelector(state => state.auth.infos) as User;



    useEffect(() => {
        async function fetchAppointments () {
            try {
                const userId = user._id;

                const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/appointment/getAll`, JSON.stringify({id: userId}), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });
                
                if(result.status !== 200) {
                    throw Error('An error occured while fetching appointments!');
                }
                else {
                    let appointments: Appointment[] = result.data.filter((appointment: Appointment) => appointment.status === 'confirmed' && new Date(new Date(appointment.end).getTime() + 2 * 60 * 60 * 1000) >= new Date());

                    appointments.forEach(appointment => {
                        appointment.start = new Date(appointment.start);
                        appointment.end = new Date(appointment.end);
                    });
                    setEvents(appointments);
                }

            } catch (error) {
                location.reload();
            }
        }

        fetchAppointments();
    }, [user]);




    // Gestion du popup lors de la sélection d'un événement
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [popupEvent, setPopupEvent] = useState<any>(null);

    const handleClosing = () => {  
        setShowPopup(false);
        setPopupEvent(null);
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };


    return (
        <>
            {showPopup && <div className='absolute flex justify-center items-center w-full h-full z-50' style={{backgroundColor: 'rgba(100, 116, 139, 0.7)'}}>
                <div className='rounded-lg border p-4 bg-white w-4/5 lg:w-1/3 min-h-96'>
                    <i className="fa-solid fa-xmark cursor-pointer" onClick={handleClosing} aria-hidden="true"></i>
                    <div className='my-auto'>
                        <h1 className="text-2xl font-bold text-center">{popupEvent.title}</h1>
                        <p className="text-center">{new Date(popupEvent.start).toLocaleDateString('fr-FR', options)}</p>
                        <p className="text-center font-bold">{popupEvent.hospital}</p>
                        <p className="text-center">Rendez-vous avec <span className='font-bold'>{popupEvent.medName}</span> pour <span className='font-bold'>{popupEvent.medSpecialty}</span>.</p>
                        <h2 className='font-bold text-center mt-5 mb-2 text-xl'>ID du rendez-vous: {popupEvent.ID}</h2>
                    </div>
                </div>
            </div>}
            <div>
                <h1 className="mx-auto text-2xl font-bold text-center">Mon Calendrier</h1>
                <p className='m-5 text-center'>Vous pouvez voir ici vos rendez-vous dans le calendrier. Veuillez appuyez sur un rendez-vous pour voir les informations le concernant.
                    Ne manquez également pas de consulter l&apos;aperçu agenda du calendrier qui offre un meilleur aperçu sur les rendez-vous pendant une durée d&apos;un mois.
                </p>
                <div className='m-5 flex flex-col items-center'>
                    <p className='m-2 text-center font-bold'>Explication du code de couleurs</p>
                    <div className='flex flex-col lg:flex-row items-center justify-center'>
                        <div className='flex items-center m-2'>
                            <div className='w-5 h-5 bg-green-600 rounded-full m-1'></div>
                            <p>Rendez-vous éloigné</p>
                        </div>
                        <div className='flex items-center m-2'>
                            <div className='w-5 h-5 bg-yellow-400 rounded-full m-1'></div>
                            <p>Rendez-vous imminent</p>
                        </div>
                        <div className='flex items-center m-2'>
                            <div className='w-5 h-5 bg-red-400 rounded-full m-1'></div>
                            <p>Date dépassée</p>
                        </div>
                    </div>
                    <p className='text-center my-3'><span className='font-bold'>NB:</span> Veuillez noter que les rendez-vous dont l&apos;heure est dépassée disparaitront du calendrier quelques heures après que leur heure convenue soit passée.</p>
                </div>
                <MyCalendar Events={events} SetPopup={setShowPopup} SetSelected = {setPopupEvent} UserType='pat' />
            </div>
        </>
    )
}


export default PatCalendar;