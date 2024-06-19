import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; // Añadimos Form y Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faPinterest } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
    return (
        <Container>
            <h1 style={{ color: 'purple' }}>Contacto</h1>

            <Row>
                <Col>
                    <h4><strong>Correo</strong></h4>
                    <p>feminaria@gmail.com</p>
                </Col>
                <Col>
                    <h4><strong>Teléfono</strong></h4>
                    <p>+3415883893</p>
                </Col>
                <Col>
                    <h4><strong>Redes</strong></h4>
                    <a href="https://wa.me/tunumerodetelefono" style={{ color: 'purple', marginRight: '10px' }}>
                        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                    </a>
                    <a href="https://facebook.com/tupagina" style={{ color: 'purple', marginRight: '10px' }}>
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                    <a href="https://pinterest.com/tuperfil" style={{ color: 'purple', marginRight: '10px' }}>
                        <FontAwesomeIcon icon={faPinterest} size="lg" />
                    </a>
                </Col>
            </Row>

            <hr style={{ borderTop: '2px solid purple', margin: '40px 0'  }} />

            <h2 style={{ color: 'purple' }}>Mapa</h2>

            <div style={{ height: '400px', width: '100%'}}>
            {<iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53562.69080207667!2d-60.69435828870238!3d-32.959769138893954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab17bd4857db%3A0xc105713fc7bc2552!2sC%C3%BAspide%20Libros!5e0!3m2!1ses-419!2sar!4v1715734083044!5m2!1ses-419!2sar"
            width="600"
            height="380"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
            ></iframe>}
            </div>

            <hr style={{ borderTop: '2px solid purple', margin: '40px 0' }} />

            <h2 style={{ color: 'black', fontWeight: 'bold' }}>Formulario de Contacto</h2>
            <Form style={{ margin: '40px 0' }}></Form>
            <Form>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa tu nombre" style={{ backgroundColor: 'pink' }} />
                </Form.Group>

                <Form.Group controlId="formCorreo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" placeholder="Ingresa tu correo electrónico" style={{ backgroundColor: 'pink' }} />
                </Form.Group>

                <Form.Group controlId="formTexto">
                    <Form.Label>Descripción / Texto</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Ingresa tu mensaje" style={{ backgroundColor: 'pink' }} />
                </Form.Group>
                <br />
                <br />
                <Button variant="primary" type="submit" style={{backgroundColor: 'purple'}}>
                    Enviar
                </Button>
            </Form>
        </Container>
    );
};

export default Contact;
