

export default function SuccessAlert({children} : {children : React.ReactNode}) {
    return(
        <div className = "rounded-lg p-4 mt-3 flex justify-center items-center bg-green-100 border-green-700 border-2 text-green-700">{children}</div>
    )
}