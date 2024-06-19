"use client"

import Image from "next/image";
import SideBar from "../userPages/SideBar";
import Brand from "./Brand";
import Profile from "../userPages/Profile";
import Problem from "../Problem";
import { useState } from "react";



function HeaderUsers ({UserType, SideBarFields, children} : {UserType: string, SideBarFields: any, children: React.ReactNode}) {

    const [showSide, setShowSide] = useState<boolean>(false);
    const [num, setNum] = useState<number>(5);


    const handleSideToggle = () => {
        setShowSide(!showSide);

        (num === 5)? setNum(4) : setNum(5);
    }



    return (
        <div>
            <header className="flex items-center justify-between" style = {{maxHeight: "100px", backgroundColor: 'var(--side_color)'}}>
                <Image src="/sidebar.png" alt="Sidebar Trigger" width={35} height={35} className="border-2 border-black p-2 m-2 rounded-lg cursor-pointer" onClick = {handleSideToggle} />
                <div className="hidden lg:block scale-75">
                    <Brand />
                </div>
                <Profile UserType={UserType} />
            </header>
            <main className="grid grid-cols-5 relative"  style = {{minHeight: '606px'}}>
                {showSide && <aside className="col-span-5 lg:col-span-1 z-30 absolute h-full w-full lg:relative"><SideBar Fields={SideBarFields} /></aside>}
                <div className={`col-span-5 lg:col-span-${num} p-3`}>{children}</div>
            </main>
            <footer style = {{backgroundColor: 'var(--side_color)'}}>
                <Problem />
            </footer>
        </div>
    )
}


export default HeaderUsers;