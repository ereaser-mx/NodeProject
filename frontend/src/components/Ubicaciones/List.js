import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UbicacionesForm from './Form';

const UbicacionesList = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: ''
  });

  const cargarUbicaciones = () => {
    axios.get('http://localhost:3000/api/ubicaciones')
      .then(res => setUbicaciones(res.data))
      .catch(err => console.error('Error al cargar ubicaciones:', err));
  };

  useEffect(() => {
    cargarUbicaciones();
  }, []);

  const manejarEditar = ubicacion => {
    setEditando(ubicacion.id);
    setFormData({ nombre: ubicacion.nombre, direccion: ubicacion.direccion });
  };

  const manejarCambio = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const manejarActualizar = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/ubicaciones/${editando}`, formData)
      .then(() => {
        cargarUbicaciones();
        setEditando(null);
        setFormData({ nombre: '', direccion: '' });
      })
      .catch(err => console.error('Error al actualizar ubicación:', err));
  };

  const manejarEliminar = id => {
    if (window.confirm('¿Eliminar esta ubicación?')) {
      axios.delete(`http://localhost:3000/api/ubicaciones/${id}`)
        .then(() => cargarUbicaciones())
        .catch(err => console.error('Error al eliminar ubicación:', err));
    }
  };

  return (
    <div>
      <h2>Ubicaciones</h2>

      {editando ? (
        <form onSubmit={manejarActualizar}>
          <h3>Editar Ubicación</h3>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={manejarCambio}
            required
          />
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={manejarCambio}
          />
          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
        </form>
      ) : (
        <UbicacionesForm onAdd={cargarUbicaciones} />
      )}

      <ul>
        {ubicaciones.map(ubicacion => (
          <li key={ubicacion.id}>
            <strong>{ubicacion.nombre}</strong>: {ubicacion.direccion}
            <button onClick={() => manejarEditar(ubicacion)}>Editar</button>
            <button onClick={() => manejarEliminar(ubicacion.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UbicacionesList;

