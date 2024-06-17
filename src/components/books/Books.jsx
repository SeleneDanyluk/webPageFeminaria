import React from 'react';
import Book from '../book/Book';
import './Books.css'
import { useContext, useEffect, useState } from "react";


const Books = () => {

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
                console.log(booksData);
                setBooks(booksData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
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
    );
};

export default Books