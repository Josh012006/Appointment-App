"use client"

import Form from "@/components/authentification/Form";
import Input from "@/components/authentification/Input";
import { useParams, useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { useEffect } from "react";


function Login() {

    const router = useRouter();
    
    useEffect   (() => {
        const user = Cookies.get('userHealthAppointment');
        if (user) {
            const type = JSON.parse(user).type;
            router.replace(`/userpage/${type}/calendar`);
        }
    }, [router]);

    const params = useParams();
    const type = params.type;

    const myType = (typeof type !== "string")? "pat" : type;

    return (
        <Form Type="login" ID = "loginForm" userType={myType} isValid = {true}>
            <Input Type="email" Placeholder="Adresse e-mail" Label="Email" ID="mail" />
            <Input Type="password" Placeholder="Mot de passe" Label="Mot de passe" ID="password" />
        </Form>
    );
}

export default Login;