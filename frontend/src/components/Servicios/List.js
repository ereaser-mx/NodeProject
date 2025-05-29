import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiciosForm from './Form';

const ServiciosList = () => {
  const [servicios, setServicios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });

  const loadServicios = () => {
    axios.get('http://localhost:3000/api/servicios')
      .then(res => setServicios(res.data))
      .catch(err => console.error('Error al cargar servicios:', err));
  };

  useEffect(() => {
    loadServicios();
  }, []);

  const handleEdit = servicio => {
    setEditando(servicio.id);
    setFormData(servicio);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/servicios/${editando}`, formData)
      .then(() => {
        loadServicios();
        setEditando(null);
        setFormData({ nombre: '', descripcion: '', precio: '' });
      })
      .catch(err => console.error('Error al actualizar servicio:', err));
  };

  const handleDelete = id => {
    if (window.confirm('¿Eliminar este servicio?')) {
      axios.delete(`http://localhost:3000/api/servicios/${id}`)
        .then(() => loadServicios())
        .catch(err => console.error('Error al eliminar servicio:', err));
    }
  };

  return (
    <div>
      <h2>Lista de Servicios</h2>

      {editando ? (
        <form onSubmit={handleUpdate}>
          <h3>Editar Servicio</h3>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
          <button type="submit">Actualizar</button>
          <button onClick={() => setEditando(null)}>Cancelar</button>
        </form>
      ) : (
        <ServiciosForm onAdd={loadServicios} />
      )}

      <ul>
        {servicios.map(servicio => (
          <li key={servicio.id}>
            {servicio.nombre} - {servicio.descripcion} - ${servicio.precio}
            <button onClick={() => handleEdit(servicio)}>Editar</button>
            <button onClick={() => handleDelete(servicio.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiciosList;

