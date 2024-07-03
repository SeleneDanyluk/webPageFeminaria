import React, { useState, useContext, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import CartItems from '../cartItems/CartItems'
import './Cart.css'
import ModalPage from '../modalPage/ModalPage'
import UserContext from '../../context/userContext'
import useModal from '../../hooks/useModal'

const Cart = () => {
    const { sub } = useContext(UserContext);
    const [titleModal, setTitleModal] = useState('')
    const [bodyModal, setBodyModal] = useState('')
    const [cart, setCart] = useState([]);
    const [cartBooks, setCartBooks] = useState([]);
    const { isShown, showModal, hideModal } = useModal()

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
                setTitleModal('Error')
                setBodyModal(error.message)
                showModal()
            });
    }, [cart]);

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
                showModal()
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
            {(cartBooks.length != 0) ? <Container>
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
                    show={isShown}
                    onClose={hideModal}
                />
            </Container> : <Container><p>Aun no tiene productos en el carrito.</p>
                <Button>Explora nuestra coleccion</Button></Container>
            }
        </>
    );
};

export default Cart;