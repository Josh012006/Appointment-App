"use client"


import Loader from "@/components/Loader";
import NavigButton from "@/components/userPages/NavigButton";
import ReqDisplaySec from "@/components/userPages/ReqDisplaySec";
import MyRequest from "@/interfaces/requestInterface";
import User from "@/interfaces/userInterface";
import { useAppSelector } from "@/redux/store";
import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";






function PendingRequests() {

    const [requests, setRequests] = useState<MyRequest[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState<boolean>(true);

    const itemsPerPage = 10; // Nombre d'éléments par page

    const user = useAppSelector(state => state.auth.infos) as User;


    useEffect(() => {
        async function fetchPendingRequests() {
            try {
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/getPendingRequests/${user.medID}`, { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                if(result.status === 404) {
                    console.log('No pending requests found!');
                    setRequests([]);
                }
                else if (result.status === 200) {
                    console.log(result.data);
                    setRequests(result.data);
                }
                else if(result.status === 500){
                    throw Error('An error occured while fetching pending requests!');
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                location.reload();
            }
        }

        fetchPendingRequests();

    }, [user]);



    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    
    const offset = (currentPage - 1) * itemsPerPage;
    const currentPageItems = requests.slice(offset, offset + itemsPerPage);

    return(
        <div className="p-3">
            <NavigButton />
            <h1 className="mx-auto text-2xl font-bold text-center my-2">Demandes en attente</h1>
            <p className="text-center my-3 mx-auto">Ici vous pourrez voir les demandes de rendez-vous que vous avez reçues. Vous pourrez les voir et attribuer une date et un horaire.</p>
            <div className="flex flex-col">
                {loading && <div className="mx-auto my-5"><Loader color="#36d7b7" size={40} /></div>}
                {requests.length === 0 && !loading && <p className="text-center my-5">Aucune demande en attente</p>}
                <div className="flex flex-col lg:grid lg:grid-cols-2">
                    {requests && currentPageItems.map((request: MyRequest, index) => (
                        <ReqDisplaySec key={index} request={request} />
                    ))}
                </div>
            </div>
            <Stack spacing={2} alignItems="center">
                <Pagination
                    count={Math.ceil(requests.length / itemsPerPage)}
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



export default PendingRequests;