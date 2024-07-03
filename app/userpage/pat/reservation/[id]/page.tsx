"use client"


import React from "react";

import ReturnSearch from "@/components/userPages/ReturnSearch";
import User from "@/interfaces/userInterface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


import axios from "axios";
import Loader from "@/components/Loader";
import Input from "@/components/authentification/Input";
import ErrorAlert from "@/components/ErrorAlert";
import { useAppSelector } from "@/redux/store";
import MyRequest from "@/interfaces/requestInterface";




function ReservationProcess () {

    const { id } = useParams();


    const [doctorInfos, setDoctorInfos] = useState<User | null>(null);

    const [gender, setGender] = useState({male: true, female: false});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();

    const user = useAppSelector(state => state.auth.infos);

    useEffect(() => {
        const fetchDoctorInfos = async () => {
            try {
                
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getDoctorInfo/${id}`, { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                if(result.status === 500) {
                    throw Error('Une erreur interne est survenue au niveau du fetchDoctors!');
                }
                else if(result.status === 404) {
                    throw Error('Aucun médecin trouvé!');
                }
                else if(result.status === 200) {
                    console.log(result.data);  
                    setDoctorInfos(result.data);
                }

            } catch (error) {
                console.log(error);
                location.reload();
            }
        }
        fetchDoctorInfos();
    }, [id]);



    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            router.push(`/userpage/pat/reservation/${doctorInfos?._id}/#reservationForm`);

            setLoading(true);
            setError(false);

            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            const patientID = user?._id?? "";
            const name = formData.get("name") as string;
            const mail = user?.mail?? "";
            const phone = user?.phone?? "";
            const age = formData.get("age") as string;
            const height = formData.get("height") as string;
            const weight = formData.get("weight") as string;
            const placeOfBirth = formData.get("placeOfBirth") as string;
            const profession = formData.get("profession") as string;
            const gender = formData.get("genderM") ? "Masculin" : "Féminin";
            const specialty = formData.get("specialty") as string;
            const description = formData.get("description") as string;
            const background = formData.get("background") as string;


            const request: MyRequest = {
                patientInfo: {
                    patientID,
                    name,
                    mail,
                    phone,
                    age,
                    height,
                    weight,
                    placeOfBirth,
                    profession,
                    gender,
                    specialty,
                    description,
                    background
                },
                doctorInfo: {
                    doctorId: doctorInfos?._id?? "",
                    medID: doctorInfos?.medID?? ""
                },  
                hospital: doctorInfos?.hospital?? ""
            }


            console.log(request);

            const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/addNew`, JSON.stringify(request), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

            if(result.status === 500) {
                throw Error('Une erreur interne est survenue lors de la réservation!');
            }
            else if(result.status === 404) {
                throw Error('Aucun patient trouvé!');
            }
            else if(result.status === 200) {
                console.log(result.data);  
                setTimeout(() => {
                    setLoading(false);

                    router.push('/userpage/pat/reservation/success');
                }, 2000);
            }


        } catch (error) {
            console.log(error);
            setError(true);
        }
    }



    return (
        <div className="p-3">
            <ReturnSearch />
            <div>
                <h1 className="mx-auto text-2xl font-bold text-center">Procédure de réservation</h1>
                <div>
                    <div id="doctorInfo" className="my-5">
                        <h2 className="text-xl font-bold">Informations du médecin</h2>
                        {!doctorInfos && <div className="flex justify-center items-center">
                            <Loader color="#36d7b7" size={40} />
                        </div>}
                        {doctorInfos && <div className="grid grid-cols-1 lg:grid-cols-2 items-center p-3">
                            <p><span className="font-bold">Nom:</span> {doctorInfos?.firstName} {doctorInfos?.lastName}</p>
                            <p><span className="font-bold">Email:</span> {doctorInfos?.mail}</p>
                            <p><span className="font-bold">Genre:</span> {doctorInfos?.gender}</p>
                            <p><span className="font-bold">Téléphone:</span> +221 {doctorInfos?.phone}</p>
                            <p><span className="font-bold">Spécialité:</span> {doctorInfos?.speciality?.join(', ')}</p>
                            <p><span className="font-bold">Hôpital:</span> {doctorInfos?.hospital}</p>
                        </div>}
                    </div>
                    <div id="reservation-process" className="my-5">
                        <h2 className="text-xl font-bold">Informations par rapport au patient et au mal</h2>
                        <form id="reservationForm" className="flex flex-col m-auto w-4/5 lg:w-full" onSubmit={handleSubmit}>
                            {loading && <Loader color="#36d7b7" size={40} />}
                            {error && <ErrorAlert>Une erreur est survenue lors de la réservation. Veuillez réessayer!</ErrorAlert>}
                            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:justify-between">
                                <div className="flex flex-col m-5"><Input Type="text" ID="name" Placeholder="Nom" Label="Le nom complet du patient" /></div>
                                <div className="flex flex-col m-5"><Input Type="text" ID="age" Placeholder="26 par exemple" Label="L'âge du patient" /></div>
                                <div className="flex flex-col m-5"><Input Type="text" ID="height" Placeholder="La taille du patient" Label="La taille du patient en mètres(m)" /></div>
                                <div className="flex flex-col m-5">
                                    <label htmlFor = "weight" className="my-3 font-bold">Le poids du patient en kg</label>
                                    <input id="weight" name="weight" placeholder="Le poids du patient" type="text" className="pl-4 h-12 rounded-lg border-2 border-solid border-black" />
                                </div>
                                <div className="flex flex-col m-5"><Input Type="text" ID="placeOfBirth" Placeholder="Le lieu de naissance du patient" Label="Le lieu de naissance du patient" /></div>
                                <div className="flex flex-col m-5"><Input Type="text" ID="profession" Placeholder="Elève ou Chauffeur par exemple" Label="La profession du patient" /></div>
                                <div className="flex flex-col m-5">
                                    <label className="my-3 font-bold">Sexe du patient</label>
                                    <div className="grid grid-cols-2">
                                        <label htmlFor = "male" className="flex items-center justify-center col-span-1 my-3"><input id = "male" type = "radio" name = "genderM" value = {`${gender.male}`} checked = {gender.male} onChange = {() => {setGender({male: true, female: false})}} /> Masculin</label>
                                        <label htmlFor = "female" className="flex items-center justify-center col-span-1 my-3"><input id = "female" type = "radio" name = "genderF" value = {`${gender.female}`} checked = {gender.female} onChange = {() => {setGender({male: false, female: true})}} /> Féminin</label>
                                    </div>
                                </div>
                                <div className="flex flex-col m-5"><Input Type="text" ID="specialty" Placeholder="Cardiologie ou médecine générale ou pédiatrie par exemple" Label="La spécialité concernée" /></div>
                            </div>
                            <br />
                            <br />
                            <div className="flex flex-col lg:m-6">
                                <label htmlFor = "description" className="my-3 font-bold">Description de la maladie et des symptômes</label>
                                <p className="italic m-2">Décrivez au maximum ce que vous ressentez!</p>
                                <textarea id="description" name="description" placeholder="Dites-nous ce que vous ressentez" className="p-4 min-h-72 rounded-lg border-2 border-solid border-black" />
                                <label htmlFor = "background" className="my-3 font-bold">Description de la maladie et des symptômes</label>
                                <p className="italic m-2">Avez-vous des antécédents que vous pensez important de préciser ?</p>
                                <textarea id="background" name="background" placeholder="Parlez-nous de vos antécédents" className="p-4 min-h-72 rounded-lg border-2 border-solid border-black" />
                            </div>
                            <>{doctorInfos ? <button form="reservationForm" type="submit" className="text-white font-bold py-2 px-4 m-4 mx-auto rounded-lg" style={{backgroundColor: 'var(--main_color)'}}>Achever la réservation</button> : <button form="reservationForm" type="submit" className="text-white font-bold py-2 px-4 m-4 mx-auto rounded-lg" style={{backgroundColor: 'var(--main_color)'}} disabled>Achever la réservation</button>}</>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ReservationProcess;