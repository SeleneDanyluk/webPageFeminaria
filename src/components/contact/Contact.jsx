import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faPinterest } from '@fortawesome/free-brands-svg-icons';
import './Contact.css';
import ModalPage from '../modalPage/ModalPage';
import useModal from '../../hooks/useModal';

const Contact = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        texto: ''
    });

    const [titleModal, setTitleModal] = useState('');
    const [bodyModal, setBodyModal] = useState('');
    const { isShown, showModal, hideModal } = useModal();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setTitleModal('¡Gracias por contactarnos!');
            setBodyModal('Tu mensaje ha sido enviado exitosamente, pronto te contestaremos :)');
            showModal();
            setFormData({
                nombre: '',
                correo: '',
                texto: ''
            });
        }, 500);
    };

    return (
        <Container className="contact-container">
            <h1 className="contact-title">Contacto</h1>

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
                    <a href="https://wa.me/tunumerodetelefono" className="contact-icon">
                        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                    </a>
                    <a href="https://facebook.com/tupagina" className="contact-icon">
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                    <a href="https://pinterest.com/tuperfil" className="contact-icon">
                        <FontAwesomeIcon icon={faPinterest} size="lg" />
                    </a>
                </Col>
            </Row>

            <hr className="contact-divider" />

            <h2 className="contact-subtitle">Mapa</h2>

            <div className="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53562.69080207667!2d-60.69435828870238!3d-32.959769138893954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab17bd4857db%3A0xc105713fc7bc2552!2sC%C3%BAspide%20Libros!5e0!3m2!1ses-419!2sar!4v1715734083044!5m2!1ses-419!2sar"
                    width="600"
                    height="380"
                    className="map-iframe"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                ></iframe>
            </div>

            <hr className="contact-divider" />

            <h2 className="form-title">Formulario de Contacto</h2>
            <Form className="contact-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Ingresa tu nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Form.Group controlId="formCorreo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        type="email"
                        name="correo"
                        placeholder="Ingresa tu correo electrónico"
                        value={formData.correo}
                        onChange={handleChange}
                        className="form-control-custom"
                    />
                </Form.Group>

                <Form.Group controlId="formTexto">
                    <Form.Label>Descripción / Texto</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="texto"
                        placeholder="Ingresa tu mensaje"
                        value={formData.texto}
                        onChange={handleChange}
                        className="form-control-custom"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="contact-submit-btn">
                    Enviar
                </Button>
            </Form>

            <ModalPage 
                title={titleModal}
                body={bodyModal}
                show={isShown}
                onClose={hideModal}
            />
        </Container>
    );
};

export default Contact;
