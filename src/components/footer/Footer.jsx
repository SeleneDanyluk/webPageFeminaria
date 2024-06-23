import React from 'react'
import './Footer.css'
import { Container, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

    const handleClick = (e) => {
        const path = e.target.getAttribute('to');
        navigate(path);
    };
    return (
        <div className='footer-container'>
            <Row>
                <Col>
                    <Container className='logo-img'>
                        <Image src="../src/data/images/Recurso 7.svg" fluid />
                    </Container>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <Nav defaultActiveKey="/home" className="flex-column">
                                <h6>Explorar</h6>
                                <Nav.Link onClick={handleClick} to='/'>Inicio</Nav.Link>
                                <Nav.Link onClick={handleClick} to='/libros'>Libros</Nav.Link>
                                <Nav.Link onClick={handleClick} to='/autoras'>Autoras</Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav defaultActiveKey="/home" className="flex-column">
                                <h6>Mi cuenta</h6>
                                <Nav.Link onClick={handleClick} to='/login'>Ingresar</Nav.Link>
                                <Nav.Link onClick={handleClick} to='/cart'>Carrito</Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav defaultActiveKey="/" className="flex-column">
                                <h6>Contacto</h6>
                                <Nav.Item>Email: feminaria@gmail.com</Nav.Item>
                                <Nav.Item>Teléfono: 341-556985</Nav.Item>
                                <Nav.Link href="/">Librerías</Nav.Link>
                                <Nav.Link href="/contacto">Redes</Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;