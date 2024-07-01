import React, { useCallback } from 'react';
import Book from '../book/Book';
import './Books.css'
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBook from '../searchBook/SearchBook';
import { Button } from 'react-bootstrap';
import UserContext from "../../context/userContext"
import ModalPage from '../modalPage/ModalPage'
import useModal from '../../hooks/useModal';


const Books = () => {
    const { userType, sub } = useContext(UserContext);

    const navigate = useNavigate();
    const [prevData, setPrevData] = useState([]);
    const [books, setBooks] = useState([]);
    const [titleModal, setTitleModal] = useState('')
    const [bodyModal, setBodyModal] = useState('')
    const { isShown, showModal, hideModal } = useModal();


    useEffect(() => {
        fetch("https://localhost:7069/api/Book", {
            method: "GET",
            mode: "cors",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los libros");
                }
                return response.json();
            })
            .then((booksData) => {
                setBooks(booksData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const searchHandler = useCallback((onSearch) => {
        const filteredBooks = books.filter(
            (book) =>
                book.title.toLowerCase().includes(onSearch.toLowerCase()) ||
                book.author.toLowerCase().includes(onSearch.toLowerCase())
        );
        setPrevData(books);
        setBooks(filteredBooks);
    });

    const cleanSearch = (e) => {
        setBooks(prevData);
    };

    const handleBookDelete = (bookId) => {
        setBooks(books.filter(book => book.id !== bookId));
    };

    const handleAddToCart = (onAddToCart) => {
        fetch(`https://localhost:7069/${sub}/addItem?bookId=${onAddToCart}`, {
            method: "POST",
            mode: "cors"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al agregar el libro");
                }
                setTitleModal('¡Su libro fue agregado al carrito!')
                setBodyModal('')
                showModal()
            })
            .catch(error => {
                console.error("Error:", error);
                setToastMessage("Error al eliminar el libro");
                setToastVariant("danger");
                setShowToast(true);
            });
    }

    return (
        <div>
            <div className='search-container'>
                <SearchBook onSearch={searchHandler}></SearchBook>
                <Button className='outline-secondary search-button' onClick={cleanSearch}>Limpiar</Button>
            </div>
            <div className='books-container'>
                {books.length > 0 ? (
                    books.map((book) => (
                        <Book
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            imageUrl={'https://res.cloudinary.com/di0y6v99p/image/upload/v1718575669/images_secufd.jpg'}
                            description={book.description}
                            price={book.price}
                            onDelete={handleBookDelete}
                            onAddToCart={handleAddToCart}
                        ></Book>
                    ))
                ) : (
                    <div>
                        <p>Error al obtener los libros de la API</p>
                        <Button type='dark' onClick={() => navigate('/')}>Volver al inicio</Button>
                    </div>
                )}
            </div>
            <ModalPage
                title={titleModal}
                body={bodyModal}
                show={isShown}
                onClose={hideModal}
            />
        </div>
    );
};

export default Books