import React, { useState } from 'react';
import axios from 'axios';

const UbicacionesForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/ubicaciones', formData)
      .then(() => {
        onAdd();
        setFormData({ nombre: '', direccion: '' });
      })
      .catch(err => console.error('Error al agregar ubicación:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Ubicación</h3>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={formData.direccion}
        onChange={handleChange}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default UbicacionesForm;
