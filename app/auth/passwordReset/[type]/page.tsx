"use client"

import Brand from "@/components/layout/Brand";
import FormTitle from "@/components/authentification/FormTitle";
import Input from "@/components/authentification/Input";
import Button from "@/components/authentification/Button";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";
import SuccessAlert from "@/components/SuccessAlert";


function PasswordReset () {
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();
    const params = useParams();
    const type = params.type;

    // Gérer la génération d'un nouveau mot de passe, le remplacement dans la base de données, 
    // l'envoi du mail et ne pas oublier de rediriger vers la page de login

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const mail = formData.get("mail");

        // Je vérifie si le mail existe dans ma base de donnée et si c'est le cas je change le password et j'envoie le mail
        // Sinon, je montre une erreur et je demande me montrer un mail valide
        // Tout ca se fait du côté serveur
        const infos = { type, mail };

        // Faire une requête update

        // Si la répone est okay je fait un delay et j'affiche un message de succès
        alert(`Email sent to ${mail}! Check it!`);
        router.push(`/auth/login/${type}`);
    }

    return(
        <>
            <Brand />
            <form id="passwordReset" onSubmit={handleSubmit}>
                <FormTitle>Mot de passe oublié</FormTitle>
                <div className="flex flex-col m-auto" style={{maxWidth: '400px'}}>
                    <p className="mt-2">Veuillez entrer votre adresse mail. Un message vous sera envoyé avec un nouveau mot de passe temporaire.</p>
                    <p className="mt-2">Utilisez le pour vous connecter et n&apos;oubliez pas de le modifier dans votre profil.</p>
                    {error1 && <ErrorAlert>Aucun utilisateur avec un tel email! Veuillez entrer un mail valide ou vérifiez que vous êtes effectivement un {(type === "pat")? "patient" : (type === "sec")? "secrétaire" : "médecin"}!</ErrorAlert>}
                    {error2 && <ErrorAlert>Une erreur est survenue. Veuillez réessayer.</ErrorAlert>}
                    {success && <SuccessAlert>Email envoyé avec succès!</SuccessAlert>}
                    <Input Type="email" Placeholder="Adresse e-mail" Label="Email" ID="mail" />
                    <Button type="submit" Form="passwordReset">Envoyer le code</Button>
                </div>
            </form>
        </>
    )
};

export default PasswordReset;