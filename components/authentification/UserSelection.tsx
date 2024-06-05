{/* <a href = "/public/html/authentification/patient.html" target = "_self" class = "users"><img alt = "patient" src = "/public/media/patient/logo.png" class = "logos"><img alt = "patient" src = "/public/media/patient/logo1.png" class = "logos"> Patient</a> */}
import Link from "next/link";
import Image from "next/image";



function UserSelection({children, link, images} : {children: React.ReactNode, link: string, images: string[]}) {
    return(
        <Link href={link} target="_self" className="text-black no-underline font-bold m-5 p-3 rounded-2xl hover:rounded-3xl bg-white grid items-center justify-items-center grid-cols-10" style = {{border: '3px solid var(--main_color)', fontSize: '17px', width:'300px'}}>
            <Image src = {images[0]} alt = "userType" width="50" height="50" className="m-1 col-span-2" />
            <Image src = {images[1]} alt = "userType" width="50" height="50" className="m-1 col-span-2" />
            <span className="col-span-6 text-center">{children}</span>
        </Link>
    )
}


export default UserSelection;