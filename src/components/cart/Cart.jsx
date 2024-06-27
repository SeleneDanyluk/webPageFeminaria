import React, { useState, useContext, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import CartItems from '../cartItems/CartItems'
import './Cart.css'
import ModalPage from '../modalPage/ModalPage'
import UserContext from '../../context/userContext'

const Cart = () => {
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const { sub } = useContext(UserContext);
    const [titleModal, setTitleModal] = useState('')
    const [bodyModal, setBodyModal] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartBooks, setCartBooks] = useState([]);

    useEffect(() => {
        fetch(`https://localhost:7069/${sub}/my-cart`, {
            method: "GET",
            mode: "cors",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los libros del carrito");
                }
                return response.json();
            })
            .then((cartData) => {
                setCart(cartData);
                setCartBooks(cartData.books);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [cart]);

    //onremoveitem me va a devolver el id del libro a eliminar y del contexto utilizo el sub para el user id 
    const handleRemoveItemCart = (onRemoveItem) => {
        fetch(`https://localhost:7069/${sub}/removeItem?bookId=${onRemoveItem}`, {
            method: "DELETE",
            mode: "cors",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al eliminar el libro");
                }
                setTitleModal('¡Su libro fue eliminado exitosamente!')
                setBodyModal('')
                handleShow()
                return response.json();
            })
            .then((data) => {
                setCart(data);
            })
            .catch(error => {
                console.error("Error:", error);
                setToastMessage("Error al eliminar el libro");
                setToastVariant("danger");
                setShowToast(true);
            });
    };
    return (
        <>
            {!cart ? <div>Carrito creado</div> : <Container>
                <Form className='my-3'>
                    {cartBooks.map((item, index) => (
                        <CartItems
                            key={index}
                            id={item.id}
                            title={item.title}
                            author={item.author}
                            imageUrl={'https://res.cloudinary.com/di0y6v99p/image/upload/v1718575669/images_secufd.jpg'}
                            description={item.description}
                            price={item.price}
                            onRemoveItem={handleRemoveItemCart}
                        />
                    ))}
                    <br></br>
                    <div><h2>Total: $ {cart.total}</h2></div>
                    <div className='d-flex justify-content-center gap-2 mt-3'>
                        <Button type="submit" variant='primary' className='btn-cart'>COMPRAR</Button>
                    </div>
                </Form>
                <ModalPage
                    title={titleModal}
                    body={bodyModal}
                    show={showModal}
                    onClose={handleClose}
                />
            </Container>}
        </>
    );
};

export default Cart;