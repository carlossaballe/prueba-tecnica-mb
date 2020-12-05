import React from 'react';
import '../Styles/card.css'

export default function Card({ id, name, profile, planDays, planStores }) {

    name = name.split(' ');
    name = name.map(word => ( word[0].toUpperCase() + word.slice(1).toLowerCase() ));
    name = name.join(' ')

    const _dragStart = (e) => {
        const _name = document.getElementById(id).innerHTML;
        e.dataTransfer.setData('text', _name);
    }

    const setColor = (id) => {
        let color= 'rgb(' + id*2 + ',' + id + ',' + id/4 + ')';

        return color;
    }

    return (
        <div className='card-container' draggable={true} onDragStart={(e)=>_dragStart(e)}>
            <div className='card-data'>
                <div className='card-name' id={id}>{name}</div>
                <div className='card-profile'>{profile[0].toUpperCase() + profile.slice(1).toLowerCase()}</div>
                <div className='card-detail'>Dias planificados: {planDays}</div>
                <div className='card-detail'>Tiendas planificadas: {planStores}</div>
            </div>
            <div className='card-color' style={{background: setColor(id)}}></div>
        </div>
    )
}