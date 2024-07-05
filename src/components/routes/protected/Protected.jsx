import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import UserContext from '../../../context/userContext'
import { useNavigate } from "react-router-dom";

const Protected = ({ children, requiredUserType }) => {
    const navigate = useNavigate();
    const { isLoggedIn, userType} = useContext(UserContext);

    const messageContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px', 
        textAlign: 'center',
    };

    if (!isLoggedIn) {
        return (
            <Container style={messageContainerStyle}>
                <h4>Parece que aún no iniciaste sesión. Accede para poder ver tu carrito.</h4>
                <Button variant='secondary' onClick={() => navigate('/login')}>Acceder</Button>
            </Container>
        );
    } else if (userType !== requiredUserType) {
        return (
            <Container style={messageContainerStyle}>
                <h4>No tienes los permisos suficientes para acceder a esta sección.</h4>
                <Button variant='secondary' onClick={() => navigate('/dashboard')}>Ir al Dashboard</Button>
            </Container>
        );
    }

    return (
        <>
            {children}
        </>
    );
};


export default Protected;