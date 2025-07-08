// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';

function ProductForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
  });

  const isEditing = initialData !== null;

  useEffect(() => {
    if (isEditing) {
      setFormData(initialData);
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: '',
      });
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); 
  };

  const filaEstilo = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    color: 'white',
  };

  const labelEstilo = {
    width: '120px',
    fontWeight: 'bold',
    color: 'white',
  };

  const inputEstilo = {
    flex: 1,
    padding: '5px',
    color: 'black',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px',
    marginRight: '10px',
  };

  const cancelButtonTypeStyle = {
    backgroundColor: '#aaa',
    color: 'black',
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '20px auto', backgroundColor: '#333', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.5)', color: 'white' }}>
      <h2>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={filaEstilo}>
          <label style={labelEstilo}>Nombre:</label>
          <input
            style={inputEstilo}
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            minLength="3"
            maxLength="50"
          />
        </div>

        <div style={filaEstilo}>
          <label style={labelEstilo}>Descripción:</label>
          <input
            style={inputEstilo}
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            minLength="10"
            maxLength="200"
          />
        </div>

        <div style={filaEstilo}>
          <label style={labelEstilo}>Precio:</label>
          <input
            style={inputEstilo}
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
          />
        </div>

        <div style={filaEstilo}>
          <label style={labelEstilo}>URL de imagen:</label>
          <input
            style={inputEstilo}
            type="url"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={buttonStyle}>
          {isEditing ? 'Guardar Cambios' : 'Agregar'}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel} style={{ ...buttonStyle, ...cancelButtonTypeStyle }}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}

export default ProductForm;