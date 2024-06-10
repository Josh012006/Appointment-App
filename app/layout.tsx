// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Problem from "@/components/Problem";
import "./globals.css";
import ReduxProvider from "@/redux/Provider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

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
            {children}
            <Problem />
          </>
        </ReduxProvider>
      </body>
    </html>
  );
}
