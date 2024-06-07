"use client"

import Form from "@/components/authentification/Form";
import Input from "@/components/authentification/Input";
import PhoneBlock from "@/components/authentification/PhoneBlock";
import Select from "@/components/authentification/Select";
import ErrorAlert from "@/components/ErrorAlert";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";



function verifyPassword(password : string) : boolean {
    let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/g;
    return ((pattern.test(password)) || (password === ''));
}

function verifyPasswordConfirmation(password: string, passwordConfirm: string) : boolean {
    return ((password === passwordConfirm) || (passwordConfirm === ''));
}


function SignUp() {
    const [gender, setGender] = useState({male: true, female: false});
    const [errorP, setErrorP] = useState(false);
    const [errorPC, setErrorPC] = useState(false);
    const [errorMedID, setErrorMedID] = useState(false);
    const [password, setPassword] = useState('');

    const [IsValid, setIsValid] = useState(true);

    const [medIDValue, setMedIDValue] = useState('');

    const [passwordConfirm, setPasswordConfirm] = useState('');


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
        if(!errorP || !errorPC || !errorMedID) {
            setIsValid(false);
        }
        else {
            setIsValid(true);
        }
    }, [errorP, errorPC, errorMedID]);


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
            {(type === "med" || type === "sec") && <Select ID="hospital" Placeholder="Hôpital Principal de Dakar par exemple" Label="Etablissement médical" optionsTab={["Banjul", "Dakar", "Diourbel", "Kaolack", "Kayes", "Mbour", "Saint-Louis", "Thiès", "Touba", "Ziguinchor"]} />}
            
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