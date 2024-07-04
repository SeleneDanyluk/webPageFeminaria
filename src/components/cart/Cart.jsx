import React, { useState, useContext, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import CartItems from '../cartItems/CartItems'
import './Cart.css'
import ModalPage from '../modalPage/ModalPage'
import UserContext from '../../context/userContext'
import useModal from '../../hooks/useModal'

const Cart = () => {
    const { sub } = useContext(UserContext);
    const [titleModal, setTitleModal] = useState('');
    const [bodyModal, setBodyModal] = useState('');
    const [cart, setCart] = useState([]);
    const [cartBooks, setCartBooks] = useState([]);
    const { isShown, showModal, hideModal } = useModal();
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        fetch(`https://localhost:7069/${sub}/my-cart`, {
            method: "GET",
            mode: "cors",
        })
            .then((response) => {
                // if (!response.ok) {
                //     throw new Error("Error al obtener los libros del carrito");
                // }
                return response.json();
            })
            .then((cartData) => {
                setCart(cartData);
                setCartBooks(cartData.books);
            })
            .catch((error) => {
                console.error("Error:", error);
                setTitleModal('Error');
                setBodyModal(error.message);
                showModal();
            });
    }, [isDeleted, sub]);

    const handleRemoveItemCart = (onRemoveItem) => {
        fetch(`https://localhost:7069/${sub}/removeItem?bookId=${onRemoveItem}`, {
            method: "DELETE",
            mode: "cors",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al eliminar el libro");
                }
                return response.json();
            })
            .then((data) => {
                setCart(data);
                setCartBooks(data.books);
                setTitleModal('¡Su libro fue eliminado exitosamente!');
                setBodyModal('');
                showModal();
                setIsDeleted(true);
            })
            .catch(error => {
                console.error("Error:", error);
                setTitleModal('Error');
                setBodyModal('Error al eliminar el libro. Por favor, inténtelo de nuevo.');
                showModal();
            });
    };

    const handlePurchase = () => {
        fetch(`https://localhost:7069/${sub}/purchase`, {
            method: "PUT",
            mode: "cors",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al realizar la compra");
                }
                console.log("Compra realizada exitosamente"); 
                setTitleModal('¡Compra realizada exitosamente!');
                setBodyModal('Gracias por su compra.');
                showModal();
                window.localStorage.removeItem("cartItem");
                setCart([]);
                setCartBooks([]);
                return response.text(); 
            })
            .catch(error => {
                console.error("Error en la compra:", error); 
                setTitleModal('Error');
                setBodyModal('Hubo un error al realizar la compra. Por favor, inténtelo de nuevo.');
                showModal();
            });
    };

    return (
        <>
            {(cartBooks.length !== 0) ? (
                <Container>
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
                        <br />
                        <div><h2>Total: $ {cart.total}</h2></div>
                        <div className='d-flex justify-content-center gap-2 mt-3'>
                            <Button type="button" variant='primary' className='btn-cart' onClick={handlePurchase}>COMPRAR</Button>
                        </div>
                    </Form>
                </Container>
            ) : (
                <Container>
                    <p>Aun no tiene productos en el carrito.</p>
                    <Button>Explora nuestra coleccion</Button>
                </Container>
            )}
            <ModalPage
                title={titleModal}
                body={bodyModal}
                show={isShown}
                onClose={hideModal}
            />
        </>
    );
};

export default Cart;