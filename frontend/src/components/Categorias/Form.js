import React, { useState } from 'react';
import axios from 'axios';

const CategoriasForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/categorias', formData)
      .then(() => {
        onAdd();
        setFormData({ nombre: '', descripcion: '' });
      })
      .catch(err => console.error('Error al agregar categoría:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Categoría</h3>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        rows="3"
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default CategoriasForm;
