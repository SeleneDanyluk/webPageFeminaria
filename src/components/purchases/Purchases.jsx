import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/userContext';
import PurchaseCart from '../purchaseCart/PurchaseCart';
import './Purchases.css'; 

const Purchases = () => {
  const { sub } = useContext(UserContext);
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch(`https://localhost:7069/${sub}/myPurchases`, {
          method: 'GET',
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error('Error al obtener las compras');
        }
        const data = await response.json();
        setPurchases(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPurchases();
  }, [sub]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {purchases.length > 0 ? (
        purchases.map((purchase) => (
          <PurchaseCart key={purchase.id} cart={purchase} />
        ))
      ) : (
        <div className="no-purchases-message">
          <p>Aún no tienes carritos confirmados.</p>
          <p>Explora nuestra pagina de libros y confirma tu primer carrito.</p>
        </div>
      )}
    </div>
  );
};

export default Purchases;
