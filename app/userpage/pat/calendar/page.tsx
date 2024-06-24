"use client"

import MyCalendar from '@/components/userPages/MyCalendar';
import React, { useEffect } from 'react';


function PatCalendar() {

    const events = [
        {
            id: '0',
            title: 'Meeting my beloved',
            start: new Date(2024, 5, 20, 10, 0), // 20th June 2024, 10:00 AM
            end: new Date(2024, 5, 20, 12, 0),   // 20th June 2024, 12:00 PM
        },
        {
            id: '1',
            title: 'Lunch Break',
            start: new Date(2024, 5, 26, 13, 0), // 20th June 2024, 1:00 PM
            end: new Date(2024, 5, 26, 14, 0),   // 20th June 2024, 2:00 PM
        },
        {
            id: '2',
            title: 'Appointment with Dr. House',
            start: new Date(2024, 5, 28, 13, 0), // 20th June 2024, 1:00 PM
            end: new Date(2024, 5, 28, 14, 0),   // 20th June 2024, 2:00 PM
        },
    ];



    // Gestion du popup lors de la sélection d'un événement
    const [showPopup, setShowPopup] = React.useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = React.useState<any>(null);

    const handleClosing = () => {  
        setShowPopup(false);
        setSelectedEvent(null);
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    return (
        <>
            {showPopup && <div className='absolute flex justify-center items-center w-full h-full z-50' style={{backgroundColor: 'rgba(100, 116, 139, 0.7)'}}>
                <div className='rounded-lg border p-4 bg-white w-4/5 lg:w-1/3 h-96'>
                    <i className="fa-solid fa-xmark cursor-pointer" onClick={handleClosing} aria-hidden="true"></i>
                    <h1 className="text-2xl font-bold text-center">{selectedEvent.title}</h1>
                    <p className="text-center">{selectedEvent.start.toLocaleDateString('fr-FR', options)}</p>
                    <p className="text-center">{selectedEvent.place}</p>
                </div>
            </div>}
            <div>
                <h1 className="mx-auto text-2xl font-bold text-center">Mon Calendrier</h1>
                <MyCalendar Events={events} SetPopup={setShowPopup} eventPop={selectedEvent} SetSelected = {setSelectedEvent} />
            </div>
        </>
    )
}


export default PatCalendar;