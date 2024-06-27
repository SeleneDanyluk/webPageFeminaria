import React, { useCallback } from 'react';
import Book from '../book/Book';
import './Books.css'
import { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import SearchBook from '../searchBook/SearchBook';
import { Button } from 'react-bootstrap';
import UserContext from "../../context/userContext"


const Books = () => {
    const { userType } = useContext(UserContext);

    const navigate = useNavigate();

    const [prevData, setPrevData] = useState([]);
    const [books, setBooks] = useState([]);

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
                        ></Book>
                    ))
                ) : (
                    <div>
                        <p>Error al obtener los libros de la API</p>
                        <Button type='dark' onClick={() => navigate('/')}>Volver al inicio</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Books