
import HeaderUsers from "@/components/layout/HeaderUsers";
import Problem from "@/components/Problem";
import Profile from "@/components/userPages/Profile";
import ReduxProvider from "@/redux/Provider";




export default function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderUsers SideBarFields={{Calendrier: '/userpage/pat/calendar', Settings:'/'}} UserType="pat">
        {children}
      </HeaderUsers>
    </>
  );
}
