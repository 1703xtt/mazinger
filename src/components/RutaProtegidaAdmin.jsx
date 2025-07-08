// src/components/RutaProtegidaAdmin.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaProtegidaAdmin = ({ children }) => {
  const { usuario } = useAuth();

  if (!usuario || usuario.rol !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegidaAdmin;
