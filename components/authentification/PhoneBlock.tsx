"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import ErrorAlert from "../ErrorAlert";


function PhoneBlock ({SetIsValid} : {SetIsValid: (b : boolean) => void}) {
    const [phone, setPhone] = useState('');
    const [errorPhone, setErrorPhone] = useState(false);



    useEffect(() => {
        let phoneNumber = phone.replace(/\D/g, ''); // Supprime tous les caractères non numériques
        let formattedPhoneNumber = '';
        if (phoneNumber.length > 0) {
            formattedPhoneNumber += phoneNumber.substring(0, 2); // Ajoute le premier groupe de chiffres
            if (phoneNumber.length > 2) {
                formattedPhoneNumber += ' ' + phoneNumber.substring(2, 5); // Ajoute le deuxième groupe de chiffres
                if (phoneNumber.length > 5) {
                    formattedPhoneNumber += ' ' + phoneNumber.substring(5, 7); // Ajoute le troisième groupe de chiffres
                    if (phoneNumber.length > 7) {
                            formattedPhoneNumber += ' ' + phoneNumber.substring(7, 9); // Ajoute le quatrième groupe de chiffres
                    }
                }
            }
        }
        setPhone(formattedPhoneNumber.trim());

        // Si la longueur de la valeur inférieur à 12 caractères montrer une erreur
        if (phone.length < 12 && phone.length !== 0) {
            setErrorPhone(true);
        }
        else {
            setErrorPhone(false);
        }
    }, [phone]);


    useEffect(() => {
        if(errorPhone) {
            SetIsValid(false);
        }
        else {
            SetIsValid(true);
        }
    }, [errorPhone, SetIsValid]);
    

    return(
        <>
            {errorPhone && <ErrorAlert>Entrez un numéro de téléphone valide!</ErrorAlert>}
            <label htmlFor = "telephone" className="my-3 font-bold">Téléphone</label>
            <div className="grid grid-cols-10 items-center">
                <span className="flex items-center justify-center col-span-3 h-12 bg-white px-1 mr-2 border-2 border-black rounded-lg">
                    <Image src = "/auth/flag.png" alt = "countryFlag" width="32" height="32" className="mr-1" />
                    <span>+221</span>
                </span>
                <input className="col-span-7 pl-4 h-12 rounded-lg border-2 border-solid border-black" name="telephone" id = "telephone" type = "tel" required placeholder = "78 200 50 60" value= {phone} onChange={(e) => {if(phone.length <= 11) setPhone(e.target.value)}} />
            </div>
        </>
    );
}

export default PhoneBlock;