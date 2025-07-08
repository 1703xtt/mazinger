// src/App.jsx
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'; 


import Nav from './components/Nav';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ProductosContainer from './components/ProductosContainer';
import Carrito from './components/Carrito';
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/ProductoDetalle';
import Admin from './components/Admin';
import Login from './components/Login';
import AgregarProducto from './components/AgregarProducto';
import AdminProductos from './components/AdminProductos';


import RutaProtegida from './components/RutaProtegida';
import RutaProtegidaAdmin from './components/RutaProtegidaAdmin';


import { useProducts } from './context/ProductsContext';
import { useAuth } from './context/AuthContext'; 


import Home from './layouts/Home';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const { productos, productosCarrito, vaciarCarrito, agregarAlCarrito, eliminarDelCarrito } = useProducts();
  
  const { loggedIn } = useAuth(); 

  
  useEffect(() => {
    const handleLogout = () => {
      vaciarCarrito(); 
    };
    
    window.addEventListener('logout', handleLogout);
    return () => {
      
      window.removeEventListener('logout', handleLogout);
    };
  }, [vaciarCarrito]); 

  return (
    <div style={{ width: "80vw", margin: "0 auto" }}>
      <Nav />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar /> 
      <Routes>
        <Route
          path="/"
          element={<Home />} 
        />
        <Route
          path="/productos"
          element={
            <ProductosContainer
              productos={productos} 
            />
          }
        />
        <Route
          path="/agregar-producto"
          element={
            <RutaProtegidaAdmin>
              <AgregarProducto />
            </RutaProtegidaAdmin>
          }
        />
        <Route
          path="/carrito"
          element={
            <RutaProtegida>
              <Carrito
                productosCarrito={productosCarrito}
                eliminarDelCarrito={eliminarDelCarrito} 
                vaciarCarrito={vaciarCarrito} 
              />
            </RutaProtegida>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route
          path="/productos/:id"
          element={<ProductoDetalle />} 
        />
        <Route
          path="/admin"
          element={
            <RutaProtegidaAdmin>
              <Admin />
            </RutaProtegidaAdmin>
          }
        />
        <Route
          path="/admin-productos"
          element={
            <RutaProtegidaAdmin>
              <AdminProductos />
            </RutaProtegidaAdmin>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;