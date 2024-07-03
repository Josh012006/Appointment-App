"use client"


import HistoryAppoint from "@/components/userPages/HistoryAppoint";
import Appointment from "@/interfaces/appointmentInterface";
import User from "@/interfaces/userInterface";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loader from "@/components/Loader";




function PatHistory() {

    const [history, setHistory] = useState<Appointment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState<boolean>(true);

    const itemsPerPage = 10; // Nombre d'éléments par page

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
                    setLoading(false);
                    setHistory(appointments);
                }

            } catch (error) {
                location.reload();
            }
        }

        fetchHistory();
    }, [user]);



    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    
    const offset = (currentPage - 1) * itemsPerPage;
    const currentPageItems = history.slice(offset, offset + itemsPerPage);



    return(
        <div className="p-3">
            <h1 className="mx-auto text-2xl font-bold text-center">Historique médical</h1>
            <p className="text-center my-3 mx-auto">Ici vous pourrez voir vos anciens rendez-vous. Pour voir ceux à venir ou ceux actuels veuillez vous référer au calendrier!</p>
            <div className="flex flex-col lg:grid lg:grid-cols-2">
                {loading && <div className="mx-auto my-5"><Loader color="#36d7b7" size={40} /></div>}
                {history && currentPageItems.map((event: Appointment) => (
                    <HistoryAppoint key={event._id} event={event} />
                ))}
            </div>
            <Stack spacing={2} alignItems="center">
                <Pagination
                    count={Math.ceil(history.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                />
            </Stack>
        </div>
    )
}


export default PatHistory;