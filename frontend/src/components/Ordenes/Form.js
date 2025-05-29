import React, { useState } from 'react';
import axios from 'axios';

const OrdenesForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    usuario_id: '',
    producto_id: '',
    servicio_id: '',
    cantidad: '',
    total: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/ordenes', formData)
      .then(() => {
        onAdd();
        setFormData({
          usuario_id: '',
          producto_id: '',
          servicio_id: '',
          cantidad: '',
          total: ''
        });
      })
      .catch(err => console.error('Error al agregar orden:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Orden</h3>
      <input
        type="number"
        name="usuario_id"
        value={formData.usuario_id}
        onChange={handleChange}
        placeholder="ID Usuario"
        required
      />
      <input
        type="number"
        name="producto_id"
        value={formData.producto_id}
        onChange={handleChange}
        placeholder="ID Producto"
        required
      />
      <input
        type="number"
        name="servicio_id"
        value={formData.servicio_id}
        onChange={handleChange}
        placeholder="ID Servicio"
        required
      />
      <input
        type="number"
        name="cantidad"
        value={formData.cantidad}
        onChange={handleChange}
        placeholder="Cantidad"
        required
      />
      <input
        type="number"
        step="0.01"
        name="total"
        value={formData.total}
        onChange={handleChange}
        placeholder="Total"
        required
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default OrdenesForm;
