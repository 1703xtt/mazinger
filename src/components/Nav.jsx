// src/components/Nav.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar, Nav as BSNav, Container, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa'; 

const Nav = () => {
  const { usuario, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">Tu Tienda Quarks</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <BSNav className="me-auto">
            <BSNav.Link as={Link} to="/productos">Productos</BSNav.Link>
            {usuario && (
              <BSNav.Link as={Link} to="/carrito">
                <FaShoppingCart size={20} /> 
              </BSNav.Link>
            )}
            {usuario?.rol === 'admin' && (
              <>
                <BSNav.Link as={Link} to="/admin">Admin</BSNav.Link>
                <BSNav.Link as={Link} to="/agregar-producto">Agregar Producto</BSNav.Link>
                <BSNav.Link as={Link} to="/admin-productos">Editar / Eliminar Producto</BSNav.Link>
              </>
            )}
            <BSNav.Link as={Link} to="/about">About</BSNav.Link>
            <BSNav.Link as={Link} to="/contacto">Contacto</BSNav.Link>
          </BSNav>
          <BSNav>
            {usuario ? (
              <>
                <span className="me-2 d-flex align-items-center">Hola, {usuario.nombre}</span>
                <Button variant="outline-danger" onClick={handleLogout}>Salir</Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="outline-primary">Login</Button>
            )}
          </BSNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;
