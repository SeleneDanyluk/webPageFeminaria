import React from 'react';
import Book from '../book/Book';
import './Books.css'
import { useContext, useEffect, useState } from "react";
import SearchBook from '../searchBook/SearchBook';
import { Button } from 'react-bootstrap';
import UserContext from "../../context/userContext"
import ModalPage from '../modalPage/ModalPage'


const Books = () => {
    const {userType} = useContext(UserContext)
  
    const [prevData, setPrevData] = useState([]);
    const [books, setBooks] = useState([]);
    const [titleModal, setTitleModal] = useState('')
    const [bodyModal, setBodyModal] = useState('')
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        fetch("https://localhost:7069/api/Book", {
            method: "GET",
            mode: "cors",
        })
            .then((response) => {
                if (!response.ok) {
                    setTitleModal('Error')
                    setBodyModal('Error al obtener los libros')
                    handleShow()
                    throw new Error("Error al obtener los libros");
                }
                return response.json();
            })
            .then((booksData) => {
                setBooks(booksData);
            })
            .catch((error) => {
                console.error("Error:", error);
                setTitleModal('Error')
                setBodyModal(error)
                handleShow()
            });
    }, []);

    const searchHandler = (onSearch) => {
        const filteredBooks = books.filter(
          (book) =>
            book.title.toLowerCase().includes(onSearch.toLowerCase()) ||
            book.author.toLowerCase().includes(onSearch.toLowerCase())
        );
        setPrevData(books);
        setBooks(filteredBooks);
      };

    const cleanSearch = (e) => {
        setBooks(prevData);
    };

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
                            key={book.id}
                            title={book.title}
                            author={book.author}
                            imageUrl={'https://res.cloudinary.com/di0y6v99p/image/upload/v1718575669/images_secufd.jpg'}
                            description={book.description}
                            price={book.price}
                        ></Book>
                    ))
                ) : (
                    <p>NO HAY NADA PARA MOSTRAR</p>
                )}
            </div>
            <ModalPage 
                    title={titleModal}
                    body={bodyModal}
                    show={showModal}
                    onClose={handleClose}
                />
        </div>
    );
};

export default Books