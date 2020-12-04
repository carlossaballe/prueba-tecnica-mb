import React from 'react';
import '../Styles/card.css'

export default function Card({ id, name, profile, planDays, planStores }) {

    return (
        <div className='card-container'>
            <div className='card-name'>{name}</div>
            <div className='card-profile'>{profile[0].toUpperCase() + profile.slice(1).toLowerCase()}</div>
            <div>Dias planificados: {planDays}</div>
            <div>Tiendas planificadas: {planStores}</div>
        </div>
    )

}