import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import CartItems from '../cartItems/CartItems'
import itemsCart from '../../data/cartItems'
import './Cart.css'
import ModalPage from '../modalPage/ModalPage'

const Cart = () => {
    const [items, setItems] = useState(itemsCart)
    const [titleModal, setTitleModal] = useState('')
    const [bodyModal, setBodyModal] = useState('')
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleDeleteItem = (id) => {
        setItems(items.filter(b => b.id !== id))
    }
    const handleSubmitCart = (event) => {
        event.preventDefault();
        setTitleModal('¡Gracias por su compra!')
        setBodyModal('Se le enviará un mail con el detalle de su compra y su número de seguimiento (en case de ser formato papel)')
        handleShow()
    }
    return (
        <>
            <Container>
                <Form className='my-3' onSubmit={handleSubmitCart}>
                    {items.map((item, index) => (
                        <CartItems
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            author={item.author}
                            imageUrl={item.imageUrl}
                            description={item.description}
                            price={item.price}
                            isMarked={item.isMarked}
                            lastItem={items.length - 1 == index}
                            onDeleteItem={handleDeleteItem}
                        />
                    ))}
                    <div className='d-flex justify-content-center gap-2 mt-3'>
                        <Button type="submit" variant='primary' className='btn-cart'>COMPRAR TODO</Button>
                        <Button type="submit" variant='primary' className='btn-cart'>COMPRAR MARCADOS</Button>
                    </div>
                </Form>
                <ModalPage 
                    title={titleModal}
                    body={bodyModal}
                    show={showModal}
                    onClose={handleClose}
                />
            </Container>
        </>
    )
}

export default Cart