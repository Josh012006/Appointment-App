"use client"

import Image from "next/image";
import SideBar from "../userPages/SideBar";
import Brand from "./Brand";
import Profile from "../userPages/Profile";
import Problem from "../Problem";
import { useState } from "react";



function HeaderUsers ({UserType, SideBarFields, children} : {UserType: string, SideBarFields: any, children: React.ReactNode}) {

    const [showSide, setShowSide] = useState<boolean>(false);


    const handleSideToggle = () => {
        setShowSide(!showSide);
    }



    return (
        <div>
            <header className="flex items-center justify-between" style = {{maxHeight: "100px", backgroundColor: 'var(--side_color)'}}>
                <Image src="/sidebar.png" alt="Sidebar Trigger" width={35} height={35} className="border-2 border-black p-2 m-2 rounded-lg cursor-pointer" onClick = {handleSideToggle} />
                <div className="hidden lg:block scale-75">
                    <Brand />
                </div>
                <Profile UserType={UserType} SetShowSide={setShowSide} />
            </header>
            <main className="grid grid-cols-5 relative"  style = {{minHeight: '606px'}}>
                {showSide && <div className="col-span-5 lg:col-span-1 z-30 absolute h-full w-full lg:w-auto lg:relative"><SideBar Fields={SideBarFields} Action={setShowSide} /></div>}
                <div className={`col-span-5 ${showSide ? 'lg:col-span-4' : 'lg:col-span-5'}`}>{children}</div>
            </main>
            <footer style = {{backgroundColor: 'var(--side_color)'}}>
                <Problem />
            </footer>
        </div>
    )
}


export default HeaderUsers;