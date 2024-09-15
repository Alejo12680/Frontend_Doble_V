import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1/products';
const CATEGORY_URL = 'https://api.escuelajs.co/api/v1/categories';

// Obtener productos
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los productos. Por favor, intenta nuevamente.');
  }
};

// Obtener categorías
export const getCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las categorías. Por favor, intenta nuevamente.');
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (categoryId: any) => {
  try {
    const response = await axios.get(`${CATEGORY_URL}/${categoryId}/products`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los productos de la categoría. Por favor, intenta nuevamente.');
  }
};
