import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../../context/contextProduct';
import './home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categories, loading, error } = useProductContext();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/products/${categoryId}`);
  };

  return (
    <div className="home">
      <h1>Categorías</h1>
      <div className="category-list">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-item" 
            onClick={() => handleCategoryClick(category.id)}
          >
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
