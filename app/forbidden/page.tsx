"use client"

import Brand from "@/components/layout/Brand";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const ForbiddenPage = () => {

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 4000)
    }, [router]);

    return (
        <>
            <Brand />
            <div className="text-2xl font-bold justify-center items-center flex flex-col text-red-700 h-96 mt-20">
                <h1>Accès refusé!</h1>
                <p>Vous n&apos;avez pas accès à cette page</p>
            </div>
        </>
    );
};

export default ForbiddenPage;