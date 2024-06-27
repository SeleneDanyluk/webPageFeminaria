import React, {useContext, useState} from 'react'
import PropTypes from "prop-types";
import { Card, Button, FormControl} from "react-bootstrap";
import './Book.css';
import UserContext from "../../context/userContext"
import ModalPage from '../modalPage/ModalPage'

import { useNavigate } from "react-router-dom";

const Book = ({ title, author, imageUrl, description, price, id, onDelete, onAddToCart }) => {
    const navigate = useNavigate();
    const { userType, isLoggedIn } = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)
    const [newPrice, setNewPrice] = useState(price)
    const [titleModal, setTitleModal] = useState('')
    const [bodyModal, setBodyModal] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [items, setItems] = useState([]); //array de titulos del carrito


    console.log(userType)
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleAddCart = () => {
        const cartItems = localStorage.getItem("cartItem")
        const parsedItems = JSON.parse(cartItems);
        if (cartItems !== null && Array.isArray(parsedItems)) {
            if (parsedItems.some(p => p == title)) {
                alert("Ya está agregado al carrito")
                return
            }
            parsedItems.push(title)
            localStorage.setItem("cartItem", JSON.stringify(parsedItems))
        }
        else {
            const items = []
            items.push(title)
            localStorage.setItem("cartItem", JSON.stringify(items))
        }
        onAddToCart(id);
    }

    const handleDelete = () => {
        console.log(id)
        fetch(`https://localhost:7069/api/Book?id=${id}`, {
            method: "DELETE",
            mode: "cors"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al eliminar el libro");
            }
            setTitleModal('¡Su libro fue eliminado exitosamente!')
            setBodyModal('')
            handleShow()
            onDelete(id);
        })
        .catch(error => {
            console.error("Error:", error);
            setToastMessage("Error al eliminar el libro");
            setToastVariant("danger");
            setShowToast(true);
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        console.log(JSON.stringify({ title }))
        fetch(`https://localhost:7069/api/Book?title=${title}&price=${newPrice}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al actualizar el libro");
            }
            setTitleModal('¡Precio actualizado correctamente!')
            setBodyModal('')
            handleShow()
            setIsEditing(false);
            
        })
        .catch(error => {
            console.error("Error:", error);
            setToastMessage("Error al actualizar el precio");
            setToastVariant("danger");
            setShowToast(true);
        });
    };

    return (
        <div className='book-container'>
            <Card style={{ width: '18rem' }} key={id}>
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <div className='book-data-container'>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle>{author}</Card.Subtitle>
                        {isEditing ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FormControl style={{ width: '8rem' }}
                                type="number" 
                                value={newPrice} 
                                onChange={(e) => setNewPrice(e.target.value)} 
                            />
                            <Button variant="success" onClick={handleSave}>Guardar</Button>
                        </div>
                        ) : (
                            <Card.Subtitle>${newPrice}</Card.Subtitle>
                        )}
                    </div>
                    <Card.Text className='book-description'>
                        {description}
                    </Card.Text>
                    <div className='container button-container'>
                        {isLoggedIn ? 
                            <Button variant="dark" onClick={handleAddCart}>Agregar al carrito</Button> 
                        : <Button variant="dark" onClick={()=> navigate('/login')}>Acceder para agregar al carrito</Button>}
                        {

                            userType == 2 || userType == 1 &&
                            <>
                            <Button variant="primary" onClick={handleEdit}>Editar</Button>
                            <Button variant="danger" onClick={handleDelete}>Eliminar</Button> 
                            </>
                        }
                    </div>
                </Card.Body>
                <ModalPage 
                title={titleModal}
                body={bodyModal}
                show={showModal}
                onClose={handleClose}
                />
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
    id: PropTypes.number,
    onDelete: PropTypes.func,
    onAddToCart: PropTypes.func,
};

export default Book;