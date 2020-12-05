import React, {useEffect, useState} from 'react';
import Card from './Card';
import '../Styles/sidebar.css';

export default function Sidebar() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        fetch("http://test.movilbox.co:888/test_mbox/test.php?metodo=usuarios")
        .then(response => response.json())
        .then(data => {
            setUsers(data)
        });

    }, []);

    return (
        <div className='main-container'>
            <div>Buscar</div>
            {
                users.map((user, i) =>
                    <Card 
                        key={i}
                        id={user.idus}
                        name={user.nombre}
                        profile={user.perfil} 
                        planDays={user.dias_plani}
                        planStores={user.tiendas_plani}
                    />
                )
            }

        </div>
    )
}