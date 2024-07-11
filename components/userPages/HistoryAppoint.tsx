import Appointment from "@/interfaces/appointmentInterface";




function HistoryAppoint({event}: {event: Appointment}) {

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className='rounded-lg border shadow-md p-4 m-4 bg-white min-h-28 text-justify'>
            <h1 className="text-xl lg:text-2xl my-2 font-bold text-center">{event.title}</h1>
            <p className="my-1"><span className="font-bold">Date:</span> {new Date(event.start).toLocaleDateString('fr-FR', options)}</p>
            <p className="my-1"><span className="font-bold">Lieu:</span> {event.hospital}</p>
            <p className="my-1"><span className="font-bold">Description:</span> Rendez-vous avec {event.medName} pour {event.medSpecialty}.</p>
        </div>
    )
}



export default HistoryAppoint;