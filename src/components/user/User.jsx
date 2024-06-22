import React from 'react';
import { Button } from 'react-bootstrap';
import './User.css';

const User = ({ name }) => {
    return (
        <div className="user-container">
            <p>Usuario: {name}</p>
            <Button variant="secondary" className="user-button">Modificar</Button>
            <Button variant="secondary" className="user-button">Eliminar</Button>
        </div>
    );
};

export default User;