import React, { useState, useContext, useEffect, useRef } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './Login.css'
import { getUser } from '../../authenticationService/token'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/userContext'
import useModal from '../../hooks/useModal'
import ModalPage from '../modalPage/ModalPage'


const Login = () => {
    const [usernameEntered, setUsernameEntered] = useState('');
    const [passwordEntered, setPasswordEntered] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [titleModal, setTitleModal] = useState('')
    const [bodyModal, setBodyModal] = useState('')
    const { isShown, showModal, hideModal } = useModal()


    const usernameRef = useRef(null);

    const { userType, setUserType, sub, setUserId, setIsLoggedIn, isLoggedIn, setUserName } = useContext(UserContext);

    const navigate = useNavigate();

    const handleUsernameEntered = (e) => {
        setUsernameEntered(e.target.value);
    };

    const handlePasswordEntered = (e) => {
        setPasswordEntered(e.target.value);
    };

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFormValid(
                usernameEntered !== "" &&
                passwordEntered !== ""
            );
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [usernameEntered, passwordEntered]);

    const handleLogin = async () => {
        try {
            const { role, sub, given_name } = await getUser(usernameEntered, passwordEntered);
            window.localStorage.setItem("name", given_name);
            setUserName(given_name);
            switch (role) {
                case "admin":
                    setUserType(1);
                    window.localStorage.setItem("type", 1);
                    setUserId(sub);
                    window.localStorage.setItem("sub", sub);
                    break;
                case "superAdmin":
                    setUserType(2);
                    window.localStorage.setItem("type", 2);
                    setUserId(sub);
                    window.localStorage.setItem("sub", sub);
                    break;
                default:
                    setUserType(0);
                    window.localStorage.setItem("type", 0);
                    setUserId(sub);
                    window.localStorage.setItem("sub", sub);
                    break;
            };
            setErrorMessage('');
            setTitleModal("Ingreso exitoso");
            setBodyModal('')
            showModal();
            navigate('/');
            setIsLoggedIn(true);
        } catch (error) {
            window.localStorage.removeItem("type");
            window.localStorage.removeItem("sub");
            window.localStorage.removeItem("name");
            setUserType(null);
            setUserId(null);
            setIsLoggedIn(false);
            setPasswordEntered("");
            setUsernameEntered("");
            setTitleModal('Error en las credenciales. Por favor, inténtelo de nuevo.');
            setBodyModal('');
            showModal();
        }
    };

    const handleRegister = () => {
        navigate('/SignIn');
    };

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
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección de Mail</Form.Label>
                            <Form.Control
                                className='form-control-sm input-login'
                                type="text"
                                onChange={handleUsernameEntered}
                                value={usernameEntered}
                                ref={usernameRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                className='form-control-sm input-login'
                                type="password"
                                onChange={handlePasswordEntered}
                                value={passwordEntered}
                            />
                        </Form.Group>
                        <Button disabled={!formValid} onClick={handleLogin} variant='link' className='btn-login'>Acceder</Button>
                    </Col>
                </Row>
            </Container>
            <ModalPage
                title={titleModal}
                body={bodyModal}
                show={isShown}
                onClose={hideModal}
            />
        </>
    );
};

export default Login;