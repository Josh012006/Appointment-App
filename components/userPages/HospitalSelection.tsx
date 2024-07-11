"use client"


import Hospital from "@/interfaces/hospitalInterface";
import User from "@/interfaces/userInterface";


import { useEffect, useState } from "react";
import DoctorDisplay from "./DoctorDisplay";




function HospitalSelection({Hospital, Doctors}: {Hospital: Hospital ,Doctors: User[]}) {

    const [displayDoctors, setDisplayDoctors] = useState(false)

    const [doctorList, setDoctorList] = useState<User[]>([]);

    useEffect(() => {
        if(Doctors){
            let temp: User[] = [];
            Doctors.forEach((doctor) => {
                if(doctor._id && Hospital.doctorsID.includes(doctor._id)){
                    temp.push(doctor);
                }
            });
            setDoctorList(temp);
        }
    }, [Doctors, Hospital]);

    return (
        <div className={doctorList.length === 0 ? "hidden" : "block"}>
            <div className="grid grid-cols-6 items-center rounded-lg shadow-md border p-4 mt-4 bg-white min-h-28 text-justify">
                <div className="col-span-6 lg:col-span-5">
                    <h1 className="text-xl lg:text-2xl my-2 font-bold text-center">{Hospital.hospitalName}</h1>
                    <p className="my-1">{Hospital.region}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+221 {Hospital.phoneNumber}</p>
                    <p className="my-1">{Hospital.address}</p>
                </div>
                <i className="fa-solid fa-chevron-down cursor-pointer col-span-6 lg:col-span-1 my-3 lg:my-0 mx-auto" onClick={() => {setDisplayDoctors(!displayDoctors)}} aria-hidden="true"></i>
            </div>
            {Doctors && displayDoctors && <div className="p-3 rounded-lg" style={{backgroundColor: 'rgb(239, 239, 239)'}}>
                {doctorList.map((doctor) => {
                    return <DoctorDisplay key={doctor._id} doctorData={doctor} />
                })}
            </div>}
        </div>
    );   
}


export default HospitalSelection;