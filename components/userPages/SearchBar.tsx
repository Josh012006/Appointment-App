"use client"

import { useState } from "react";



function SearchBar({SetFilter, SetFilterOption, SetApply}: {SetFilter: (filter: string) => void, SetFilterOption: (filterOption: string) => void, SetApply: (apply: boolean) => void}) { 


    const [filter, setFilter] = useState<string>("");

    return (
        <div>
            <p className="text-justify indent-5 italic my-2"><span className="font-bold">NB:</span> Pour rechercher un hôpital, mettez uniquement son nom. Par exemple écrivez <span className="font-bold">Yoff</span> au lieu de <span className="font-bold">hôpital de Yoff</span>.</p>
            <div className="grid grid-cols-5 lg:mx-5">
                <select title="filterOptions" onChange={(e) => SetFilterOption(e.target.value)} className="border-2 border-gray-300 rounded-md p-2 h-12 col-span-5 lg:col-span-1">
                    <option value="hospital">Hôpital</option>
                    <option value="doctor">Médecin</option>
                    <option value="speciality">Spécialité</option>
                </select>
                <input type="text" placeholder="Rechercher..." id="filtre" className="border-2 border-gray-300 rounded-md p-2 h-12 col-span-5 lg:col-span-3" value={filter} onChange = {(e) => {setFilter(e.target.value); SetFilter(e.target.value)}} />
                <button onClick={() => SetApply(true)} className="col-span-5 lg:col-span-1 text-white rounded-md p-2 h-12" style={{backgroundColor: 'var(--main_color)'}}>Rechercher</button>
            </div>
        </div>
    )
}


export default SearchBar;