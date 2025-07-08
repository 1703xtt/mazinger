
import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const AboutContainer = styled.div`
  background-color: #f5f5f5;
  color: #333;
  padding: 40px 20px;
  margin: 20px auto;
  max-width: 1000px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;

  h2 {
    font-size: 2rem;
    font-weight: bold;
  }

  @media (max-width: 600px) {
    padding: 20px 10px;

    h2 {
      font-size: 1.5rem;
    }
  }
`;

function About() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    mail: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Mail enviado...");
    setFormData({ nombre: '', apellido: '', mail: '' });
  };

  return (
    <>
      <AboutContainer>
        <h2>Somos un grupo de personas alucinante, a tu servicio ...</h2>
      </AboutContainer>

      <div className="container mt-4" style={{ maxWidth: '500px' }}>
        <p>¿Querés ser parte de nuestro equipo? Envíanos tu currículum</p>
        <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              name="apellido"
              className="form-control"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mail</label>
            <input
              type="email"
              name="mail"
              className="form-control"
              value={formData.mail}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}

export default About;
