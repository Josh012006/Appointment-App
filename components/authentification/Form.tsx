import Brand from "../layout/Brand";
import Button from "./Button";
import FormTitle from "./FormTitle";
import Link from "next/link";


export default function Form ({children, ID, Type, userType} : {children : React.ReactNode, ID: string, Type: "login" | "signup", userType: string}) {

    // Gérer la soumission avec une requête
    const handleClick = () => {

    }

    return (
        <>
            <Brand />
            <form id = {ID}>
                <FormTitle>{(Type === "login")? "Se connecter" : "Créer un compte"}</FormTitle>
                <div className="flex flex-col m-auto" style={{maxWidth: '400px'}}>
                    <>
                        {children}
                    </>
                    <Button type="submit" Form={ID} OnClick = {handleClick}>{(Type === "login")? "Se connecter" : "S'inscrire"}</Button>
                    {(Type === "login")? 
                        <p>Vous n&apos;avez pas encore de compte ? <Link className = "colored no-underline" href={`/auth/signUp/${userType}`}>Inscrivez-vous!</Link> ou <Link className = "colored no-underline" href = "/auth/passwordReset">Mot de passe oublié ?</Link></p>:
                        <p>Vous avez déjà un compte ? <Link className = "colored no-underline" href={`/auth/login/${userType}`}>Connectez-vous!</Link></p>
                    }
                </div>
            </form>
        </>
    );
}