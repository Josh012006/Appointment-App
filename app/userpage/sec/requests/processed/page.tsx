"use client"


import Loader from "@/components/Loader";
import NavigButton from "@/components/userPages/NavigButton";
import ProcessedRequest from "@/components/userPages/ProcessedRequest";
import MyRequest from "@/interfaces/requestInterface";
import RequestMut from "@/interfaces/requestMutateInterface";
import User from "@/interfaces/userInterface";
import { useAppSelector } from "@/redux/store";
import getAppointInfos from "@/server/utils/getAppointInfos";
import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";







function ProcessedRequests() {

    const user = useAppSelector((state) => state.auth.infos) as User;

    const [loading, setLoading] = useState<boolean>(true);

    // Managing filtering
    const [requests, setRequests] = useState<RequestMut[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<RequestMut[]>(requests);

    const [filter, setFilter] = useState<string>("");
    const [filterOption, setFilterOption] = useState<string>("ID");

    const [apply, setApply] = useState<boolean>(false);

    useEffect(() => {
        if(apply) {
            if(filter === "") {
                setFilteredRequests(requests);
            }
            else {
                if(filterOption === 'ID') {
                    const filtered = requests.filter((request) => request.ID === filter);
                    setFilteredRequests(filtered);
                }
                else if(filterOption === 'name') {
                    const filtered = requests.filter((request) => request.requestInfo.patientInfo.name.includes(filter));
                    setFilteredRequests(filtered);
                }
            }
            setApply(false);
        }
    }, [apply, filter, filterOption, requests]);

    // Fetching requests
    useEffect(() => {
        async function fetchRequests() {
            try {
                
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/getProcessedRequests/${user.medID}`, { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                if(result.status === 404) {
                    console.log('No processed requests found!');
                    setRequests([]);
                }
                else if(result.status === 200) {

                    const data = result.data;

                    const requestsMut: RequestMut[] = await Promise.all(
                        data.map(async (request: MyRequest) => {
                            const appointment = await getAppointInfos(request?.appointID?? "");
                            return { requestInfo: request, ID: appointment?.ID, appointmentDate: new Date(appointment?.start) };
                        })
                    );

                    setRequests(requestsMut);
                    setFilteredRequests(requestsMut);
                }
                else {
                    throw Error('An error occured while fetching processed requests!');
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
                location.reload();
            }
        }


        fetchRequests();
    }, [user]);




    // Mangaing pagination
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10; // Nombre d'éléments par page

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    
    const offset = (currentPage - 1) * itemsPerPage;
    const currentPageItems = filteredRequests.slice(offset, offset + itemsPerPage);


    return (
        <div className="p-3">
            <NavigButton />
            <h1 className="mx-auto text-2xl font-bold text-center my-2">Demandes acceptées</h1>
            <p className="text-center my-3 mx-auto">Ici vous pourrez voir les demandes de rendez-vous que vous avez acceptées. Vous pouvez rechercher un rendez-vous particulier grâce à son ID ou au nom du patient.</p>
            <div className="my-5 border-b-2 border-black pb-8">
                <div className="grid grid-cols-5 lg:mx-5">
                    <select title="filterOptions" onChange={(e) => {setFilterOption(e.target.value);}} className="border-2 border-gray-300 rounded-md p-2 h-12 col-span-5 lg:col-span-1">
                        <option value="ID">ID</option>
                        <option value="name">Nom</option>
                    </select>
                    <input type="text" placeholder="Rechercher..." id="filtre" className="border-2 border-gray-300 rounded-md p-2 h-12 col-span-5 lg:col-span-3" value={filter} onChange = {(e) => {setFilter(e.target.value)}} />
                    <button onClick={() => setApply(true)} className="col-span-5 lg:col-span-1 text-white rounded-md p-2 h-12" style={{backgroundColor: 'var(--main_color)'}}>Rechercher</button>
                </div>
            </div>
            {loading && <div className="mx-auto my-5 text-center"><Loader color="#36d7b7" size={40} /></div>}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                {filteredRequests && currentPageItems.map((request: RequestMut) => (
                    <ProcessedRequest key={request.requestInfo._id} request={request} />
                ))}
            </div>
            <Stack spacing={2} alignItems="center">
                <Pagination
                    count={Math.ceil(filteredRequests.length / itemsPerPage)}
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


export default ProcessedRequests;