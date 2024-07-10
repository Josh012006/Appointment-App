
import HeaderUsers from "@/components/layout/HeaderUsers";





export default function MedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <HeaderUsers SideBarFields={{Calendrier: '/userpage/med/calendar'}} UserType="med">
                {children}
            </HeaderUsers>
        </>
    );
}
