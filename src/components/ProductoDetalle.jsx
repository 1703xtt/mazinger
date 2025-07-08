// src/components/ProductoDetalle.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductoDetalle.css';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import Swal from 'sweetalert2'; 

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { usuario } = useAuth();
  const { agregarAlCarrito } = useProducts();

  useEffect(() => {
    setLoading(true);
    fetch(`https://68123d883ac96f7119a76234.mockapi.io/productos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        return response.json();
      })
      .then((data) => {
        setProducto(data);
        setLoading(false);
        setCantidad(1);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCantidad(value > 0 ? value : 1);
  };

  const handleAgregarClick = () => {
    if (producto) {
      agregarAlCarrito(producto, cantidad);
      
      Swal.fire({ 
        icon: 'success',
        title: '¡Producto agregado!',
        text: `${cantidad} unidad(es) de ${producto.nombre} añadidas al carrito.`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!producto) {
    return <p>Producto no disponible.</p>;
  }

  return (
    <div className="producto-detalle-container">
      <img src={producto.imagen} alt={producto.nombre} className="producto-detalle-image" />
      <div className="producto-detalle-info">
        <h2>{producto.nombre}</h2>
        <p className="producto-detalle-descripcion">{producto.descripcion}</p>
        <p className="producto-detalle-precio">$ {Number(producto.precio).toFixed(2)}</p>

        {usuario ? (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="cantidad" style={{ marginRight: '10px', fontWeight: 'bold' }}>Cantidad:</label>
              <input
                type="number"
                id="cantidad"
                value={cantidad}
                onChange={handleCantidadChange}
                min="1"
                style={{ width: '60px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', color: 'black' }}
              />
            </div>
            <button onClick={handleAgregarClick} className="producto-detalle-button">
              Agregar al Carrito
            </button>
          </>
        ) : (
          <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#dc3545' }}>
            Inicia sesión para agregar productos al carrito.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductoDetalle;