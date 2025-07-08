// src/components/Carrito.jsx
import React from 'react';
import { useProducts } from '../context/ProductsContext';
import { useNavigate } from 'react-router-dom'; 

const Carrito = () => {
  const { productosCarrito, eliminarDelCarrito, vaciarCarrito } = useProducts();
  const navigate = useNavigate(); 

  const totalGeneral = productosCarrito.reduce((acumulador, itemActual) => {
    return acumulador + (Number(itemActual.precio) * itemActual.cantidad);
  }, 0);

  const handleConfirmarCompra = () => {
    if (productosCarrito.length > 0) {
      alert('¡Compra confirmada! Gracias por tu compra.');
      vaciarCarrito();
      navigate('/productos'); // 
    } else {
      alert('Tu carrito está vacío. Agrega productos para finalizar una compra.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '20px auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', color: 'black' }}>
      <h2>Tu Carrito de Compras</h2>
      {productosCarrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            {productosCarrito.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                <img src={item.imagen} alt={item.nombre} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px', marginRight: '15px' }} />
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0' }}>{item.nombre}</h4>
                  <p style={{ margin: '0', fontSize: '0.9em' }}>Cantidad: {item.cantidad}</p>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>Precio Unitario: $ {Number(item.precio).toFixed(2)}</p>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>Subtotal: $ {(Number(item.precio) * item.cantidad).toFixed(2)}</p>
                </div>
                <button onClick={() => eliminarDelCarrito(item.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'right', marginTop: '20px', borderTop: '2px solid #eee', paddingTop: '15px' }}>
            <h3 style={{ margin: '0', fontSize: '1.5em' }}>Total General: $ {totalGeneral.toFixed(2)}</h3>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button onClick={handleConfirmarCompra} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
