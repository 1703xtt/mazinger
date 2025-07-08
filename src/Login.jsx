import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [nombre, setNombre] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const manejarSubmit = (e) => {
    e.preventDefault();
    login(nombre);
    navigate('/admin'); 
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;
