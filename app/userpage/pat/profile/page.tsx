"use client"

import ProfileInput from "@/components/userPages/ProfileInput";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useState, useEffect } from "react";

import ErrorAlert from "@/components/ErrorAlert";
import Select from "@/components/authentification/Select";
import PhoneBlock from "@/components/authentification/PhoneBlock";
import Button from "@/components/authentification/Button";
import Loader from "@/components/Loader";
import SuccessAlert from "@/components/SuccessAlert";
import { hashPassword } from "@/server/utils/hashPassword";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { login } from "@/redux/features/authSlice";





function verifyPassword(password : string) : boolean {
    let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/g;
    return ((pattern.test(password)) || (password === ''));
}

function verifyPasswordConfirmation(password: string, passwordConfirm: string) : boolean {
    return ((password === passwordConfirm) || (passwordConfirm === ''));
}



function PatProfile () {
    const user = useAppSelector(state => state.auth.infos);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();



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



    // Gestion de la localisation
    const [userLocation, setLocation] = useState(user?.location?? '');
    const handleAutomaticLocation = () => {
        const successCallback = (position: GeolocationPosition) => {
            const latitude: number = position.coords.latitude;
            const longitude: number = position.coords.longitude;

            // Créez l'URL Google Maps
            const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            setLocation(googleMapsUrl);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback);
        }

        
    }




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



    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();


    
            if(!modifying) {
                setModifying(true);
                return;
            }
            else {
                if (IsValid) {
                    setIsLoading(true);
                    router.push(`/userpage/pat/profile/#profileForm`);

                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const mail = formData.get("email");
                    const password = formData.get("password");
                    const region = formData.get("region");
                    const userLocation = formData.get("location");
                    const phone = formData.get("telephone");

                    const pt  = await hashPassword(password as string);

                    setSuccess(false);
                    setError(false);

                    const toSend = {
                        id: user?._id,
                        type: "pat",
                        newInfos: {
                            mail,
                            password: pt,
                            region,
                            location: userLocation,
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



    return(
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

                {!modifying && <ProfileInput ReadOnly={true} Type="text" Placeholder="Dakar par exemple" Label="Région" ID="region" Value={user?.region?? ""} />}
                {modifying && <Select ID="region" Placeholder="Dakar par exemple" Label="Région" optionsTab={["Banjul", "Dakar", "Diourbel", "Kaolack", "Kayes", "Mbour", "Saint-Louis", "Thiès", "Touba", "Ziguinchor"]} />}
                {!modifying && <ProfileInput ReadOnly={true} Type="text" Placeholder="Localisation" Label="Votre localisation google maps" ID="location" Value={userLocation} />}
                {modifying && <div className="my-3 flex flex-col">
                    <label htmlFor = "location" className="my-3 font-bold">Votre localisation google maps</label>
                    <p className="italic mb-3">Cette localisation aidera lors de la recherche des hôpitaux. Veuillez donc donner ou prendre la localisation à votre domicile.</p>
                    <div className="grid grid-cols-5 items-center">
                        <input id="location" name="location" placeholder="Votre localisation google maps" required type="text" className="pl-4 h-12 rounded-lg border-2 border-solid border-black col-span-4" value={userLocation} onChange = {(ev) => {setLocation(ev.target.value)}} />
                        <div onClick={handleAutomaticLocation} style={{backgroundColor: 'var(--main_color)'}} className="text-white p-4 h-12 rounded-lg items-center flex justify-center ml-2 col-span-1 cursor-pointer"><i className="fa-solid fa-location-dot" aria-hidden="true"></i></div>
                    </div>
                </div>}

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
    );
}


export default PatProfile;