"use client"

import UserType from "@/components/authentification/UserType";
import { useEffect } from "react";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";



export default function Users() {
    const router = useRouter();

    useEffect   (() => {
        const user = Cookies.get('userHealthAppointment');
        if (user) {
            const type = JSON.parse(user).type;
            router.replace(`/userpage/${type}/calendar`);
        }
    }, [router]);

    return (
        <div>
            <UserType />
        </div>
    );
}
