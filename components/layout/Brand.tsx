import Image from "next/image";



export default function Brand () {
    return (
        <div className="flex flex-col items-center justify-center m-8">
            <Image src="/logo.png" alt="logo" width="32" height="32" />
            <h1 style={{fontSize:'20px', fontWeight: 'bold', margin: '8px'}}>Health Appointment</h1>
        </div>
    )
}
