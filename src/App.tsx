import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './context/contextProduct';
import Home from './pages/Home/Home';
import ProductList from './components/ProducList/ProductList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Wishlist from './pages/Wishlist/Wishlist';
import Header from './components/Header/Header';  // Importar el Header

const App: React.FC = () => {
  return (
    <Router>
      <ProductProvider>
        <Header /> {/* Agregar el Header aquí */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:categoryId" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </ProductProvider>
    </Router>
  );
};

export default App;
