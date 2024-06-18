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
import { hashPassword, verifyPassword } from "@/server/utils/hashPassword";




export default function Form ({children, ID, Type, userType, isValid} : {children : React.ReactNode, ID: string, Type: "login" | "signup", userType: string, isValid: boolean}) {

    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [error4, setError4] = useState(false);
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
        e.preventDefault();
    
        setSuccess(false);
        setError1(false);
        setError2(false);
        setError3(false);
        setError4(false);
        setIsLoading(true);

        console.log(isValid);
    
        if (isValid) {
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const mail = formData.get("mail");
            const password = formData.get("password");
    
            try {
                if (Type === "login") {
                    await handleLogin({ mail, password });
                } else {
                    await handleSignUp({ formData, mail, password });
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setError2(true);
            }
        }
    };
    
    const handleLogin = async ({ mail, password } : {mail: FormDataEntryValue | null, password: FormDataEntryValue | null}) => {

        const infos = { type: userType, mail, password };
        router.push(`/auth/login/${userType}/#formDiv`);

        const searchRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/findUser`, JSON.stringify({ type: userType, fields: { mail: infos.mail } }), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });
    
        if (searchRes.status === 500) {
            setIsLoading(false);
            setError2(true);
        } else if (searchRes.status === 404) {
            setIsLoading(false);
            setError1(true);
        } else if (searchRes.status === 200) {
            const isEqual : boolean = await verifyPassword(infos.password, searchRes.data.password);

            if(!isEqual) {
                setIsLoading(false);
                setError1(true);
            }
            else {
                setIsLoading(false);
                setSuccess(true);
                dispatch(login(searchRes.data));
                setTimeout(() => {
                    setIsLoading(false);
                    router.push(`/userpage/${userType}`);
                }, 2000);
            }
        }
    };
    
    const handleSignUp = async ({ formData, mail, password } : {formData: FormData, mail: FormDataEntryValue | null, password: FormDataEntryValue | null}) => {
        router.push(`/auth/signUp/${userType}/#formDiv`);
        const lastName = formData.get("nom");
        const firstName = formData.get("prenom");
        const phone = formData.get("telephone");

        let pt = '';

        if ((password) === null) {
            pt = '';
            throw Error("Une erreur interne est survenue! Veuillez réessayer!");
        }
        else {
            pt = password.toString();
        }

        const testPassword = await hashPassword(pt);

        const infos: UserFetched = { type: userType, lastName, firstName, mail, password: testPassword, phone };
    
        if (userType === "pat") {
            infos.region = formData.get("region");
        } else {
            infos.hospital = formData.get("hospital");
            if (userType === "sec") {
                infos.medID = formData.get("medID");
            } else {
                const newId = generateUniqueId();
                infos.medID = newId;
                infos.speciality = formData.get("speciality");
                infos.gender = formData.get("genderM") ? "male" : "female";
            }
        }
    
        const searchRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/findUser`, JSON.stringify({ type: userType, fields: { mail: infos.mail } }), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });
    
        if (searchRes.status === 500) {
            setIsLoading(false);
            setError2(true);
        } else if (searchRes.status === 200) {
            setIsLoading(false);
            setError3(true);
        } else if (searchRes.status === 404) {
            if (userType === "sec") {
                const IDverification = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifyMed`, JSON.stringify({ id: infos.medID, hospital: infos.hospital }), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });
    
                if (IDverification.status === 500) {
                    setIsLoading(false);
                    setError2(true);
                    return;
                } else if (IDverification.status === 404) {
                    setIsLoading(false);
                    setError4(true);
                    return;
                }
            }
    
            const signUpRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/addUser`, JSON.stringify(infos), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });
    
            if (signUpRes.status === 500) {
                setIsLoading(false);
                setError2(true);
            } else if (signUpRes.status === 200) {
                setIsLoading(false);
                setSuccess(true);
                dispatch(login(infos));
                setTimeout(() => {
                    setIsLoading(false);
                    router.push(`/userpage/${userType}`);
                }, 2000);
            }
        }
    };

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
                    {error3 && !error1 && !success && <ErrorAlert>Un tel utilisateur existe déjà! Veuillez vous connecter, vérifier que vous êtes vraiment le type d&apos;utilisateur que vous avez choisi ou changer d&apos;informations!</ErrorAlert>}
                    {error4 && !success && <ErrorAlert>Assurez vous qu&apos;un médecin avec un tel medID travaille dans cet hôpital!</ErrorAlert>}
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