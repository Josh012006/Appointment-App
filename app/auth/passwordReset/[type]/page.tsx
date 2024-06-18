"use client"

import Brand from "@/components/layout/Brand";
import FormTitle from "@/components/authentification/FormTitle";
import Input from "@/components/authentification/Input";
import Button from "@/components/authentification/Button";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import ErrorAlert from "@/components/ErrorAlert";
import SuccessAlert from "@/components/SuccessAlert";

import axios from "axios";

import Loader from "@/components/Loader";

import Link from "next/link";


function PasswordReset () {
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [success, setSuccess] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const params = useParams();
    const type = params.type;

    // Gérer la génération d'un nouveau mot de passe, le remplacement dans la base de données, 
    // l'envoi du mail et ne pas oublier de rediriger vers la page de login

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {

        setSuccess(false);
        setError1(false);
        setError2(false);

        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const mail = formData.get("mail");

        setIsLoading(true);

        try {

            const infos = { type, mail };

            // Faire une requête resetPassword
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resetPassword`, JSON.stringify(infos), {
                validateStatus: (status: number): boolean => { return status >= 200 }
            });

            if(response.status === 404) {
                setIsLoading(false);
                setError1(true);
            }
            else if(response.status === 500) {
                setIsLoading(false);
                setError2(true);
            }
            else if(response.status === 200){
                setSuccess(true);
                setIsLoading(false);

                // Un petit delay pour permettre la lecture du message de succès avant la redirection
                setTimeout(() => {
                    setIsLoading(true);
                }, 1000);
                setTimeout(() => {
                    setIsLoading(false);
                    router.push(`/auth/login/${type}`);
                }, 2000);
            }         

        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setError2(true);
        }
        finally {
            form.reset();
        }
    }

    return(
        <>
            <Brand />
            <form id="passwordReset" onSubmit={handleSubmit}>
                <FormTitle>Mot de passe oublié</FormTitle>
                <div className="flex flex-col m-auto" style={{maxWidth: '400px'}}>
                    <p className="mt-2">Veuillez entrer votre adresse mail. Un message vous sera envoyé avec un nouveau mot de passe temporaire.</p>
                    <p className="mt-2">Utilisez le pour vous connecter et n&apos;oubliez pas de le modifier dans votre profil.</p>
                    {isLoading && <Loader color="#36d7b7" size={40} />}
                    {error1 && !error2 && !success && <ErrorAlert>Aucun utilisateur avec un tel email! Veuillez entrer un mail valide ou vérifiez que vous êtes effectivement un {(type === "pat")? "patient" : (type === "sec")? "secrétaire" : "médecin"}!</ErrorAlert>}
                    {error2 && !error1 && !success && <ErrorAlert>Oops! Une erreur est survenue. Veuillez réessayer.</ErrorAlert>}
                    {success && !error1 && !error2 && <SuccessAlert>Email envoyé avec succès!</SuccessAlert>}
                    <Input Type="email" Placeholder="Adresse e-mail" Label="Email" ID="mail" />
                    <Button type="submit" Form="passwordReset">Envoyer le message</Button>
                    <p className="mt-2 mb-8">Retourner à la page de connexion. <Link className = "colored no-underline" href={`/auth/login/${type}`}>Connectez-vous!</Link></p>
                </div>
            </form>
        </>
    )
};

export default PasswordReset;