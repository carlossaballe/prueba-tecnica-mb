import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCalendar, faEraser, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import '../Styles/calendar.css';

export default function Calendar({ year, month }) {

    const date = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const days = [...Array(firstDayOfMonth).fill(null), ...[...Array(daysInMonth).keys()].map(i => ({ day: i + 1 }))];

    const [events, setEvents] = useState([]);
    const [toSave, setToSave] = useState([]);
    const contextMenu = document.getElementById('custom-cm');

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
        
        e.preventDefault();

        if ($day) {

            const info = e.dataTransfer.getData('text').split('*');
            const data = info[0];
            const userId = info[1];

            for (let i = 0; i < events.length; i++) {

                if (events[i].title === data && events[i].date.day === parseInt($day) && events[i].date.month === parseInt(month)) {
                    return alert(`${data} ya está programado para esta fecha`)
                };
            }
            
            setEvents(events.concat([{
                title: data,
                date: {
                    datetime: "UTC DATE STRING",
                    month: parseInt(month),
                    day: parseInt($day),
                }
            }]));

            setToSave(toSave.concat([{
                idus: parseInt(userId),
                fecha: new Date(year, month-1, $day).toISOString().substring(0,10)
            }]))
        }
    }

    const _saveScheduled = () => {

        fetch("http://test.movilbox.co:888/test_mbox/test.php?metodo=guardar", {
            method: 'POST', 
            body: JSON.stringify(toSave),
        })
        .then(res => res.json())
        .then(response => {    
            console.log(response);
            alert('Guardado con éxito')
        })

    }

    const _showContextMenu = (show = true) =>{

        contextMenu.style.display = show ? 'block' : 'none';
    }

    const _handleClick = (e) => {
        e.preventDefault();
        contextMenu.style.left = e.clientX + 'px';
        contextMenu.style.top = e.clientY + 'px';
        _showContextMenu();
    }

    return (
        <div className="calendar-container">

                <div id="custom-cm" className="custom-cm">
                    <div><FontAwesomeIcon icon={faEdit}/> Editar</div>
                    <div><FontAwesomeIcon icon={faCalendar}/> Reprogramar</div>
                    <div><FontAwesomeIcon icon={faEraser}/> Eliminar</div>
                    <div onClick={()=>_showContextMenu(false)}> <FontAwesomeIcon icon={faWindowClose}/> Cerrar</div>
                </div>

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
                                i <= 3 && <div key={i} className="event" onClick={(event)=>_handleClick (event)}>{e.title}</div> 
                            )) : <div key={i} className="empty"> Sin programaciones </div>

                            return (
                                <div key={i} className={ day ? 'calendar-individual-day' : 'no-day'}>
                                    <div 
                                        className='data-container' 
                                        onDragOver={(e) => _dragOver(e)} 
                                        onDragLeave={(e) => _dragLeave(e)} 
                                        onDrop={(e) => _drop(e, day && day.day)}>
                                        {scheduled}
                                        {scheduled.length > 4 && <div>{(scheduled.length)-4} más</div>}
                                    </div>
                                    <div className='number-container'>
                                        {day ? day.day : ''}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='button-container'>
                    <button className='save-button' onClick={()=>_saveScheduled()}>Guardar</button>
                </div>
            </div>
        </div>
    )
}
