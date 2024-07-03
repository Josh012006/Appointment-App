"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";



export default function Brand () {

    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center m-8">
            <Image className="cursor-pointer" src="/logo.png" alt="logo" width="32" height="32" onClick={() => {router.push('/')}} />
            <h1 style={{fontSize:'20px', fontWeight: 'bold', margin: '8px'}} className="text-center">Health Appointment</h1>
        </div>
    )
}
