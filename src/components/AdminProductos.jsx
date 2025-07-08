// src/components/AdminProductos.jsx
import React, { useState } from 'react';
import '../styles/Productos.css';
import { useProducts } from '../context/ProductsContext';
import ProductForm from './ProductForm';

function AdminProductos() {
  const { productos, deleteProduct, updateProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);

  // PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8; 
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;
  const productosPagina = productos.slice(indiceInicio, indiceFin);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (updatedProductData) => {
    const success = await updateProduct(editingProduct.id, updatedProductData);
    if (success) {
      setEditingProduct(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div>
      <h2>Administrar Productos</h2>

      {editingProduct && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleUpdateProduct}
          onCancel={handleCancelEdit}
        />
      )}

      <div className="productos-grid">
        {productosPagina.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img className="producto-image" src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>$ {Number(producto.precio).toFixed(2)}</p>
            <button onClick={() => handleEditClick(producto)} style={{ marginRight: '5px' }}>
              Editar
            </button>
            <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
          </div>
        ))}
      </div>

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((numero) => (
            <button
              key={numero}
              onClick={() => cambiarPagina(numero)}
              style={{
                margin: '0 5px',
                padding: '6px 12px',
                backgroundColor: numero === paginaActual ? '#007bff' : '#e0e0e0',
                color: numero === paginaActual ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {numero}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProductos;
