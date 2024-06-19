"use client"

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";




export default function Return () {

    const [show, setShow] = useState<boolean>(false);

    const path: string = usePathname();
    const router = useRouter();


    return (
        <>
            {(path !== '/auth/userselection') && <span className="flex items-center border-2 rounded-lg w-max px-2 m-3 cursor-pointer" style = {{borderColor: 'var(--main_color)'}} onClick = {() => {router.push('/auth/userselection')}} onMouseEnter={() => {setShow(true)}} onMouseLeave={() => {setShow(false)}}>
                <Image src="/return.png" alt="Return" width={24} height={24} className="m-2" />
                {show && <p className="font-bold text-xs">Retourner à la sélection du type d&apos;utilisateur</p>}
            </span>}
        </>
    )
}