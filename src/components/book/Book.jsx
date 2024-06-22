import React, {useContext} from 'react'
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import './Book.css';
import UserContext from "../../context/userContext"

const Book = ({ title, author, imageUrl, description, price, id }) => {
    const {userType} = useContext(UserContext)
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
    return (
        <div className='book-container'>
            <Card style={{ width: '18rem' }} key={id}>
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
                        <Button variant="dark" onClick={handleAddCart}>Agregar al carrito</Button>
                        {

                            userType == 2 || userType == 1 && 
                            <>
                            <Button>Editar</Button>
                            <Button>Eliminar</Button>
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
};

export default Book;