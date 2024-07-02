import React from 'react';
import './PurchaseCart.css'; 

const PurchaseCart = ({ cart }) => {
  const { id, total, saleState, books } = cart;

  return (
    <div className="purchase-cart">
      <h2>Carrito #{id}</h2>
      <p>Total: ${total}</p>
      <p>Estado de la venta: Confirmada </p>
      <div className="books">
        {books.map(book => (
          <div key={book.id} className="book">
            <img src={book.imageUrl} alt={book.title} />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p><strong>Autor:</strong> {book.author}</p>
              <p><strong>Precio:</strong> ${book.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCart;
