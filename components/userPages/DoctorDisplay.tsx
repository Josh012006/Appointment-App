"use client"

import User from "@/interfaces/userInterface";
import Link from "next/link";




function DoctorDisplay({doctorData}: {doctorData: User}) {
    return (
        <div className="rounded-lg border-2 border-black p-4 m-4 bg-white min-h-20 text-justify flex flex-col items-center">
            <div className="my-3 w-full">
                <h1 className="text-2xl my-2 font-bold text-center">Dr. {doctorData.firstName} {doctorData.lastName}</h1>
                <p className="my-1"><span className="font-bold">Genre:</span> {doctorData.gender}</p>
                <p className="my-1"><span className="font-bold">Email:</span> <span className="break-all">{doctorData.mail}</span></p>
                <p className="my-1"><span className="font-bold">Téléphone:</span> +221 {doctorData.phone}</p>
                <p className="my-1"><span className="font-bold">Spécialités:</span> {doctorData.speciality}</p>
            </div>
            <div className="mx-auto">
                <Link href={`/userpage/pat/reservation/${doctorData._id}`} style={{backgroundColor: 'var(--main_color)'}} className="text-white rounded-lg p-2 h-9 mx-auto my-2">Réserver</Link>
            </div>
        </div>
    );
}   


export default DoctorDisplay;