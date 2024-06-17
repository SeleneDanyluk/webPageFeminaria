import React from 'react'
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import './Book.css';

const Book = ({ title, author, imageUrl, description, price }) => {
    return (
        <div className='book-container'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <div className='book-data-container'>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>
                    <Card.Subtitle>${price}</Card.Subtitle>
                    </div>
                    <Card.Text className='book-description'>
                        {description}
                    </Card.Text>
                    <div className='container button-container'>
                        <Button variant="dark">Agregar al carrito</Button>
                        <Button>Editar</Button>
                        <Button>Eliminar</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

Book.PropTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
};

export default Book;