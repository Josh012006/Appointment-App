"use client"

import ErrorAlert from "../ErrorAlert";
import Brand from "../layout/Brand";
import SuccessAlert from "../SuccessAlert";
import Button from "./Button";
import FormTitle from "./FormTitle";
import Link from "next/link";

import { useState } from "react";


export default function Form ({children, ID, Type, userType} : {children : React.ReactNode, ID: string, Type: "login" | "signup", userType: string}) {

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // Gérer la soumission avec une requête
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const mail = formData.get("mail");
        const password = formData.get("password");

        if(Type === "login") {

            const infos = { type:userType, mail, password };

            // Faire une requête vers la route de connexion et faire la redirection si c'est réussie avec un delay
        }
        else {
            const lastName = formData.get("mail");
            const firstName = formData.get("mail");
            const phone = formData.get("mail");

            if(userType === "pat") {

            }
            else if(userType === "sec") {

            }
            else {

            }
        }
    }

    return (
        <>
            <Brand />
            <form id = {ID} onSubmit={handleSubmit}>
                <FormTitle>{(Type === "login")? "Se connecter" : "Créer un compte"}</FormTitle>
                <div className="flex flex-col m-auto" style={{maxWidth: '400px'}}>
                    {error && <ErrorAlert>Veuillez entrer des informations valides ou vérifiez que vous êtes effectivement un {(userType === "pat")? "patient" : (userType === "sec")? "secrétaire" : "médecin"}!</ErrorAlert>}
                    {success && <SuccessAlert>Connexion réussie!</SuccessAlert>}
                    <>
                        {children}
                    </>
                    <Button type="submit" Form={ID}>{(Type === "login")? "Se connecter" : "S'inscrire"}</Button>
                    {(Type === "login")? 
                        <p className="mt-2 mb-8">Vous n&apos;avez pas encore de compte ? <Link className = "colored no-underline" href={`/auth/signUp/${userType}`}>Inscrivez-vous!</Link> ou <Link className = "colored no-underline" href = {`/auth/passwordReset/${userType}`}>Mot de passe oublié ?</Link></p>:
                        <p className="mt-2 mb-8">Vous avez déjà un compte ? <Link className = "colored no-underline" href={`/auth/login/${userType}`}>Connectez-vous!</Link></p>
                    }
                </div>
            </form>
        </>
    );
}