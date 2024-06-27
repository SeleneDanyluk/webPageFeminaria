import React, { useContext } from 'react'
import { Row, Col, Form, Image, Button } from 'react-bootstrap'
import "./CartItems.css"
import PropTypes from 'prop-types';

const CartItems = ({ id, title, author, imageUrl, description, price, lastItem, onRemoveItem }) => {

    const handleDelete = () => {
        onRemoveItem(id);
    };
    return (
        <>
            <Row className={!lastItem ? 'border-button mb-3 pb-3' : ''}>
                <Col xs={3}>
                    <Image src={imageUrl} fluid />
                </Col>
                <Col xs={3}>
                    <h2>{title}</h2>
                    <h4>{author}</h4>
                    <p>{description}</p>
                    <Button variant='link' className='btn-item' onClick={handleDelete}>Eliminar</Button>
                </Col>
                <Col xs={3}>
                    <h2 className='text-end'>AR$ {price}</h2>
                </Col>
            </Row>
        </>
    )
}
CartItems.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    lastItem: PropTypes.bool,
    onRemoveItem: PropTypes.func,
};



export default CartItems;