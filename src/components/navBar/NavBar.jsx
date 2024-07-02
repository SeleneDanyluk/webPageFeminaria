import React, { useContext } from 'react'
import './NavBar.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext"

const NavBar = () => {
    const navigate = useNavigate();
    const { userType, isLoggedIn, logout, userName } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <Container fluid className='navbar-container-1'>
                <Container><Image src="../src/data/images/Recurso 8.svg" fluid /></Container>
                <Container className='icon-container'>
                    {isLoggedIn && <p>¡Bienvenidx {userName}!</p>}
                    {isLoggedIn ? (
                        <Button className='nav-button' onClick={handleLogout}>
                            <Image className='svg-img' src="../src/data/images/user-solid.svg" fluid />Cerrar Sesión
                        </Button>
                    ) : (
                        <Button className='nav-button' onClick={() => navigate('/login')}>
                            <Image className='svg-img' src="../src/data/images/user-solid.svg" fluid />Acceder
                        </Button>
                    )}
                    {userType == 0 && <Button className='nav-button' onClick={() => navigate('/cart')}>
                        <Image className='svg-img' src="../src/data/images/cart-shopping-solid.svg" fluid />Carrito
                    </Button>}
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
                            <Nav.Link className='beige-claro' onClick={() => navigate('/')}>Inicio</Nav.Link>
                            <Nav.Link className='beige-claro' onClick={() => navigate('/libros')}>Libros</Nav.Link>
                            <Nav.Link className='beige-claro' onClick={() => navigate('/autoras')}>Autoras</Nav.Link>
                            <Nav.Link className='beige-claro' onClick={() => navigate('/contacto')}>Contacto</Nav.Link>
                            {userType === 2 && <Nav.Link className='beige-claro' onClick={() => navigate('/createadmin')}>Crear Admin</Nav.Link>}
                            {userType === 2 && <Nav.Link className='beige-claro' onClick={() => navigate('/usuarios')}>Usuarios</Nav.Link>}
                            {userType == 1 && <Nav.Link className='beige-claro'onClick={() => navigate('/newbook')}>Nuevo libro</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar