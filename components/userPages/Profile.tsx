"use client"

import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import Field from "./Field";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/features/authSlice";



function Profile ({UserType} : {UserType: string}) {

    const [display, setDisplay] = useState<boolean>(false);


    const [username, setUsername] = useState<string>("");

    const firstName = useAppSelector((state) => state.auth.infos?.firstName) as string;
    const lastName = useAppSelector((state) => state.auth.infos?.lastName) as string;

    useEffect(() => {
        if (firstName && lastName) {
            setUsername(`${firstName} ${lastName}`);
        }
    }, [firstName, lastName]);

    const dispatch = useDispatch<AppDispatch>();


    return(
        <div className="flex flex-col z-20 w-40 justify-around items-center">
            <div className="flex items-center cursor-pointer " onClick={() => {setDisplay(b => !b)}}>
                <Image className="m-2" src="/profile.png" alt="Profile picture" width={40} height={40} />
                <h2 className="font-bold text-xl hidden lg:block">{username}</h2>
            </div>
            {display && 
            <div className="flex flex-col justify-around w-full px-3 py-2">
                <Field Name="Mon profil" Href={`/userpage/${UserType}/profile`} OnClick={() => {dispatch(logout());}} />
                <Field Name="Se déconnecter" Href={""} OnClick={() => {}} />
            </div>
            }
        </div>
    )
}



export default Profile;