import Link from "next/link";






function NavigButton() {
    return (
        <div className="flex flex-col lg:flex-row items-center m-3 justify-center">
            <Link href="/userpage/sec/requests/pending" className="m-4 p-2 text-white rounded-md" style={{backgroundColor: 'var(--main_color)'}}>Requêtes en attente</Link>   
            <Link href="/userpage/sec/requests/processed" className="m-4 p-2 text-white rounded-md" style={{backgroundColor: 'var(--main_color)'}}>Requêtes acceptées</Link>   
        </div>
    )
}



export default NavigButton;