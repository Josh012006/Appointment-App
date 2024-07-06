"use client"

import PhoneBlock from "@/components/authentification/PhoneBlock";
import ErrorAlert from "@/components/ErrorAlert";
import Loader from "@/components/Loader";
import SuccessAlert from "@/components/SuccessAlert";
import ProfileInput from "@/components/userPages/ProfileInput";
import User from "@/interfaces/userInterface";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Button from "@/components/authentification/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hashPassword } from "@/server/utils/hashPassword";
import axios from "axios";
import { login } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";



function verifyPassword(password : string) : boolean {
    let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/g;
    return ((pattern.test(password)) || (password === ''));
}

function verifyPasswordConfirmation(password: string, passwordConfirm: string) : boolean {
    return ((password === passwordConfirm) || (passwordConfirm === ''));
}



function SecProfile() {

    const user = useAppSelector(state => state.auth.infos) as User;
    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();



    const [modifying, setModifying] = useState<boolean>(false);

    const [IsValid, setIsValid] = useState(true);


    const [errorP, setErrorP] = useState(false);
    const [errorPC, setErrorPC] = useState(false);

    const [mail, setMail] = useState<string>(user?.mail?? " ");
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');



    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        const bool1 : boolean = (verifyPassword(password))? false : true;
        setErrorP(bool1);
    }, [password]);

    useEffect(() => {
        const bool2 : boolean = (verifyPasswordConfirmation(password, passwordConfirm))? false : true;
        setErrorPC(bool2);
    }, [password, passwordConfirm]);

    useEffect(() => {
        if(!errorP || !errorPC) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
    }, [errorP, errorPC]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();


    
            if(!modifying) {
                setModifying(true);
                return;
            }
            else {
                if(IsValid) {
                    setIsLoading(true);
                    router.push(`/userpage/sec/profile/#profileForm`);
                    const form = e.target as HTMLFormElement;
                    const data = new FormData(form);

                    const mail = data.get('email') as string;
                    const password = data.get('password') as string;
                    const phone = data.get('telephone') as string;

                    const pt = await hashPassword(password);

                    setSuccess(false);
                    setError(false);

                    
                    const toSend = {
                        id: user?._id,
                        type: "sec",
                        newInfos: {
                            mail,
                            password: pt,
                            phone
                        }
                    }

                    const updateRes = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/updateUser`, JSON.stringify(toSend), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

                    if (updateRes.status === 500 || updateRes.status === 404) {
                        setIsLoading(false);
                        setError(true);
                    } else if (updateRes.status === 200) {
                        setIsLoading(false);
                        setSuccess(true);
                        dispatch(login(updateRes.data));
                        setTimeout(() => {
                            setSuccess(false);
                            setModifying(false);
                            location.reload();
                        }, 2000);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }


    return (
        <div className="p-3">
            <h1 className="mx-auto text-2xl font-bold text-center">Mon Profil</h1>
            <form onSubmit= {handleSubmit} className="flex flex-col m-auto w-4/5 lg:w-1/4" id="profileForm">
                {isLoading && <Loader color="#36d7b7" size={40} />}
                {success && !error && <SuccessAlert>Modifications réussies !</SuccessAlert>}
                {error && !success && <ErrorAlert>Une erreur interne est survenue. Veuillez réessayer.</ErrorAlert>}
                <ProfileInput ReadOnly={true} Type="text" Placeholder="Nom et Prénom" Label="Nom et Prénom" ID="nom" Value={user?.firstName + " " + user?.lastName} />
                <ProfileInput ReadOnly={!modifying} Type="email" Placeholder="Email" Label="Email" ID="email" Value={mail} OnChange={(e) => {setMail(e.target.value)}} />
                <br />

                {modifying && errorP && 
                <ErrorAlert>
                    Mot de passe invalide.<br />
                    Il doit contenir :<br />
                    - au moins 8 caractères<br />
                    - une lettre majuscule<br />
                    - une lettre minuscule<br />
                    - un chiffre<br />
                    - un caractère spécial (!@#$%^&*())<br />
                    Veuillez entrer un mot de passe valide.
                </ErrorAlert>}
                <label htmlFor = "password" className="my-3 font-bold">Mot de passe</label>
                {modifying ? <input id="password" name="password" placeholder="Mot de passe" required type="password" className="pl-4 h-12 rounded-lg border-2 border-solid border-black bg-white" value={password} onChange={(ev) => {setPassword(ev.target.value); }} /> : <input id="password" name="password" placeholder="Mot de passe" required type="password" className="pl-4 h-12 rounded-lg border-2 border-solid border-black" value="*************" readOnly style={{backgroundColor: 'var(--side_color)'}} />}
                {modifying && errorPC && <ErrorAlert>Les deux mots de passe doivent être les mêmes</ErrorAlert>}
                {modifying && <><label htmlFor = "password-confirmation" className="my-3 font-bold">Confirmer le mot de passe</label>
                <input id="password-confirmation" name="password-confirmation" placeholder="Mot de passe" required type="password" className="pl-4 h-12 rounded-lg border-2 border-solid border-black" value={passwordConfirm} onChange={(ev) => {setPasswordConfirm(ev.target.value); }} /></>}

                <br />

                <ProfileInput ReadOnly={true} Type="text" Placeholder="Hôpital" Label="Hôpital" ID="hospital" Value={user?.hospital?? ""} />
                <ProfileInput ReadOnly={true} Type="text" Placeholder="ID du médecin" Label="ID du médecin" ID="medID" Value={user?.medID?? ""} />

                <br />
                {!modifying && <ProfileInput ReadOnly={true} Type="tel" Placeholder="Votre numéro de téléphone" Label="Téléphone" ID="telephone" Value={user?.phone?? ""} />}
                {modifying && <PhoneBlock SetIsValid = {setIsValid} />}

                <br />

                {!modifying && <Button type="submit" Form="profileForm">Modifier les informations</Button>}
                {modifying && <>
                    <Button type="submit" Form="profileForm">Enregistrer les modifications</Button>
                    <p className="text-center my-3">ou</p>
                    <button type="button" style={{backgroundColor: 'var(--main_color)'}} className="text-white p-4 h-12 rounded-lg items-center flex justify-center mt-5" onClick={() => {setModifying(false)}}>Annuler les modifications</button>
                </>}
                <br />
            </form>
        </div>
    )
}


export default SecProfile;