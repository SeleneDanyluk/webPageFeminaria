import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/userContext';
import PurchaseCart from '../purchaseCart/PurchaseCart';

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
        <p>NO HAY NADA PARA MOSTRAR</p>
      )}
    </div>
  );
};

export default Purchases;
