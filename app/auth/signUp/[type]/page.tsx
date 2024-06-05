"use client"

import Form from "@/components/authentification/Form";
import Input from "@/components/authentification/Input";
import ErrorAlert from "@/components/ErrorAlert";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";



function verifyPassword(password : string) {
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/g;
    return ((pattern.test(password)) || (password == ''))
}


function SignUp() {
    const [gender, setGender] = useState({male: true, female: false});
    const [error, setError] = useState(0);
    const [password, setPassword] = useState('');


    useEffect(() => {
        const num = (verifyPassword(password))? 0 : 1;
        setError(num);
    }, [password]);


    const params = useParams();
    const type = params.type;
    const myType = (typeof type !== "string")? "pat" : type;

    return(
        <Form Type="signup" ID = "signUpForm" userType={myType}>
            <Input Type="text" Placeholder="Nom" Label="Nom" ID="nom" />
            <Input Type="text" Placeholder="Prénom" Label="Prénom" ID="prenom" />
            {type === "med" && 
            <div>
                <label className="my-3">Sexe</label>
                <div className="grid grid-cols-2">
                    <label htmlFor = "male" className="flex items-center justify-center col-span-1 my-3"><input id = "male" type = "radio" name = "genderM" value = "male" checked = {gender.male} onClick = {() => {setGender({male: true, female: false})}} /> Masculin</label>
                    <label htmlFor = "female" className="flex items-center justify-center col-span-1 my-3"><input id = "female" type = "radio" name = "genderF" value = "female" checked = {gender.female} onClick = {() => {setGender({male: false, female: true})}} /> Féminin</label>
                </div>
            </div>} {/* Mettre ici les radio pour choisir le sexe si c'est un médecin */}
            <Input Type="email" Placeholder="Adresse e-mail" Label="Email" ID="mail" />
            <br />
            {/* Au cas où le mot de passe n'est pas au format valide, le message d'erreur apparait. */}
            {error === 1 && 
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
            <label htmlFor = "password" className="my-3">Mot de passe</label>
            <input id="password" placeholder="Mot de passe" required type="password" className="pl-4 h-12 rounded-lg border-2 border-solid border-black" value={password} onChange={(ev) => {setPassword(ev.target.value); }} />
            
        </Form>
    );
}


export default SignUp;