"use client"

import ErrorAlert from "../ErrorAlert";
import Brand from "../layout/Brand";
import SuccessAlert from "../SuccessAlert";
import Button from "./Button";
import FormTitle from "./FormTitle";
import Link from "next/link";

import { useState } from "react";


export default function Form ({children, ID, Type, userType} : {children : React.ReactNode, ID: string, Type: "login" | "signup", userType: string}) {

    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [success, setSuccess] = useState(false);

    interface User {
        type: string;
        lastName: FormDataEntryValue | null;
        firstName: FormDataEntryValue | null;
        mail: FormDataEntryValue | null;
        password: FormDataEntryValue | null;
        phone: FormDataEntryValue | null;

        region?: FormDataEntryValue | null;

        medID?: FormDataEntryValue | null;

        hospital?: FormDataEntryValue | null;

        gender?: FormDataEntryValue | null;
        speciality?: FormDataEntryValue | null;
    }

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
            const lastName = formData.get("nom");
            const firstName = formData.get("prenom");
            const phone = formData.get("telephone");

            const infos: User = {type: userType, lastName, firstName, mail, password, phone};

            if(userType === "pat") {
                infos.region = formData.get("region");
            }
            else {

                infos.hospital = formData.get("hospital");

                if(userType === "sec") {
                    infos.medID = formData.get("medID");
                }
                else {
                    infos.speciality = formData.get("speciality");

                    const male = Boolean(formData.get("genderM"));
                    infos.gender = (male)? "male" : "female";
                }
            }

            // Faire une requête pour ajouter l'utilisateur et le rediriger si c'est réussi
        }
    }

    return (
        <>
            <Brand />
            <form id = {ID} onSubmit={handleSubmit}>
                <FormTitle>{(Type === "login")? "Se connecter" : "Créer un compte"}</FormTitle>
                <div className="flex flex-col m-auto" style={{maxWidth: '400px'}}>
                    {error1 && <ErrorAlert>Veuillez entrer des informations valides ou vérifiez que vous êtes effectivement un {(userType === "pat")? "patient" : (userType === "sec")? "secrétaire" : "médecin"}!</ErrorAlert>}
                    {success && <SuccessAlert>{(Type === "login")? "Connexion réussie!" : "Inscription réussie!"}</SuccessAlert>}
                    {error2 && <ErrorAlert>Une erreur est survenue. Veuillez réessayer.</ErrorAlert>}
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