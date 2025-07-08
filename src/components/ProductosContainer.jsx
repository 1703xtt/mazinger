import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Productos.css';

const ProductosContainer = ({ productos }) => {
  const [loading, setLoading] = useState(true);
  const [buscarProducto, setBuscarProducto] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const location = useLocation();

  const productosPorPagina = 8; 

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.pathname === '/productos') {
      setBuscarProducto('');
      setPaginaActual(1);
    }
  }, [location]);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(buscarProducto.toLowerCase())
  );

  
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPagina = productosFiltrados.slice(inicio, fin);

  const irAPagina = (numero) => {
    setPaginaActual(numero);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'black' }}>
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Nuestros Productos</h2>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={buscarProducto}
        onChange={(e) => {
          setBuscarProducto(e.target.value);
          setPaginaActual(1); 
        }}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      <div className="productos-grid">
        {productosPagina.length > 0 ? (
          productosPagina.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img className="producto-image" src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>$ {Number(producto.precio).toFixed(2)}</p>
              <Link to={`/productos/${producto.id}`} className="detalle-button">
                Ver Detalles
              </Link>
            </div>
          ))
        ) : (
          <p>No se encontraron productos que coincidan con la búsqueda.</p>
        )}
      </div>

      
      {totalPaginas > 1 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((nro) => (
            <button
              key={nro}
              onClick={() => irAPagina(nro)}
              style={{
                margin: '0 5px',
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: paginaActual === nro ? 'orange' : '#ddd',
                color: paginaActual === nro ? 'white' : 'black',
                cursor: 'pointer',
              }}
            >
              {nro}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductosContainer;
