"use client"

import Link from "next/link";



function Field ({Name, Href, OnClick} :  {Name: string, Href: string, OnClick: () => void}) {


    return (
        <Link href={Href} className="rounded-lg border p-1 w-full text-center my-2" style={{backgroundColor: "rgba(0, 0, 0, 0.1)"}} onClick={OnClick}>{Name}</Link>
    )
}


export default Field;