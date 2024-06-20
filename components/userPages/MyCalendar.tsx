'use client'

import React, { useCallback, useState } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


const events = [
    {
        title: 'Meeting my beloved',
        start: new Date(2024, 5, 20, 10, 0), // 20th June 2024, 10:00 AM
        end: new Date(2024, 5, 20, 12, 0),   // 20th June 2024, 12:00 PM
    },
    {
        title: 'Lunch Break',
        start: new Date(2024, 5, 20, 13, 0), // 20th June 2024, 1:00 PM
        end: new Date(2024, 5, 20, 14, 0),   // 20th June 2024, 2:00 PM
    },
];

function MyCalendar() {

    const [view, setView] = useState<View | undefined>('month');
    const [currentDate, setCurrentDate] = useState(new Date());

    const onView = useCallback((newView: any) => setView(newView), [setView]);

    const handleNavigate = (date: any, view: any, action: any) => {
        setCurrentDate(date);
    };

    return (
        <div style={{ height: '700px', width: '100%' }}>
            <Calendar
                localizer={localizer}
                events={events}
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
                popup
            />
        </div>
    );
}

export default MyCalendar;