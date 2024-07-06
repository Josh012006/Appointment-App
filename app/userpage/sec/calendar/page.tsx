"use client"

import MyCalendar from "@/components/userPages/MyCalendar";
import Appointment from "@/interfaces/appointmentInterface";
import AppointMut from "@/interfaces/appointMutateInterface";
import User from "@/interfaces/userInterface";
import { useAppSelector } from "@/redux/store";
import getPatientInfos from "@/server/utils/getPatientInfos";
import axios from "axios";
import { useEffect, useState } from "react";




function SecCalendar() {
    

    const [consultations, setConsultations] = useState<AppointMut[]>([]);

    const user = useAppSelector(state => state.auth.infos) as User;

    const [doctorInfos, setDoctorInfos] = useState<User | null>(null);

    useEffect(() => {
        async function fetchDoctorInfos() {
            try {
                const medID = user.medID;
                const hospital = user.hospital;

                const medInfosFetch = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifyMed`, JSON.stringify({ id: medID, hospital }), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });
            
                if (medInfosFetch.status === 200) {
                    setDoctorInfos(medInfosFetch.data);
                } else {
                    throw Error('An error occured while fetching doctor infos!');
                }
            } catch (error) {
                console.log(error);
                location.reload();
            }
        }

        fetchDoctorInfos();
    }, [user])

    useEffect(() => {   
        async function fetchConsultations() {
            try {
                const id = doctorInfos?._id;

                const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/appointment/getConsultations`, JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                if(result.status === 404) {
                    console.log('No consultations found!');
                    setConsultations([]);
                }
                else if (result.status === 200) {
                    let appointments: Appointment[] = result.data.filter((appointment: Appointment) => new Date(new Date(appointment.end).getTime() + 1 * 60 * 60 * 1000) >= new Date());

                    appointments.forEach(appointment => {
                        appointment.start = new Date(appointment.start);
                        appointment.end = new Date(appointment.end);
                    });
                    

                    const appointMuts = await Promise.all(
                        appointments.map(async (appointment: Appointment) => {
                            return { appointment, patientInfos: await getPatientInfos(appointment.patientID) };
                        })
                    );

                    console.log(appointMuts);

                    setConsultations(appointMuts);

                }
                else {
                    throw Error('An error occured while fetching consultations!');
                }

            } catch (error) {
                console.log(error);
                location.reload();
            }
        }

        fetchConsultations();  
    }, [doctorInfos]);



    // Gestion du popup lors de la sélection d'un événement
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [popupEvent, setPopupEvent] = useState<any>(null);
    const [selectedConsultation, setSelectedConsultation] = useState<AppointMut | null>(null);

    useEffect(() => {
        const selected = consultations.find((consultation) => consultation.appointment === popupEvent) as AppointMut;
        setSelectedConsultation(selected);
    }, [popupEvent, consultations]);

    const handleClosing = () => {  
        setShowPopup(false);
        setPopupEvent(null);
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };






    return (
        <>
            {showPopup && selectedConsultation && <div className='absolute flex justify-center items-center w-full h-full z-50' style={{backgroundColor: 'rgba(100, 116, 139, 0.7)'}}>
                <div className='rounded-lg border p-4 bg-white w-4/5 lg:w-1/3 h-96'>
                    <i className="fa-solid fa-xmark cursor-pointer" onClick={handleClosing} aria-hidden="true"></i>
                    <div className='my-auto'>
                        <p className="text-center"><span className="font-bold">Horaire et Date:</span> {new Date(popupEvent.start).toLocaleDateString('fr-FR', options)}</p>
                        <p className="text-center font-bold">A {popupEvent.hospital}</p>
                        <p className="text-center">Consultation avec patient <span className='font-bold'>{selectedConsultation.patientInfos?.firstName + " " + selectedConsultation.patientInfos?.lastName}</span> pour examen en <span className='font-bold'>{popupEvent.medSpecialty}</span>.</p>
                    </div>
                </div>
            </div>}
            <div>
                <h1 className="mx-auto my-2 text-2xl font-bold text-center">Calendrier</h1>
                <MyCalendar Events={consultations.map((consultation) => {return consultation.appointment})} SetPopup={setShowPopup} SetSelected = {setPopupEvent} UserType="sec" />
            </div>
        </>
    )
}


export default SecCalendar;