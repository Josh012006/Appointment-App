"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import ErrorAlert from "../ErrorAlert";

function PhoneBlock({ SetIsValid }: { SetIsValid: (b: boolean) => void }) {
    const [phone, setPhone] = useState('');
    const [errorPhone, setErrorPhone] = useState(false);

    useEffect(() => {
        const formatPhoneNumber = (phoneNumber: string) => {
            // Nettoie le numéro de téléphone de tout caractère non numérique
            let cleaned = phoneNumber.replace(/\D/g, '');
            // Limite la longueur à 9 chiffres (suffisant pour le format 2 3 2 2)
            cleaned = cleaned.slice(0, 9);
            // Applique le formatage
            let formatted = cleaned;
            if (cleaned.length > 2) {
                formatted = cleaned.slice(0, 2) + ' ' + cleaned.slice(2);
            }
            if (cleaned.length > 5) {
                formatted = cleaned.slice(0, 2) + ' ' + cleaned.slice(2, 5) + ' ' + cleaned.slice(5);
            }
            if (cleaned.length > 7) {
                formatted = cleaned.slice(0, 2) + ' ' + cleaned.slice(2, 5) + ' ' + cleaned.slice(5, 7) + ' ' + cleaned.slice(7);
            }
            return formatted;
        };

        const formattedPhone = formatPhoneNumber(phone);
        if (phone !== formattedPhone) {
            setPhone(formattedPhone);
        }
    }, [phone]);

    useEffect(() => {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length !== 9 && cleaned.length !== 0) {
            setErrorPhone(true);
        } else {
            setErrorPhone(false);
        }
    }, [phone]);

    useEffect(() => {
        SetIsValid(!errorPhone);
    }, [errorPhone, SetIsValid]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setPhone(input);
    };

    return (
        <>
            {errorPhone && <ErrorAlert>Entrez un numéro de téléphone valide!</ErrorAlert>}
            <label htmlFor="telephone" className="my-3 font-bold">Téléphone</label>
            <div className="grid grid-cols-10 items-center">
                <span className="flex items-center justify-center col-span-3 h-12 bg-white px-1 mr-2 border-2 border-black rounded-lg">
                    <Image src="/auth/flag.png" alt="countryFlag" width="32" height="32" className="mr-1" />
                    <span>+221</span>
                </span>
                <input
                    className="col-span-7 pl-4 h-12 rounded-lg border-2 border-solid border-black"
                    name="telephone"
                    id="telephone"
                    type="tel"
                    required
                    placeholder="78 200 50 60"
                    value={phone}
                    onChange={handleInputChange}
                />
            </div>
        </>
    );
}

export default PhoneBlock;
