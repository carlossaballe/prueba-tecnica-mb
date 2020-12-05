import React, { useState } from 'react';
import '../Styles/calendar.css'

export default function Calendar({ year, month }) {

    const date = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const days = [...Array(firstDayOfMonth).fill(null), ...[...Array(daysInMonth).keys()].map(i => ({ day: i + 1 }))];

    const [events, setEvents] = useState( [
        // {
        //     title: "first event of the month",
        //     date: {
        //         datetime: "UTC DATE STRING",
        //         month: 7,
        //         day: 15,
        //     },
        // },
    ])

    for (let i = 0; i < events.length; i++) {

        const event = events[i]
        const eventDay = days[event.date.day + firstDayOfMonth - 1];

        if (event.date.month !== parseInt(month)) continue;
        if (!Array.isArray(eventDay.events)) eventDay.events = [];

        eventDay.events.push(event);
    }

    const _dragOver  = (e) => e.preventDefault();
    const _dragLeave = (e) => e.preventDefault();

    const _drop = (e, $day) => {

        if ($day) {

            e.preventDefault();
            let data = e.dataTransfer.getData('text');
            // let div = document.createElement('div');
            // div.innerHTML = data;
            // e.target.appendChild(div);
    
            setEvents(events.concat([{
                title: data,
                date: {
                    datetime: "UTC DATE STRING",
                    month: parseInt(month),
                    day: parseInt($day),
                },
            }]))

        }

    }

    return (
        <div className="calendar-container">

            <div >
                <div className="calendar-header">
                    <div>Domingo</div>
                    <div>Lunes</div>
                    <div>Martes</div>
                    <div>Miércoles</div>
                    <div>Jueves</div>
                    <div>Viernes</div>
                    <div>Sábado</div>
                </div>

                <div className="calendar-body">
                    {
                        days.map((day, i) => {

                            const scheduled = day && day.events ?
                            day.events.map((e, i) => (
                                <div key={i} className="event"> {e.title} </div>
                            )) : <div key={i} className="empty"> Sin programación </div>

                            return (
                                <div key={i} className={ day ? 'calendar-individual-day' : 'no-day'}>
                                    <div 
                                        className='data-container' 
                                        onDragOver={(e) => _dragOver(e)} 
                                        onDragLeave={(e) => _dragLeave(e)} 
                                        onDrop={(e) => _drop(e, day && day.day)}>
                                        {scheduled}
                                    </div>
                                    <div className='number-container'>
                                        {day ? day.day : ''}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
