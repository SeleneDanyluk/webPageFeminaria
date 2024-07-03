import React, {useContext, useState} from 'react'
import PropTypes from "prop-types";
import { Card, Button, FormControl} from "react-bootstrap";
import './Book.css';
import UserContext from "../../context/userContext"
import ModalPage from '../modalPage/ModalPage'
import { useNavigate } from "react-router-dom";
import useModal from '../../hooks/useModal';

const Book = ({ title, author, imageUrl, description, price, id, stock, onDelete, onAddToCart }) => {
    const navigate = useNavigate();
    const { userType, isLoggedIn } = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)
    const [newPrice, setNewPrice] = useState(price)
    const [items, setItems] = useState([]); //array de titulos del carrito
    const [titleModal, setTitleModal] = useState('')
    const [bodyModal, setBodyModal] = useState('')
    const { isShown, showModal, hideModal } = useModal();


    const handleAddCart = () => {
        const cartItems = localStorage.getItem("cartItem")
        const parsedItems = JSON.parse(cartItems);
        if (cartItems !== null && Array.isArray(parsedItems)) {
            if (parsedItems.some(p => p == title)) {
                setTitleModal("Ya está agregado al carrito")
                setBodyModal('')
                showModal()
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
            showModal()
            onDelete(id);
        })
        .catch(error => {
            console.error("Error:", error);
            setToastMessage("Error al eliminar el libro");
            setToastVariant("danger");
            setShowToast(true);
        });
    };

    const handleRemoveBook = () =>{
        fetch(`https://localhost:7069/api/Book?id=${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al actualizar el libro");
            }
            setTitleModal('El libro fue removido de la venta correctamente')
            showModal()
            setIsEditing(false);
            
        })
        .catch(error => {
            console.error("Error:", error);
            setToastMessage("Error al remover el libro de la venta");
            setToastVariant("danger");
            setShowToast(true);
        });
    }

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
            showModal()
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
                        {isLoggedIn ? (
                            userType == 0 ? (
                            <Button variant="dark" onClick={handleAddCart}>Agregar al carrito</Button>
                            ) : null
                            ) : (
                            <Button variant="dark" onClick={() => navigate('/login')}>Agregar al carrito</Button>
                            )}
                        {

                            userType == 2 || userType == 1 &&
                            <>
                            <Button variant="primary" onClick={handleEdit}>Editar</Button>
                            <Button variant="danger" onClick={handleDelete}>Eliminar</Button> 
                            <br></br>
                            <Card.Subtitle>Stock: {stock} unidades.</Card.Subtitle>
                            { (stock == 0) ? <Button variant="info">NO ESTA A LA VENTA</Button> :
                                <Button variant="warning" onClick={handleRemoveBook}>Quitar de la venta</Button>
                            }
                            </>
                        }
                    </div>
                </Card.Body>
                <ModalPage 
                title={titleModal}
                body={bodyModal}
                show={isShown}
                onClose={hideModal}
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
    stock: PropTypes.number,
    onDelete: PropTypes.func,
    onAddToCart: PropTypes.func,
};

export default Book;