"use client"


import HistoryAppoint from "@/components/userPages/HistoryAppoint";
import Appointment from "@/interfaces/appointmentInterface";
import User from "@/interfaces/userInterface";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




function PatHistory() {

    const [history, setHistory] = useState<Appointment[]>([]);

    const user = useAppSelector(state => state.auth.infos) as User;

    const router = useRouter();

    useEffect(() => {
        async function fetchHistory () {
            try {
                const userId = user._id;

                const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/appointment/getAll`, JSON.stringify({id: userId}), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });
                
                if(result.status !== 200) {
                    throw Error('An error occured while fetching appointments!');
                }
                else {
                    console.log(result.data);
                    let appointments: Appointment[] = result.data.filter((appointment: Appointment) => new Date(appointment.end) < new Date());

                    appointments.forEach(appointment => {
                        appointment.start = new Date(appointment.start);
                        appointment.end = new Date(appointment.end);
                    });
                    console.log(appointments);
                    setHistory(appointments);
                }

            } catch (error) {
                router.refresh();
            }
        }

        fetchHistory();
    }, [user, router]);



    return(
        <div className="p-3">
            <h1 className="mx-auto text-2xl font-bold text-center">Historique médical</h1>
            <p className="text-center my-3 mx-auto">Ici vous pourrez voir vos anciens rendez-vous. Pour voir ceux à venir ou ceux actuels veuillez vous référer au calendrier!</p>
            <div className="flex flex-col">
                {history && history.map((event: Appointment) => {
                    return (
                        <HistoryAppoint key={event._id} event={event} />
                    )})
                }
            </div>
        </div>
    )
}


export default PatHistory;