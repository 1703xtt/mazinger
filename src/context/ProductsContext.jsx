// src/context/ProductsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productosCarrito, setProductosCarrito] = useState([]);

  const cargarProductos = () => {
    fetch("https://68123d883ac96f7119a76234.mockapi.io/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const agregarAlCarrito = (producto, cantidad) => {
    const productoExistente = productosCarrito.find((item) => item.id === producto.id);
    if (productoExistente) {
      setProductosCarrito(
        productosCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      );
    } else {
      setProductosCarrito([...productosCarrito, { ...producto, cantidad }]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setProductosCarrito(productosCarrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setProductosCarrito([]);
  };

  const addProduct = async (newProductData) => {
    try {
      const response = await fetch('https://68123d883ac96f7119a76234.mockapi.io/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData),
      });
      if (!response.ok) {
        throw new Error('Error al agregar el producto');
      }
      const addedProduct = await response.json();
      setProductos((prev) => [...prev, addedProduct]);
      
      Swal.fire({ 
        icon: 'success',
        title: '¡Éxito!',
        text: 'Producto agregado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      return true;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ocurrió un error al agregar el producto',
        showConfirmButton: true
      });
      return false;
    }
  };

  const updateProduct = async (id, updatedProductData) => {
    try {
      const response = await fetch(`https://68123d883ac96f7119a76234.mockapi.io/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }
      const product = await response.json();
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? product : p))
      );
      
      Swal.fire({ 
        icon: 'success',
        title: '¡Éxito!',
        text: 'Producto actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      return true;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      
      Swal.fire({ 
        icon: 'error',
        title: '¡Error!',
        text: 'Ocurrió un error al actualizar el producto',
        showConfirmButton: true
      });
      return false;
    }
  };

  const deleteProduct = async (id) => {
    
    const result = await Swal.fire({ 
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡eliminarlo!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) { 
      try {
        const response = await fetch(`https://68123d883ac96f7119a76234.mockapi.io/productos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el producto');
        }
        setProductos((prev) => prev.filter((p) => p.id !== id));
        
        Swal.fire( 
          '¡Eliminado!',
          'El producto ha sido eliminado correctamente.',
          'success'
        );
        return true;
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        
        Swal.fire({ 
          icon: 'error',
          title: '¡Error!',
          text: 'Ocurrió un error al eliminar el producto',
          showConfirmButton: true
        });
        return false;
      }
    }
    return false; 
  };

  const value = {
    productos,
    productosCarrito,
    cargarProductos,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};