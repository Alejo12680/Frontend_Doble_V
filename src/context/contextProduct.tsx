import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getProducts, getCategories, getProductsByCategory } from '../services/axiosService';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

interface Category {
  id: number;
  name: string;
  image: string;
}

interface ProductContextProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  getProductsByCategoryId: (categoryId: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  wishlist: Product[];
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productList, categoryList] = await Promise.all([getProducts(), getCategories()]);
        setProducts(productList);
        setCategories(categoryList);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const getProductsByCategoryId = useCallback(async (categoryId: number) => {
    try {
      setLoading(true);
      setError(null);
      const filteredProducts = await getProductsByCategory(categoryId);
      setProducts(filteredProducts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para agregar productos al wishlist
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.find(item => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  // Función para eliminar productos del wishlist
  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter(product => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ products, categories, loading, error, getProductsByCategoryId, addToWishlist, wishlist, removeFromWishlist }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
