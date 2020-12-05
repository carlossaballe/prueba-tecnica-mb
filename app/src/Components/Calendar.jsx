//import React, { useEffect, useState } from 'react';
import '../Styles/calendar.css'


//         fetch("http://test.movilbox.co:888/test_mbox/test.php?metodo=periodos")
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 setMonths(data)
//             });
//     }, []);

const events = [
    {
        title: "This here is the first event of the month",
        date: {
            datetime: "UTC DATE STRING",
            month: 1,
            day: 15,
        },
    },
    {
        title: "Here's one for February",
        date: {
            datetime: "UTC DATE STRING",
            month: 2,
            day: 8,
        },
    },
    {
        title: "A new event",
        date: {
            datetime: "UTC DATE STRING",
            month: 1,
            day: 31,
        },
    },
    {
        title: "Another event",
        date: {
            datetime: "UTC DATE STRING",
            month: 1,
            day: 31,
        },
    },
]

export default function Calendar({ year, month }) {
    const date = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const days = [...Array(firstDayOfMonth).fill(null), ...[...Array(daysInMonth).keys()].map(i => ({ day: i + 1 }))];

    for (let i = 0; i < events.length; i++) {

        const event = events[i]
        const eventDay = days[event.date.day + firstDayOfMonth - 1];

        if (event.date.month !== parseInt(month)) {
            continue
        }

        if (!Array.isArray(eventDay.events)) {
            eventDay.events = []
        }

        eventDay.events.push(event)
    }

    const _dragOver = (e) => {
        e.preventDefault();
    }

    const _dragLeave = (e) => {
        e.preventDefault();
    }

    const _drop = (e) => {
        e.preventDefault();
        let data = e.dataTransfer.getData('text');
        var z = document.createElement('div'); // is a node
        z.innerHTML = data;
        e.target.appendChild(z)
        console.log(e.target);
    }

    return (
        <div className="calendar-container">

            <div>Titulo</div>
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
                            // const events = day && day.events ? day.events.map((e, i) => (
                            //     <div key={i} className="event">
                            //         {e.title}
                            //     </div>
                            // )) : 
                            //     <div key={i} className="empty">
                            //         Sin programación
                            //     </div>

                            return (
                                <div key={i} className="calendar-individual-day">
                                    <div className='data-container' onDragOver={(e) => _dragOver(e)} onDragLeave={(e) => _dragLeave(e)} onDrop={(e) => _drop(e)}>

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
