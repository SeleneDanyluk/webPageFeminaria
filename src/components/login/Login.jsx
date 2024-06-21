import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './Login.css'
import { getUser } from '../../auth/token'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/userContext'
import axios from 'axios';
import { useAuth } from '../../services/authentication/AuthenticationContext';


const Login = () => {
    const [usernameEntered, setUsernameEntered] = useState('');
    const [passwordEntered, setPasswordEntered] = useState('');
    const { login } = useAuth();

    const {userType, setUserType} = useContext(UserContext)

    const navigate = useNavigate();
    
    const handleUsernameEntered = (e) => {
        setUsernameEntered(e.target.value)
    };

    const handlePasswordEntered = (e) => {
        setPasswordEntered(e.target.value)
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('', {
                email: usernameEntered,
                password: passwordEntered,
                userType: 1
            });
            const { token } = response.data;
            setToken(token);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const handleLogin = async () => {
        const {role} = await getUser(usernameEntered, passwordEntered)
        console.log(role)
        if(role) alert("ingreso ok")
        else alert("error al ingresar")

        switch (role) {
            case "admin": setUserType(1)
            break;
            case "superAdmin": setUserType(2)
            break;
            default: setUserType(0)
            break;
        }
    }

    const handleRegister = () => {
        navigate('/SignIn')
    }

    return (
        <>
            <Container className='mt-3'>
                <Row className='d-flex justify-content-center mb-3 gx-0 m-5'>
                    <Col md={6}>
                        <h3>Crear nueva cuenta</h3>
                        <p className='w-75 m-0'>
                            Nuevos clientes
                        </p>
                        <p className='w-75 m-0'>
                            Registrarse en Feminaria es simple y seguro.
                            Te pediremos solo algunos datos para hacer el seguimiento de los pedidos y poder procesar tus compras más rápido.
                        </p>
                        <p className='w-75 m-0 mb-2'>
                            Además de sumar puntos extra!, podrás recibir ofertas, promociones e información de los últimos lanzamientos.
                        </p>
                        <Button onClick={handleRegister} variant='link' className='btn-login'>Registrarse</Button>
                    </Col>
                    <Col md={6}>
                        <h3>Ingresar</h3>
                        <Form.Group className="mb-3" controlId="id-title">
                            <Form.Label>Dirección de Mail</Form.Label>
                            <Form.Control
                                className='form-control-sm input-login'
                                type="text"
                                onChange={handleUsernameEntered}
                                value={usernameEntered}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="id-title">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                className='form-control-sm input-login'
                                type="text"
                                onChange={handlePasswordEntered}
                                value={passwordEntered}
                            />
                        </Form.Group>
                        <Button onClick={handleLogin} variant='link' className='btn-login'>Acceder</Button>

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;