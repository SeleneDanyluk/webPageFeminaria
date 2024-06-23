import React, {useContext, useState} from 'react'
import PropTypes from "prop-types";
import { Card, Button, FormControl } from "react-bootstrap";
import './Book.css';
import UserContext from "../../context/userContext"

const Book = ({ title, author, imageUrl, description, price, id, onDelete }) => {
    const {userType} = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)
    const [newPrice, setNewPrice] = useState(price)

    console.log(userType)

    const handleAddCart = () => {
        const cartItems = localStorage.getItem("cartItem")
        const parsedItems = JSON.parse(cartItems);
        if (cartItems !== null && Array.isArray(parsedItems)){
            if (parsedItems.some(p => p== title))
            {
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
            alert("Libro eliminado correctamente");
            onDelete(id)
        })
        .catch(error => {
            console.error("Error:", error);
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
            alert("Precio actualizado correctamente");
            setIsEditing(false);
            
        })
        .catch(error => {
            console.error("Error:", error);
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
                        <Button variant="dark" onClick={handleAddCart}>Agregar al carrito</Button>
                        {

                            userType == 2 || userType == 1 && 
                            <>
                            <Button variant="primary" onClick={handleEdit}>Editar</Button>
                            <Button variant="danger" onClick={handleDelete}>Eliminar</Button> 
                            </>
                        }
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
    id: PropTypes.number,
    onDelete: PropTypes.func,
};

export default Book;