'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Event, EventProps } from 'react-big-calendar';

// Définissez l'interface de votre événement si nécessaire
interface MyEvent extends Event {
    type: string;
    id: string;
}


moment.locale('fr');
const localizer = momentLocalizer(moment);




function MyCalendar({Events, SetPopup, eventPop, SetSelected}: {Events: any[], SetPopup: any, eventPop: boolean, SetSelected: any}) {

    const [view, setView] = useState<View | undefined>('month');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);

    const onView = useCallback((newView: any) => setView(newView), [setView]);

    const handleNavigate = (date: any, view: any, action: any) => {
        setCurrentDate(date);
    };

    const eventPropGetter = (event: MyEvent, start: Date, end: Date, isSelected: Boolean) => {
        let backgroundColor = 'green'; // Couleur par défaut

        // Calcul de la différence en jours
        const currentDate = new Date();
        const startDate = new Date(start);
        const timeDiff = startDate.getTime() - currentDate.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
        if (dayDiff > 3) {
            backgroundColor = 'green';
        } else if (dayDiff > 0) {
            backgroundColor = 'orange';
        }
        else {
            backgroundColor = 'red';
        }

        const border = isSelected ? '3px dashed #000' : '0px';
        const animationClass = isSelected ? 'animate-border-dance' : 'none';
    
        return {
            className: `custom-event ${animationClass}`,
            style: {
                backgroundColor: backgroundColor,
                borderRadius: '5px',
                opacity: 0.8,
                color: 'white',
                border: border,
                display: 'block'
            },
        };
    };

    const handleSelectEvent = (event: any) => {
        setSelectedEvent(event);
        SetSelected(event);
        SetPopup(true);
    };






    return (
        <div style={{ height: '700px', width: '100%' }}>
            <Calendar
                localizer={localizer}
                events={Events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '700px' }}
                view = {view}
                onView={onView}
                messages={{
                    next: 'Suivant',
                    previous: 'Précédent',
                    today: 'Aujourd\'hui',
                    month: 'Mois',
                    week: 'Semaine',
                    day: 'Jour',
                    agenda: 'Agenda',
                }}
                date={currentDate}
                onNavigate={handleNavigate}
                eventPropGetter={(event, start, end, isSelected) => eventPropGetter(event, start, end, event === selectedEvent)}
                popup

                onSelectEvent={handleSelectEvent}
                
            />
        </div>
    );
}

export default MyCalendar;