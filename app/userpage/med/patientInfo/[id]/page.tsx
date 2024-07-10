"use client"


import Loader from "@/components/Loader";
import MyRequest from "@/interfaces/requestInterface";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


import { useRouter } from "next/navigation";



function PatientInfo() {

    const [show, setShow] = useState<boolean>(false);
    const router = useRouter();


    const params = useParams();

    const [infos, setInfos] = useState<MyRequest |  null>(null);

    useEffect(() => {
        async function fetchRequestInfos() {

            try {
                
                const response = await axios.get(`/api/requests/getByAppointID/${params.id}`, { headers: { 'Content-Type': 'application/json' }, validateStatus: (status:any) => status >= 200 });

                if (response.status === 200) {
                    setInfos(response.data);
                }
                else if(response.status === 404){
                    throw Error('Request not found!');
                }
                else {
                    throw Error('An error occured while fetching request infos!');
                }

            } catch (error) {
                console.log(error);
                location.reload();
            }
        }

        fetchRequestInfos();
    }, [params]);

    return (
        <>
            <h1 className="font-bold my-5 text-center text-2xl">Informations du patient</h1>
            <span className="flex items-center border-2 rounded-lg w-max px-2 m-3 cursor-pointer" style = {{borderColor: 'var(--main_color)'}} onClick = {() => {router.push('/userpage/med/calendar')}} onMouseEnter={() => {setShow(true)}} onMouseLeave={() => {setShow(false)}}>
                <Image src="/return.png" alt="Return" width={24} height={24} className="m-2" />
                {show && <p className="font-bold text-xs">Retourner au calendrier</p>}
            </span>
            {!infos && <div className="mx-auto my-5 text-center"><Loader color="#36d7b7" size={40} /></div>}
            {infos && <div className="p-3">
                <h1 className="underline text-center my-3">Informations générales sur le patient</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center p-3">
                    <p><span className="font-bold">Nom:</span> {infos.patientInfo.name}</p>
                    <p><span className="font-bold">Email:</span> {infos.patientInfo.mail}</p>
                    <p><span className="font-bold">Téléphone:</span> +221 {infos.patientInfo.phone}</p>
                    <p><span className="font-bold">Genre:</span> {infos.patientInfo.gender}</p>
                    <p><span className="font-bold">Age:</span> {infos.patientInfo.age} ans</p>
                    <p><span className="font-bold">Taille:</span> {infos.patientInfo.height} &nbsp;mètres (m)</p>
                    <p><span className="font-bold">Poids:</span> {infos.patientInfo.weight} kg</p>
                    <p><span className="font-bold">Profession:</span> {infos.patientInfo.profession}</p>
                    <p><span className="font-bold">Lieu de naissance:</span> {infos.patientInfo.placeOfBirth}</p>
                </div>
                <br />
                <h1 className="underline text-center my-3">Informations sur la maladie et les éventuels antécédents</h1>
                <div className="flex flex-col p-3 justify-around">
                    <p className="my-3"><span className="font-bold">Description des symptômes:</span> {infos.patientInfo.description}</p>
                    <p className="my-3"><span className="font-bold">Antécédents:</span> {infos.patientInfo.background}</p>
                </div>
            </div>}
        </>
    )
}



export default PatientInfo;