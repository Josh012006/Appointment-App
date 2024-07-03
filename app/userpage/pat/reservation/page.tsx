"use client"

import ErrorAlert from "@/components/ErrorAlert";
import Loader from "@/components/Loader";
import HospitalSelection from "@/components/userPages/HospitalSelection";
import SearchBar from "@/components/userPages/SearchBar";
import Hospital from "@/interfaces/hospitalInterface";
import User from "@/interfaces/userInterface";
import { useAppSelector } from "@/redux/store";
import sortHospitalsByDistance from "@/server/utils/sortHospitals";
import axios from "axios";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import Pagination from '@mui/material/Pagination';




function Reservation() {
    const router  = useRouter();
    const location = useAppSelector((state) => state.auth.infos?.location) as string;

    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [filter, setFilter] = useState<string>("");
    const [filterOption, setFilterOption] = useState<string>("hospital");

    const [applyFilter, setApplyFilter] = useState<boolean>(false);

    
    useEffect(() => {
        async function fetchHospitals() {
            try {
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getHospitals`, { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                if(result.status === 500) {
                    throw Error('Une erreur interne est survene au niveau du fetchHospitals!');
                }
                else if(result.status === 404) {
                    throw Error('Aucun hôpital trouvé!');
                }
                else if(result.status === 200) {
                    console.log(result.data);
                    const sortedHospitals = await sortHospitalsByDistance(location, result.data);
                    setHospitals(sortedHospitals);
                    setFilteredHospitals(sortedHospitals);
                }

            } catch (error) {
                console.log(error);
                setError(true);
            }
        }

        fetchHospitals();

        async function fetchDoctors() {
            try {
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getDoctors`, { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                if(result.status === 500) {
                    throw Error('Une erreur interne est survenue au niveau du fetchDoctors!');
                }
                else if(result.status === 404) {
                    throw Error('Aucun médecin trouvé!');
                }
                else if(result.status === 200) {
                    console.log(result.data);
                    setDoctors(result.data);
                    setFilteredDoctors(result.data);
                }

            } catch (error) {
                console.log(error);
                setError(true);
            }
        }

        fetchDoctors();

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    },[location]);


    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(hospitals);


    const [doctors, setDoctors] = useState<User[]>([]);
    const [filteredDoctors, setFilteredDoctors] = useState<User[]>(doctors);

    // Gestion du filtre
    useEffect(() => {
        if(applyFilter) {
            if(filter === "") {
                setFilteredHospitals(hospitals);
                setFilteredDoctors(doctors);
            }
            else {
                if(filterOption === 'hospital') {
                    setFilteredHospitals(hospitals.filter((hospital) => hospital.hospitalName.toLowerCase().includes(filter.toLowerCase())));
                }
                else if(filterOption === 'speciality') {
                    setFilteredDoctors(doctors.filter((doctor) => 
                        doctor.speciality?.some(speciality => speciality.toLowerCase().includes(filter.toLowerCase()))
                    ));
                }
                else if(filterOption === 'doctor') {
                    setFilteredDoctors(doctors.filter((doctor) => (`${doctor.firstName} ${doctor.lastName}`).toLowerCase().includes(filter.toLowerCase())));
                }
            }
            setApplyFilter(false);
        }
    }, [applyFilter, filter, filterOption, hospitals, doctors]);




    //Gestion de la pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Définissez le nombre d'éléments par page

    // Calculer le nombre total de pages
    const pageCount = Math.ceil(filteredHospitals.length / itemsPerPage);

    // Obtenir les éléments pour la page actuelle
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredHospitals.slice(indexOfFirstItem, indexOfLastItem);

    const handleChange = (event:any, value:any) => {
        setCurrentPage(value);
    };


    return(
        <div className="p-3">
            <h1 className="mx-auto text-2xl font-bold text-center">Prenez rendez-vous!</h1>
            <p className="text-justify my-3 mx-auto">
                Ici vous pouvez prendre rendez-vous chez des médecins particuliers. Vous verrez affiché plus bas les hôpitaux dans un ordre en fonction de votre localisation. Chaque hôpital vous donne accès à ses médecins avec leurs spécialités. Servez vous de la barre de recherche pour trouver une spécialité particulière, un hôpital ou un médecin particulier.
                <br />
                <br />
                Une fois le médecin trouvé appuyez sur le bouton réserver et vous pourrez remplir des informations supplémentaires. Une fois la requête envoyée, vous pourrez la modifier dans l&apos;onglet <span className="cursor-pointer" onClick={() => {router.push('/userpage/pat/requests')}} style={{color: 'var(--main_color)'}}>Demandes</span> tant qu&apos;elle n&apos;aura pas encore été vue.
                <br />
                <br />
                Vous recevrez un mail de confirmation une fois le rendez-vous pris et il apparaitra dans votre calendrier. Ne manquez pas alors de bien vérifier vos mails en cas de modifications de dernières minutes et de vous rendre à votre rendez-vous!
            </p>
            <div className="my-5 border-b-2 border-black pb-8">
                <SearchBar SetFilter={setFilter} SetFilterOption={setFilterOption} SetApply={setApplyFilter} />
            </div>
            <div className="flex flex-col items-center">
                {error && <ErrorAlert>Une erreur est survenue veuillez réessayer.</ErrorAlert>}
                {isLoading && <div className="my-5 mx-auto">
                    <Loader color="#36d7b7" size={40} />
                </div>}
                <div className="w-full">
                    {!isLoading && filteredHospitals && (
                        <>
                            {filteredHospitals.length === 0 ? (
                                <p className="text-center my-9">Aucun résultat pour cette recherche!</p>
                            ) : (
                                <>
                                    {currentItems.map((hospital) => (
                                        <HospitalSelection key={hospital._id} Hospital={hospital} Doctors={filteredDoctors} />
                                    ))}
                                    <div className="flex justify-center my-4">
                                        <Pagination 
                                            count={pageCount} 
                                            page={currentPage} 
                                            onChange={handleChange} 
                                            color="primary"
                                            variant="outlined"
                                            shape="rounded"
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Reservation;