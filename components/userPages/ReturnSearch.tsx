"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";




export default function ReturnSearch () {

    const [show, setShow] = useState<boolean>(false);

    const router = useRouter();


    return (
        <>
            <span className="flex items-center border-2 rounded-lg w-max px-2 m-3 cursor-pointer" style = {{borderColor: 'var(--main_color)'}} onClick = {() => {router.push('/userpage/pat/reservation')}} onMouseEnter={() => {setShow(true)}} onMouseLeave={() => {setShow(false)}}>
                <Image src="/return.png" alt="Return" width={24} height={24} className="m-2" />
                {show && <p className="font-bold text-xs">Retourner à la recherche de médecins!</p>}
            </span>
        </>
    )
}