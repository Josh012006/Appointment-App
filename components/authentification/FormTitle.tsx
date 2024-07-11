import React from "react";

export default function FormTitle ({children} : {children: React.ReactNode}) {
    return (
        <h1 id="formTitle" className="font-bold text-center text-2xl lg:text-4xl">{children}</h1>
    )
}