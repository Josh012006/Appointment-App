


export default function ErrorAlert({children} : {children : React.ReactNode}) {
    return(
        <div className = "rounded-lg p-4 flex justify-center items-center bg-red-300 border-red-700 border-2 text-red-700">{children}</div>
    )
}