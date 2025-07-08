// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('mazingerToken');
    const storedUser = sessionStorage.getItem('mazingerUser');

    if (storedToken && storedUser) {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user or token from sessionStorage", e);
        sessionStorage.removeItem('mazingerToken');
        sessionStorage.removeItem('mazingerUser');
      }
    }
  }, []);

  const login = (email, password) => {
    let authenticatedUser = null;

    if (email === 'juan@ejemplo.com' && password === '12345') {
      authenticatedUser = { email: 'juan@ejemplo.com', nombre: 'Juan', rol: 'user' };
    } else if (email === 'admin@gmail.com' && password === 'test2') {
      authenticatedUser = { email: 'admin@gmail.com', nombre: 'Admin', rol: 'admin' };
    }

    if (authenticatedUser) {
      const simulatedToken = `your_dummy_jwt_${Math.random().toString(36).substring(2)}`;

      sessionStorage.setItem('mazingerToken', simulatedToken);
      sessionStorage.setItem('mazingerUser', JSON.stringify(authenticatedUser));

      setUsuario(authenticatedUser);
      console.log("Usuario logueado. Token simulado:", simulatedToken);
      return true;
    } else {
      setUsuario(null);
      sessionStorage.removeItem('mazingerToken');
      sessionStorage.removeItem('mazingerUser');
      
      Swal.fire({
        icon: 'error',
        title: '¡Error de credenciales!',
        text: 'Usuario o contraseña incorrectos',
        showConfirmButton: true
      });
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    sessionStorage.removeItem('mazingerToken');
    sessionStorage.removeItem('mazingerUser');
    window.dispatchEvent(new Event('logout'));
  };

  const value = {
    usuario,
    login,
    logout,
    isAdmin: usuario && usuario.rol === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};