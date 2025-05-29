import React, { useState } from 'react';
import axios from 'axios';

const ServiciosForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/servicios', formData)
      .then(() => {
        onAdd();
        setFormData({ nombre: '', descripcion: '', precio: '' });
      })
      .catch(err => console.error('Error al agregar servicio:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Servicio</h3>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="text"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        required
      />
      <input
        type="number"
        name="precio"
        value={formData.precio}
        onChange={handleChange}
        placeholder="Precio"
        required
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default ServiciosForm;
