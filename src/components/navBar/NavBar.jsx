import React from 'react'
import './NavBar.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";


const NavBar = () => {
    const navigate = useNavigate();

    const handleClick = (e) =>{
        const path = e.target.getAttribute('to');
        navigate(path);
    };

    return (
        <div>
            <Container fluid className='navbar-container-1'>
                <Container><Image src="../src/data/images/Recurso 8.svg" fluid /></Container>
                <Container className='icon-container'>
                    <Button className='nav-button' onClick={handleClick} to='/login'><Image className='svg-img' src="../src/data/images/user-solid.svg" fluid />Acceder</Button>
                    <Button className='nav-button'><Image className='svg-img' src="../src/data/images/cart-shopping-solid.svg" fluid />Carrito</Button>
                </Container>
            </Container>
            <Navbar expand="lg" className="navbar-container-2">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link className='beige-claro'onClick={handleClick} to='/'>Inicio</Nav.Link>
                            <Nav.Link className='beige-claro'onClick={handleClick} to='/libros'>Libros</Nav.Link>
                            <Nav.Link className='beige-claro'onClick={handleClick} to='/autoras'>Autoras</Nav.Link>
                            <Nav.Link className='beige-claro'onClick={handleClick} to='/contacto'>Contacto</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar