import React, { useState } from 'react';
import axios from 'axios';

const UsuariosForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/usuarios', formData)
      .then(res => {
        onAdd(); // para recargar lista
        setFormData({ nombre: '', email: '', telefono: '' });
      })
      .catch(err => console.error('Error al agregar usuario:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Usuario</h3>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default UsuariosForm;
