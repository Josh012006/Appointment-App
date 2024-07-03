
import HeaderUsers from "@/components/layout/HeaderUsers";





export default function PatientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <HeaderUsers SideBarFields={{Calendrier: '/userpage/sec/calendar', Demandes_de_consultation: '/userpage/sec/requests/pending'}} UserType="sec">
                {children}
            </HeaderUsers>
        </>
    );
}
