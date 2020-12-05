import React from 'react';
import '../Styles/card.css'

export default function Card({ id, name, profile, planDays, planStores }) {

    const _dragStart = (e) => {
        const _name = document.getElementById(id).innerHTML;
        console.log(_name);
        e.dataTransfer.setData('text', _name);
    }

    const _dragEnd = (e) => {}

    return (
        <div className='card-container' draggable={true} onDragStart={(e)=>_dragStart(e)} onDragEnd={(e)=>_dragEnd(e)}>
            <div className='card-data'>
                <div className='card-name' id={id}>{name}</div>
                <div className='card-profile'>{profile[0].toUpperCase() + profile.slice(1).toLowerCase()}</div>
                <div className='card-detail'>Dias planificados: {planDays}</div>
                <div className='card-detail'>Tiendas planificadas: {planStores}</div>
            </div>
            <div className='card-color'></div>
        </div>
    )
}