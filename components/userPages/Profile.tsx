"use client"

import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import Field from "./Field";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";



function Profile ({UserType} : {UserType: string}) {

    const [display, setDisplay] = useState<boolean>(false);


    const [username, setUsername] = useState<string>("");

    const firstName = useAppSelector((state) => state.auth.infos?.firstName) as string;
    const lastName = useAppSelector((state) => state.auth.infos?.lastName) as string;

    const isAuthenticated = useAppSelector((state) => state.auth.isAuth) as boolean;

    useEffect(() => {
        if (firstName && lastName) {
            setUsername(`${firstName} ${lastName}`);
        }
    }, [firstName, lastName]);

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);


    return(
        <div className="flex flex-col w-40 justify-around items-center relative mx-auto lg:mx-0">
            <div className="flex items-center cursor-pointer " onClick={() => {setDisplay(b => !b)}}>
                <Image className="m-2" src="/profile.png" alt="Profile picture" width={40} height={40} />
                <h2 className="font-bold text-xl hidden lg:block">{username}</h2>
            </div>
            {display && 
            <div className="flex flex-col justify-around w-full px-3 z-50 py-2 absolute top-full rounded-b-lg" style = {{backgroundColor: 'var(--side_color)'}}>
                <Field Name="Mon profil" Href={`/userpage/${UserType}/profile`} OnClick={() => {}} />
                <Field Name="Se déconnecter" Href={""} OnClick={() => {dispatch(logout());}} />
            </div>
            }
        </div>
    )
}



export default Profile;