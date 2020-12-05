import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Form } from 'react-bootstrap';
import '../Styles/sidebar.css';

export default function Sidebar() {

    const [users, setUsers] = useState([]);
    const [input, setInput] = useState({ searchInput: "" });

    useEffect(() => {

        fetch("http://test.movilbox.co:888/test_mbox/test.php?metodo=usuarios")
            .then(response => response.json())
            .then(data => {
                setUsers(data)
            });

    }, []);
    
    const _handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    }

    const showedUsers = users.filter(user => user.nombre.toLowerCase().includes(input.searchInput.toLowerCase()))

    return (
        <div className='main-container'>

            <Form>
                <Form.Group>
                    <Form.Text className="sidebar-search-title">Buscar</Form.Text>
                    <Form.Control
                        type="text"
                        name="searchInput"
                        onChange={(event) => _handleInputChange(event)}
                    />
                    <Form.Text >
                        Escribe el nombre que deseas buscar.
                    </Form.Text>
                </Form.Group>
            </Form>
            {
                showedUsers.map((user, i) =>
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