"use client"

import MyCalendar from "@/components/userPages/MyCalendar";
import Appointment from "@/interfaces/appointmentInterface";
import AppointMut from "@/interfaces/appointMutateInterface";
import User from "@/interfaces/userInterface";
import { useAppSelector } from "@/redux/store";
import getPatientInfos from "@/server/utils/getPatientInfos";
import axios from "axios";
import { useEffect, useState } from "react";

import Link from "next/link";







function MedCalendar() {

    const [consultations, setConsultations] = useState<AppointMut[]>([]);

    const doctorInfos = useAppSelector(state => state.auth.infos) as User;


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

                    appointMuts.forEach(appointMut => {
                        appointMut.appointment.title = "Consultation avec " + appointMut.patientInfos?.firstName + " " + appointMut.patientInfos?.lastName;
                    });

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

    const [firstLogin, setFirstLogin] = useState<boolean>(doctorInfos?.firstLogin??  false);

    const handleClosingMedIDMessage = async () => {
        try {
            setFirstLogin(false);

            const result = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/updateUser`, JSON.stringify({ id: doctorInfos._id, type: 'med', newInfos: { firstLogin: false } }), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 }); 
            
            if(result.status === 200) {
                console.log('MedID message closed!');
            }
            else {
                throw Error('An error occured while closing the MedID message!');
            }

        } catch (error) {
            console.log(error);
            location.reload();
        }
    }



    return (
        <>
            {firstLogin && <div className='absolute flex justify-center items-center w-full h-full z-50' style={{backgroundColor: 'rgba(100, 116, 139, 0.7)'}}>
                <div className='rounded-lg border p-4 bg-white w-4/5 lg:w-1/3 min-h-96'>
                    <i className="fa-solid fa-xmark cursor-pointer" onClick={handleClosingMedIDMessage} aria-hidden="true"></i>
                    <div className='my-auto flex justify-center items-center flex-col text-center'>
                        Votre medID est <span className='font-bold'>{doctorInfos.medID}</span>.<br />Veuillez le <span className='font-bold'>donner à votre secrétaire</span> pour qu&apos;elle puisse s&apos;inscrire sur la plateforme.
                        Si vous l&apos;oubliez, vous pouvez le voir à tout moment <span className='font-bold'>dans votre profil.</span>
                    </div>
                </div>
            </div>}
            {showPopup && selectedConsultation && <div className='absolute flex justify-center items-center w-full h-full z-50' style={{backgroundColor: 'rgba(100, 116, 139, 0.7)'}}>
                <div className='rounded-lg border p-4 bg-white w-4/5 lg:w-1/3 min-h-96'>
                    <i className="fa-solid fa-xmark cursor-pointer" onClick={handleClosing} aria-hidden="true"></i>
                    <div className='my-auto'>
                        <p className="text-center"><span className="font-bold">Horaire et Date:</span> {new Date(popupEvent.start).toLocaleDateString('fr-FR', options)}</p>
                        <p className="text-center font-bold">A {popupEvent.hospital}</p>
                        <p className="text-center">Consultation avec patient <span className='font-bold'>{selectedConsultation.patientInfos?.firstName + " " + selectedConsultation.patientInfos?.lastName}</span> pour examen en <span className='font-bold'>{popupEvent.medSpecialty}</span>.</p>
                        <p className="text-center my-5 font-bold">ID de la consultation: {selectedConsultation.appointment?.ID}</p>
                        <div className='flex justify-center'>
                            <Link href={`/userpage/med/patientInfo/${selectedConsultation.appointment._id}`} className="m-4 p-2 text-white rounded-md" style={{backgroundColor: 'var(--main_color)'}}>Voir les informations du patient</Link>
                        </div>
                    </div>
                </div>
            </div>}
            <div>
                <h1 className="mx-auto my-2 text-2xl font-bold text-center">Calendrier</h1>
                <p className='m-5 text-center'>Vous pouvez voir ici vos consultations planifiées dans le calendrier. Veuillez appuyez sur une consultation pour voir les informations la concernant.
                    Ne manquez également pas de consulter l&apos;aperçu agenda du calendrier qui offre un meilleur aperçu sur les consultations pendant une durée d&apos;un mois.
                </p>
                <div className='m-5 flex flex-col items-center'>
                    <p className='m-2 text-center font-bold'>Explication du code de couleurs</p>
                    <div className='flex flex-col lg:flex-row items-center justify-center'>
                        <div className='flex items-center m-2'>
                            <div className='w-5 h-5 bg-green-600 rounded-full m-1'></div>
                            <p>Consultation éloignée</p>
                        </div>
                        <div className='flex items-center m-2'>
                            <div className='w-5 h-5 bg-yellow-400 rounded-full m-1'></div>
                            <p>Consultation imminente</p>
                        </div>
                        <div className='flex items-center m-2'>
                            <div className='w-5 h-5 bg-blue-700 rounded-full m-1'></div>
                            <p>Horaire dépassée</p>
                        </div>
                    </div>
                    <p className='text-center my-3'><span className='font-bold'>NB:</span> Veuillez noter que les rendez-vous dont l&apos;heure est dépassée disparaitront du calendrier quelques heures après que leur heure convenue soit passée.</p>
                </div>
                <MyCalendar Events={consultations.map((consultation) => {return consultation.appointment})} SetPopup={setShowPopup} SetSelected = {setPopupEvent} UserType="med" />
            </div>
        </>
    )
}

export default MedCalendar;