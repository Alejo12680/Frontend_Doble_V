import React from 'react';
import { useProductContext } from '../../context/contextProduct';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useProductContext();

  return (
    <div className="wishlist">
      <h1>Mi Lista de Deseos</h1>
      {wishlist.length === 0 ? (
        <p>No tienes productos en tu lista de deseos.</p>
      ) : (
        <div className="products-grid">
          {wishlist.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.images[0]} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Precio: ${product.price}</p>
              {/* Botón para eliminar el producto de la lista de deseos */}
              <button onClick={() => removeFromWishlist(product.id)}>
                Eliminar de la lista de deseos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
