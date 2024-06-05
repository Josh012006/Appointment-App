import React from "react";

export default function FormTitle ({children} : {children: React.ReactNode}) {
    return (
        <h1 className="font-bold text-center" style={{fontSize: '2em'}}>{children}</h1>
    )
}