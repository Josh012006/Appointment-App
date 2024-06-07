"use client"

import ErrorAlert from "../ErrorAlert";
import Brand from "../layout/Brand";
import SuccessAlert from "../SuccessAlert";
import Button from "./Button";
import FormTitle from "./FormTitle";

import Link from "next/link";

import { useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/features/authSlice";
import generateUniqueId from "@/server/utils/generateId";


export default function Form ({children, ID, Type, userType} : {children : React.ReactNode, ID: string, Type: "login" | "signup", userType: string}) {

    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch<AppDispatch>();


    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    interface UserFetched {
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
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {

        setSuccess(false);
        setError1(false);
        setError2(false);
        setError3(false);

        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const mail = formData.get("mail");
        const password = formData.get("password");

        
        try {
            if(Type === "login") {

                const infos = { type:userType, mail, password };

                // Je le redirige vers le haut de la page pour qu'il puisse voir les messages
                router.push(`/auth/login/${userType}/#formDiv`);

                setIsLoading(true);

                // Faire une requête vers la route de connexion et faire la redirection si c'est réussie avec un delay
                const searchRes = await axios.post('http://localhost:3000/api/auth/findUser', JSON.stringify({type: userType, fields: {mail: infos.mail, password: infos.password}}), {
                    validateStatus: (status: number): boolean => { return status >= 200 }
                }); 

                if(searchRes.status === 500) {
                    setIsLoading(false);
                    setError2(true);
                }
                else if(searchRes.status === 404) {
                    setIsLoading(false);
                    setError1(true);
                }
                else if(searchRes.status === 200) {
                    setIsLoading(false);
                    setSuccess(true);
                    // Un petit delay pour permettre la lecture du message de succès avant la redirection
                    setTimeout(() => {
                        setIsLoading(true);
                    }, 1000);

                    dispatch(login(searchRes.data));

                    setTimeout(() => {
                        setIsLoading(false);
                        router.push('/userpage');
                    }, 2000);
                }
            }
            else {

                // Je le redirige vers le haut de la page pour qu'il puisse voir les messages
                router.push(`/auth/signUp/${userType}/#formDiv`);

                setIsLoading(true);

                const lastName = formData.get("nom");
                const firstName = formData.get("prenom");
                const phone = formData.get("telephone");

                const infos: UserFetched = {type: userType, lastName, firstName, mail, password, phone};

                if(userType === "pat") {
                    infos.region = formData.get("region");
                }
                else {

                    infos.hospital = formData.get("hospital");

                    if(userType === "sec") {
                        infos.medID = formData.get("medID");
                    }
                    else {

                        // Génération d'un medID utilisé par la secrétaire.
                        const newId = generateUniqueId();
                        infos.medID = newId;

                        infos.speciality = formData.get("speciality");

                        const male = Boolean(formData.get("genderM"));
                        infos.gender = (male)? "male" : "female";
                    }
                }

                // Faire une requête pour ajouter l'utilisateur et le rediriger si c'est réussi
                const searchRes = await axios.post('http://localhost:3000/api/auth/findUser', JSON.stringify({type: userType, fields: {mail: infos.mail}}), {
                    validateStatus: (status: number): boolean => { return status >= 200 }
                });

                if(searchRes.status === 500) {
                    setIsLoading(false);
                    setError2(true);
                }
                else if(searchRes.status === 200) {
                    setIsLoading(false);
                    setError3(true);
                }
                else if(searchRes.status === 404) {
                    const signUpRes = await axios.post('http://localhost:3000/api/auth/addUser', JSON.stringify(infos), {
                        validateStatus: (status: number): boolean => { return status >= 200 }
                    });

                    if(signUpRes.status === 500) {
                        setIsLoading(false);
                        setError2(true);
                    }

                    else if(signUpRes.status === 200) {
                        setIsLoading(false);
                        setSuccess(true);
                        // Un petit delay pour permettre la lecture du message de succès avant la redirection
                        setTimeout(() => {
                            setIsLoading(true);
                        }, 1000);

                        dispatch(login(infos));

                        setTimeout(() => {
                            setIsLoading(false);
                            router.push('/userpage');
                        }, 2000);
                    }

                }

            }
        } catch(error) {
            console.log(error);
            setIsLoading(false);
            setError2(true);
        }
    }

    return (
        <>
            <Brand />
            <form id = {ID} onSubmit={handleSubmit}>
                <FormTitle>{(Type === "login")? "Se connecter" : "Créer un compte"}</FormTitle>
                <div id="formDiv" className="flex flex-col m-auto" style={{maxWidth: '400px'}}>
                    {isLoading && <Loader color="#36d7b7" size={40} />}
                    {error1 && !error2 && !success && <ErrorAlert>Veuillez entrer des informations valides ou vérifiez que vous êtes effectivement un {(userType === "pat")? "patient" : (userType === "sec")? "secrétaire" : "médecin"}!</ErrorAlert>}
                    {success && !error1 && !error2 && <SuccessAlert>{(Type === "login")? "Connexion réussie!" : "Inscription réussie!"}</SuccessAlert>}
                    {error2 && !error1 && !success && <ErrorAlert>Une erreur interne est survenue. Veuillez réessayer.</ErrorAlert>}
                    {error3 && !error1 && !success && <ErrorAlert>Un tel utilisateur existe déjà! Veuillez vous connecter ou changer d&apos;informations!</ErrorAlert>}
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