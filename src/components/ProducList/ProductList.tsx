import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProductContext } from '../../context/contextProduct';
import './productList.css';

const ProductList: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { products, getProductsByCategoryId, loading, error } = useProductContext();

  useEffect(() => {
    if (categoryId) {
      const categoryIdNumber = parseInt(categoryId, 10);
      if (!isNaN(categoryIdNumber)) {
        getProductsByCategoryId(categoryIdNumber);
      }
    }
  }, [categoryId, getProductsByCategoryId]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-list">
      <h1>Productos en la categoría</h1>
      {products.length === 0 ? (
        <p>No hay productos en esta categoría.</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.images[0]} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Precio: ${product.price}</p>
              {/* Agrega un enlace al detalle del producto */}
              <Link to={`/product/${product.id}`}>Ver Detalle</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
