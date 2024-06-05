import UserSelection from "@/components/authentification/UserSelection";
import Brand from "@/components/layout/Brand";




function UserType () {
    return(
        <>
            <Brand />
            <div className="flex flex-col items-center justify-center lg:flex-row" style={{minHeight: '300px', paddingTop: "auto", paddingBottom: 'auto'}}>
                <UserSelection link="/auth/login/pat/" images={["/users/patient.png", "/users/patient1.png"]}>Patient</UserSelection>
                <UserSelection link="/auth/login/sec/" images={["/users/secretaire.png", "/users/secretaire1.png"]}>Secrétaire</UserSelection>
                <UserSelection link="/auth/login/med/" images={["/users/medecin.png", "/users/medecin1.png"]}>Médecin</UserSelection>
            </div>
        </>
    )
}

export default UserType;