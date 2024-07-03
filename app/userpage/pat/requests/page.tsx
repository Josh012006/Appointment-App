"use client"

import Loader from "@/components/Loader";
import RequestDisplay from "@/components/userPages/RequestDisplay";
import MyRequest from "@/interfaces/requestInterface";
import { useEffect, useState } from "react";

import Pagination from '@mui/material/Pagination';

import axios from "axios";
import { useAppSelector } from "@/redux/store";
import User from "@/interfaces/userInterface";
import ErrorAlert from "@/components/ErrorAlert";





function PatRequests() {

    const [requests, setRequests] = useState<MyRequest[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);


    const user = useAppSelector(state => state.auth.infos) as User;


    // Gestion de la pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Définissez le nombre d'éléments par page

    // Calculer le nombre total de pages
    const pageCount = Math.ceil(requests.length / itemsPerPage);

    // Obtenir les éléments pour la page actuelle
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);

    const handleChange = (event: any, value: any) => {
        setCurrentPage(value);
    };



    // Récupération des requêtes
    useEffect(() => {
        async function fetchRequests() {
            try {

                const id = user._id;
                const requests = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/getAll`, JSON.stringify({id}), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                if(requests.status === 200 || requests.status === 404) {
                    console.log(requests.data);
                    setRequests(requests.data);
                    setLoading(false);
                    
                }
                else {
                    throw Error('An error occured while fetching requests!');
                }
                

            } catch (error) {
                console.log(error);
                location.reload();
            }
        }

        fetchRequests();
    }, [user]);


    return(
        <div className="p-3">
            <h1 className="mx-auto text-2xl font-bold text-center">Mes demandes</h1>
            <p className="text-center my-3 mx-auto">Cet onglet répertorie vos demandes en cours c&apos;est-à-dire, celles non encore confirmées ou traitées. Tant que ces demandes ne sont pas encores vues, il est possible de les annuler. Mais après, ce n&apos;est plus possible!</p>
            <div className="flex flex-col w-full">
                {error && <div className="mx-auto">
                    <ErrorAlert>Une erreur est intervenue lors de l&apos;annulation. Veuillez réessayer!</ErrorAlert>
                </div>}
                {(loading) && <div className="mx-auto my-5"><Loader color="#36d7b7" size={40} /></div>}
                {!loading && ((requests.length !== 0) ? (
                    <>
                        <div className="flex flex-col w-full lg:grid lg:grid-cols-2">
                            {currentItems.map((request, index) => (
                                <RequestDisplay request={request} SetError={setError} key={index} />
                            ))}
                        </div>
                        <div className="flex justify-center my-4">
                            <Pagination 
                                count={pageCount} 
                                page={currentPage} 
                                onChange={handleChange} 
                                variant="outlined"
                                shape="rounded"
                                color="primary"
                            />
                        </div>
                    </>
                ) : (
                    <div className="text-center my-28">Aucune demande en cours</div>
                ))}
            </div>
        </div>
    )
}


export default PatRequests;