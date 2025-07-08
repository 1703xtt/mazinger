// src/components/Admin.jsx
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Admin() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const manejarClickCV = () => {
    Swal.fire({
      title: 'CV Enviados',
      text: 'Aquí podrías gestionar los CV recibidos.',
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  };

  const manejarClickMensajes = () => {
    Swal.fire({
      title: 'Mensajes de Usuarios',
      text: 'Aquí podrías ver los mensajes aportados por los usuarios.',
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  };

  return (
    <Container className="my-5 d-flex flex-column align-items-center gap-4">
      {/* Bienvenida */}
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title>Bienvenido, Admin</Card.Title>
          <Card.Text>
            Hola <strong>{usuario?.nombre}</strong>, esta es tu área privada de administración.
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Accesos Rápidos */}
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title>Accesos Rápidos</Card.Title>
          <Button
            variant="warning"
            className="d-block w-100 mb-2"
            onClick={() => navigate('/admin-productos')}
          >
            Editar / Eliminar Productos
          </Button>
          <Button
            variant="success"
            className="d-block w-100"
            onClick={() => navigate('/agregar-producto')}
          >
            Agregar Producto
          </Button>
        </Card.Body>
      </Card>

      {/* Gestionar */}
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title>Gestionar</Card.Title>
          <Button
            variant="info"
            className="d-block w-100 mb-2"
            onClick={manejarClickCV}
          >
            CV Enviados
          </Button>
          <Button
            variant="secondary"
            className="d-block w-100"
            onClick={manejarClickMensajes}
          >
            Mensajes de Usuarios
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Admin;
