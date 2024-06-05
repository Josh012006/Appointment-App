"use client"

import Form from "@/components/authentification/Form";
import Input from "@/components/authentification/Input";
import { useParams } from "next/navigation";

// J'ai trois types d'utilisateur pat, med, sec


function Login() {

    const params = useParams();
    const type = params.type;

    const myType = (typeof type !== "string")? "pat" : type;

    return (
        <Form Type="login" ID = "loginForm" userType={myType}>
            <Input Type="email" Placeholder="Adresse e-mail" Label="Email" ID="mail" />
            <Input Type="text" Placeholder="Mot de passe" Label="Mot de passe" ID="password" />
        </Form>
    );
}

export default Login;