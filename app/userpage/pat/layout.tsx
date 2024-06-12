
import Problem from "@/components/Problem";
import Profile from "@/components/userPages/Profile";
import ReduxProvider from "@/redux/Provider";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Health Appointment</title>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        <ReduxProvider>
          <>
            <Profile UserType="pat" />
            {children}
          </>
        </ReduxProvider>
      </body>
    </html>
  );
}
