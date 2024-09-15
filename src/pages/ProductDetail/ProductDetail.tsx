import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../../context/contextProduct';
import { IonButton, IonIcon } from '@ionic/react';
import { heart, logoApple, settingsSharp, star } from 'ionicons/icons';
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
      <div className="card">
        <img src={product.images[0]} alt={product.title} className="product-image" />
        <div className="card-content">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h5><strong>Precio:</strong> ${product.price}</h5>
          <button onClick={() => addToWishlist(product)} className="add-to-wishlist-btn">Añadir a lista de deseos   <IonIcon slot="end" icon={heart}></IonIcon></button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
