import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrdenesForm from './Form';

const OrdenesList = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    usuario_id: '',
    producto_id: '',
    servicio_id: '',
    cantidad: '',
    total: ''
  });

  const loadOrdenes = () => {
    axios.get('http://localhost:3000/api/ordenes')
      .then(res => setOrdenes(res.data))
      .catch(err => console.error('Error al cargar órdenes:', err));
  };

  useEffect(() => {
    loadOrdenes();
  }, []);

  const handleEdit = orden => {
    setEditando(orden.id);
    setFormData(orden);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/ordenes/${editando}`, formData)
      .then(() => {
        loadOrdenes();
        setEditando(null);
        setFormData({
          usuario_id: '',
          producto_id: '',
          servicio_id: '',
          cantidad: '',
          total: ''
        });
      })
      .catch(err => console.error('Error al actualizar orden:', err));
  };

  const handleDelete = id => {
    if (window.confirm('¿Eliminar esta orden?')) {
      axios.delete(`http://localhost:3000/api/ordenes/${id}`)
        .then(() => loadOrdenes())
        .catch(err => console.error('Error al eliminar orden:', err));
    }
  };

  return (
    <div>
      <h2>Lista de Órdenes</h2>

      {editando ? (
        <form onSubmit={handleUpdate}>
          <h3>Editar Orden</h3>
          <input
            type="number"
            name="usuario_id"
            value={formData.usuario_id}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="producto_id"
            value={formData.producto_id}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="servicio_id"
            value={formData.servicio_id}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="0.01"
            name="total"
            value={formData.total}
            onChange={handleChange}
            required
          />
          <button type="submit">Actualizar</button>
          <button onClick={() => setEditando(null)}>Cancelar</button>
        </form>
      ) : (
        <OrdenesForm onAdd={loadOrdenes} />
      )}

      <ul>
        {ordenes.map(orden => (
          <li key={orden.id}>
            Usuario: {orden.usuario_id}, Producto: {orden.producto_id}, Servicio: {orden.servicio_id}, Cantidad: {orden.cantidad}, Total: ${orden.total}
            <button onClick={() => handleEdit(orden)}>Editar</button>
            <button onClick={() => handleDelete(orden.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdenesList;
