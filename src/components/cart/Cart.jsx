import React, { useState, useContext, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import CartItems from '../cartItems/CartItems'
import './Cart.css'
// import ModalPage from '../modalPage/ModalPage'
import UserContext from '../../context/userContext'

const Cart = () => {
    const { sub } = useContext(UserContext);
    const [items, setItems] = useState([]);
    // const [titleModal, setTitleModal] = useState('')
    // const [bodyModal, setBodyModal] = useState('')
    // const [showModal, setShowModal] = useState(false);
    const [cart, setCart] = ([]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleDeleteItem = (titleToDelete) => {
        const cartItems = localStorage.getItem('cartItem');
        if (!cartItems) return;

        const parsedCartItems = JSON.parse(cartItems);
        if (!Array.isArray(parsedCartItems)) return;

        const filteredItems = parsedCartItems.filter(title => title !== titleToDelete);
        localStorage.setItem('cartItem', JSON.stringify(filteredItems));
        setItems(filteredItems);
    };

    const handleSubmitCart = (event) => {
        event.preventDefault();
        setTitleModal('¡Gracias por su compra!')
        setBodyModal('Se le enviará un mail con el detalle de su compra y su número de seguimiento (en case de ser formato papel)')
        handleShow()
    };

    useEffect(() => {
        let cartItems = localStorage.getItem('cartItem');

        if (cartItems === null) {
            console.error('No hay items en el carrito almacenados en el local storage.');
            return;
        }

        const parsedCartItems = JSON.parse(cartItems);

        if (!Array.isArray(parsedCartItems)) {
            console.error('El item del carrito no es un arreglo válido.');
            return;
        };

        fetch("https://localhost:7069/librosDelCarrito", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsedCartItems)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los libros del carrito");
                }
                return response.json();
            })
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleCreateCart = () => {
        let itemsToAddCart = localStorage.getItem('cartItem');
        if (itemsToAddCart) {
            itemsToAddCart = JSON.parse(itemsToAddCart);
        } else {
            console.error('No hay items en el carrito almacenados en el local storage.');
            return;
        }

        fetch(`https://localhost:7069/api/Cart?UserId=${sub}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemsToAddCart)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos');
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
                localStorage.removeItem('cartItem');
            })
            .catch(error => {
                console.error('Error al enviar datos al servidor:', error);
            });
    };

    return (
        <>
            {cart ? <div>Carrito creado</div> : <Container>
                <Form className='my-3' onSubmit={handleCreateCart}>
                    {items.map((item, index) => (
                        <CartItems
                        key={index}
                            title={item.title}
                            author={item.author}
                            imageUrl={'https://res.cloudinary.com/di0y6v99p/image/upload/v1718575669/images_secufd.jpg'}
                            description={item.description}
                            price={item.price}
                            onDeleteItem={handleDeleteItem}
                        />
                    ))}
                    <div className='d-flex justify-content-center gap-2 mt-3'>
                        <Button type="submit" variant='primary' className='btn-cart'>COMPRAR</Button>
                    </div>
                </Form>
                {/* <ModalPage
                    title={titleModal}
                    body={bodyModal}
                    show={showModal}
                    onClose={handleClose}
                /> */}
            </Container>}
        </>
    );
};

export default Cart;