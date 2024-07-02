"use client"

import { useRouter } from "next/navigation"



function SuccessReservation() {

    const router = useRouter();


    return (
        <div className="mx-auto mt-24 flex flex-col w-4/5 lg:w-1/4">
            <p className="text-justify">
                Vous recevrez une <span className="font-bold">alerte email une fois que le statut de votre demande aura changé</span>! Vous pouvez suivre vos demandes dans l&apos;onglet 
                <span className="font-bold">Demandes</span>.
                <br />
                <br />
                Dans des cas particuliers, il se peut que vous soyez <span className="font-bold">contacté sur le numéro</span> que vous avez fourni à votre inscription sur le site. 
                <span className="font-bold">Ne manquez donc pas de vérifier vos mails et vos appels.</span>
            </p>
            <button type="button" className="text-white font-bold py-2 px-4 m-4 mx-auto rounded-lg" style={{backgroundColor: 'var(--main_color)'}} onClick={() => {router.push('/userpage/pat/requests')}}>C&apos;est compris!</button>
        </div>
    )
}


export default SuccessReservation;