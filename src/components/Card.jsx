// src/components/AgregarProducto.jsx
import React from 'react'; 
import { useProducts } from '../context/ProductsContext';
import ProductForm from './ProductForm'; // 

function AgregarProducto() {
  const { addProduct } = useProducts();

  const handleAddProduct = async (newProductData) => {
    
    const success = await addProduct(newProductData);
    if (success) {
      //
    }
  };

  return (
    <ProductForm onSubmit={handleAddProduct} />
  );
}

export default AgregarProducto;
