import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../../context/contextProduct';
import './productDetail.css';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, addToWishlist } = useProductContext();
  const [product, setProduct] = useState<any>(null); // Tipo de producto según tu modelo

  useEffect(() => {
    if (productId) {
      const foundProduct = products.find(p => p.id === parseInt(productId, 10));
      setProduct(foundProduct);
    }
  }, [productId, products]);

  if (!product) return <p>Producto no encontrado...</p>;

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.images[0]} alt={product.title} />
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <button onClick={() => addToWishlist(product)}>Agregar a la lista de deseos</button>
    </div>
  );
};

export default ProductDetail;
