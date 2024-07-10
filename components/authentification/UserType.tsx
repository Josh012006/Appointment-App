import UserSelection from "@/components/authentification/UserSelection";
import Brand from "@/components/layout/Brand";




function UserType () {
    return(
        <>
            <Brand />
            <div className="flex flex-col items-center justify-center lg:flex-row" style={{minHeight: '300px', paddingTop: "auto", paddingBottom: 'auto'}}>
                <UserSelection link="/auth/login/pat/" images={["/users/patient.webp", "/users/patient1.webp"]}>Patient</UserSelection>
                <UserSelection link="/auth/login/sec/" images={["/users/secretaire.webp", "/users/secretaire1.webp"]}>Secrétaire</UserSelection>
                <UserSelection link="/auth/login/med/" images={["/users/medecin.webp", "/users/medecin1.webp"]}>Médecin</UserSelection>
            </div>
        </>
    )
}

export default UserType;