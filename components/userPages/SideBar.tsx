"use client"

import Field from "./Field";




function SideBar ({Fields}: {Fields: any}) {


    const handleClick = () => {};

    return (
        <div className="w-full h-full z-50 flex flex-col px-4 py-5" style = {{backgroundColor: 'var(--side_color)'}}>
            {Fields &&
                Object.keys(Fields).map((key) => (
                    <Field key={key} Name={key} Href={Fields[key]} OnClick={handleClick} />
                ))
            }
        </div>
    )
}


export default SideBar;