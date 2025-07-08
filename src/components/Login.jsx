// src/components/Login.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // <-- ¡Importa SweetAlert2 aquí!

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const manejarSubmit = (e) => {
    e.preventDefault();
    const success = login(correo, contraseña);
    if (success) {
      
      setCorreo('');
      setContraseña('');
      navigate('/');
    }
    
  };

  
  const handleRegisterClick = () => {
    
    Swal.fire({
      icon: 'success',
      title: '¡Usuario Registrado!',
      text: 'Tu cuenta ha sido creada exitosamente.',
      showConfirmButton: false, 
      timer: 2000 
    });
  };

  return (
    <form onSubmit={manejarSubmit} style={{ maxWidth: 300, margin: '2rem auto' }} autoComplete="off">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
        autoComplete="email"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        required
        autoComplete="new-password"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button type="submit" style={{ padding: '0.5rem', width: '100%', marginBottom: '10px' }}>
        Iniciar sesión
      </button>
      
      <button
        type="button" 
        onClick={handleRegisterClick}
        style={{ padding: '0.5rem', width: '100%', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Regístrate
      </button>
    </form>
  );
};

export default Login;


