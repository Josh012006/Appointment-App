
import HeaderUsers from "@/components/layout/HeaderUsers";





export default function PatientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <HeaderUsers SideBarFields={{Calendrier: '/userpage/pat/calendar', Historique_médical:'/userpage/pat/history', Réserver_une_consultation: '/userpage/pat/reservation', Mes_demandes: '/userpage/pat/requests'}} UserType="pat">
                {children}
            </HeaderUsers>
        </>
    );
}
