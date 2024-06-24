
import "./globals.css";
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
        <script src="https://kit.fontawesome.com/f1ed3a95ea.js" crossOrigin="anonymous" defer></script>
      </head>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
