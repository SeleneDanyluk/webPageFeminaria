import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import UserContext from '../../../context/userContext'
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(UserContext);

    return (
        <>
            {isLoggedIn ? children : <Container>
                <h4>Parece que aún no iniciaste sesión. Accede para poder ver tu carrito</h4>
                <Button variant='info' onClick={() => navigate('/login')}>Acceder</Button>
                </Container>}
        </>
    );
};



export default Protected;