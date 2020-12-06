import React from 'react';
import '../Styles/card.css'

export default function Card({ id, name, profile, planDays, planStores }) {

    name = name.split(' ');
    name = name.map(word => (word[0].toUpperCase() + word.slice(1).toLowerCase()));
    name = name.join(' ')

    const _dragStart = (e) => {
        const _name = document.getElementById(id).innerHTML;
        const info = _name + '*' + id
        e.dataTransfer.setData('text', info);
    }

    function generate(){
        var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
        var numero = (Math.random()*15).toFixed(0);
        return letras[numero];
    }
        
    function _colorHEX(){
        var coolor = "";
        for(var i=0;i<6;i++){
            coolor = coolor + generate() ;
        }
        return "#" + coolor;
    }

    return (
        <div className='card-container' draggable={true} onDragStart={(e) => _dragStart(e)}>
            <div className='card-data'>
                <div className='card-name' id={id}>{name}</div>
                <div className='card-profile'>{profile[0].toUpperCase() + profile.slice(1).toLowerCase()}</div>
                <div className='card-detail'>Dias planificados: {planDays}</div>
                <div className='card-detail'>Tiendas planificadas: {planStores}</div>
            </div>
            <div className='card-color' style={{ background: _colorHEX() }}></div>
        </div>
    )
}