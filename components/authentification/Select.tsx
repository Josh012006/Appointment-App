"use client"

import { useEffect, useState } from "react";


function Select({ID, Placeholder, Label, optionsTab} : { ID: string, Placeholder: string, Label: string, optionsTab: string[]}) {
    const [choice, setChoice] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [OptionsTab, setOptionsTab] = useState<string[] | []>([]);

    useEffect(() => {
        if(choice === '') setOptionsTab(optionsTab);
        else {
            let regex = new RegExp(`^${choice}`,"i");
            setOptionsTab(optionsTab.filter(j => regex.test(j)));
        }
    }, [optionsTab, choice])

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        // Ajoutez un petit délai pour permettre la sélection d'un choix avant que le blur ne cache la div
        setTimeout(() => {
            setIsFocused(false);
        }, 1000);
    };

    return(
        <>
            <label htmlFor = {ID} className="my-3">{Label}</label>
            <div className="flex flex-col">
                <input id={ID} name={ID} placeholder={Placeholder} required type="text" className="pl-4 h-12 rounded-lg border-2 border-solid border-black" value={choice} onChange={(e) => {setChoice(e.target.value); setClicked(false);}} onFocus={handleFocus} onBlur={handleBlur} />
                {(!clicked) && isFocused && (OptionsTab.length !== 0) && <div className="bg-white relative border-2 border-black rounded-lg" style={{maxHeight: '300px', overflowY: 'auto'}}>{OptionsTab.map((option) => {return <option onClick={() => {setChoice(option); setClicked(true);}} className="m-0 border-b h-12 border-black p-3 relative cursor-pointer" key={option}>{option}</option>})}</div>}
            </div>
        </>
    );
}

export default Select;