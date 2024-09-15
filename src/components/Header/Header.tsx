import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lógica para cambiar el título según la página actual
  const getTitle = () => {
    if (location.pathname === '/') return 'Home';
    if (location.pathname.includes('/products')) return 'Catálogo de Productos';
    if (location.pathname.includes('/product')) return 'Detalle del Producto';
    if (location.pathname.includes('/wishlist')) return 'Lista de Deseos';
    return 'App';
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Botón de regreso */}
        {location.pathname !== '/' && (
          <button onClick={() => navigate(-1)} className="back-button">
            ← Atrás
          </button>
        )}
        
        {/* Título dinámico */}
        <h1 className="header-title">{getTitle()}</h1>

        {/* Botón para acceder a la lista de deseos */}
        <Link to="/wishlist" className="wishlist-button">
          🛒 Lista de Deseos
        </Link>
      </div>
    </header>
  );
};

export default Header;
