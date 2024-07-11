"use client"

import Form from "@/components/authentification/Form";
import Input from "@/components/authentification/Input";
import PhoneBlock from "@/components/authentification/PhoneBlock";
import Select from "@/components/authentification/Select";
import ErrorAlert from "@/components/ErrorAlert";
import generateHospitalTab from "@/server/utils/generateHospitalTab";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";



function verifyPassword(password : string) : boolean {
    let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/g;
    return ((pattern.test(password)) || (password === ''));
}

function verifyPasswordConfirmation(password: string, passwordConfirm: string) : boolean {
    return ((password === passwordConfirm) || (passwordConfirm === ''));
}


function SignUp() {
    const router = useRouter();

    useEffect   (() => {
        const user = Cookies.get('userHealthAppointment');
        if (user) {
            const type = JSON.parse(user).type;
            router.replace(`/userpage/${type}/calendar`);
        }
    }, [router]);



    const [gender, setGender] = useState({male: true, female: false});
    const [errorP, setErrorP] = useState(false);
    const [errorPC, setErrorPC] = useState(false);
    const [errorMedID, setErrorMedID] = useState(false);
    const [errorHospital, setHospitalError] = useState(false);
    

    const [hospitalTab, setHospitalTab] = useState<string[]>([]);

    const [IsValid, setIsValid] = useState(true);

    const [medIDValue, setMedIDValue] = useState('');


    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');




    // Gestion de la localisation
    const [location, setLocation] = useState('');
    const handleAutomaticLocation = () => {
        const successCallback = (position: GeolocationPosition) => {
            const latitude: number = position.coords.latitude;
            const longitude: number = position.coords.longitude;

            // Créez l'URL Google Maps
            const googleMapsUrl = `${latitude},${longitude}`;
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
        // Si la longueur de la valeur dépasse 10 ou est inférieur à 10 caractères montrer une erreur
        if (medIDValue.length !== 10 && medIDValue.length !== 0) {
            setErrorMedID(true);
        }
        else {
            setErrorMedID(false);
        }
    }, [medIDValue]);


    useEffect(() => {
        if(!errorP || !errorPC || !errorMedID || !errorHospital) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
    }, [errorP, errorPC, errorMedID, errorHospital]);

    useEffect(() => {
        async function fetchHospital() {
            const myTab = await generateHospitalTab();

            if(myTab === undefined || myTab.length === 0) {
                setHospitalError(true);
            }
            else {
                setHospitalTab(myTab);
            }
        }

        fetchHospital();
    }, [])


    const params = useParams();
    const type = params.type;
    const myType = (typeof type !== "string")? "pat" : type;

    return(
        <Form Type="signup" ID = "signUpForm" userType={myType} isValid = {IsValid}>
            <Input Type="text" Placeholder="Nom" Label="Nom" ID="nom" />
            <Input Type="text" Placeholder="Prénom" Label="Prénom" ID="prenom" />

            {type === "med" && 
            <div>
                <label className="my-3 font-bold">Sexe</label>
                <div className="grid grid-cols-2">
                    <label htmlFor = "male" className="flex items-center justify-center col-span-1 my-3"><input id = "male" type = "radio" name = "genderM" value = {`${gender.male}`} checked = {gender.male} onChange = {() => {setGender({male: true, female: false})}} /> Masculin</label>
                    <label htmlFor = "female" className="flex items-center justify-center col-span-1 my-3"><input id = "female" type = "radio" name = "genderF" value = {`${gender.female}`} checked = {gender.female} onChange = {() => {setGender({male: false, female: true})}} /> Féminin</label>
                </div>
            </div>} {/* Mettre ici les radio pour choisir le sexe si c'est un médecin */}

            <Input Type="email" Placeholder="Adresse e-mail" Label="Email" ID="mail" />
            <br />
            
            {/* Au cas où le mot de passe n'est pas au format valide, le message d'erreur apparait. */}
            {errorP && 
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
            <input id="password" name="password" placeholder="Mot de passe" required type="password" className="pl-4 h-12 rounded-lg border-2 border-solid border-black" value={password} onChange={(ev) => {setPassword(ev.target.value); }} />
            {errorPC && <ErrorAlert>Les deux mots de passe doivent être les mêmes</ErrorAlert>}
            <label htmlFor = "password-confirmation" className="my-3 font-bold">Confirmer le mot de passe</label>
            <input id="password-confirmation" name="password-confirmation" placeholder="Mot de passe" required type="password" className="pl-4 h-12 rounded-lg border-2 border-solid border-black" value={passwordConfirm} onChange={(ev) => {setPasswordConfirm(ev.target.value); }} />

            <br />

            {type === "pat" && <Select ID="region" Placeholder="Dakar par exemple" Label="Région" optionsTab={["Banjul", "Dakar", "Diourbel", "Kaolack", "Kayes", "Mbour", "Saint-Louis", "Thiès", "Touba", "Ziguinchor"]} />}
            {type === "pat" && 
                <div className="my-3 flex flex-col">
                    <label htmlFor = "location" className="my-3 font-bold">Votre localisation google maps</label>
                    <p className="italic mb-3">Cette localisation aidera lors de la recherche des hôpitaux. Veuillez donc prendre la localisation à votre domicile.</p>
                    <div className="grid grid-cols-5 items-center">
                        <input id="location" name="location" placeholder="Votre localisation google maps" required type="text" className="pl-4 h-12 rounded-lg border-2 border-solid border-black col-span-4" value={location} readOnly />
                        <div onClick={handleAutomaticLocation} style={{backgroundColor: 'var(--main_color)'}} className="text-white p-4 h-12 rounded-lg items-center flex justify-center ml-2 col-span-1 cursor-pointer"><i className="fa-solid fa-location-dot" aria-hidden="true"></i></div>
                    </div>
                </div>
            }
            {(type === "med" || type === "sec") && 
            <>
                {errorHospital && <ErrorAlert>Un problème est intervenu avec la recherche des hôpitaux! Veuillez rafraichir la page. Si le problème persiste, veuillez contacter le service client.</ErrorAlert>}
                <Select ID="hospital" Placeholder="Hôpital Principal de Dakar par exemple" Label="Etablissement médical" optionsTab={hospitalTab} />
            </>
            }
            
            {(type === "sec") && 
            <>
                {errorMedID && <ErrorAlert>Cet identifiant doit contenir exactement dix chiffres.</ErrorAlert>}
                <label htmlFor = "medID" className="my-3 font-bold">ID du Médecin</label>
                <input id="medID" name="medID" placeholder="0123456789" required type="text" className="pl-4 h-12 rounded-lg border-2 border-solid border-black" value={medIDValue} onChange={(ev) => {setMedIDValue(ev.target.value);}} />
            </>}

            {type === "med" && <Input Type="text" Placeholder="Médecine générale ou Pédiatrie-Psychiatrie" Label="Spécialité (s)" ID="speciality" />}

            {(type === "med" || type === "sec") && <br />}
            <PhoneBlock SetIsValid = {setIsValid} />
        </Form>
    );
}


export default SignUp;