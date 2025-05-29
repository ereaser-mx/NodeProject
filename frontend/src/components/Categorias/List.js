import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoriasForm from './Form';

const CategoriasList = () => {
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  const cargarCategorias = () => {
    axios.get('http://localhost:3000/api/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error('Error al cargar categorías:', err));
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const manejarEditar = categoria => {
    setEditando(categoria.id);
    setFormData({ nombre: categoria.nombre, descripcion: categoria.descripcion });
  };

  const manejarCambio = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const manejarActualizar = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/categorias/${editando}`, formData)
      .then(() => {
        cargarCategorias();
        setEditando(null);
        setFormData({ nombre: '', descripcion: '' });
      })
      .catch(err => console.error('Error al actualizar categoría:', err));
  };

  const manejarEliminar = id => {
    if (window.confirm('¿Eliminar esta categoría?')) {
      axios.delete(`http://localhost:3000/api/categorias/${id}`)
        .then(() => cargarCategorias())
        .catch(err => console.error('Error al eliminar categoría:', err));
    }
  };

  return (
    <div>
      <h2>Categorías</h2>

      {editando ? (
        <form onSubmit={manejarActualizar}>
          <h3>Editar Categoría</h3>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={manejarCambio}
            required
          />
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={manejarCambio}
            rows="3"
          />
          <button type="submit">Actualizar</button>
          <button onClick={() => setEditando(null)}>Cancelar</button>
        </form>
      ) : (
        <CategoriasForm onAdd={cargarCategorias} />
      )}

      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>
            <strong>{categoria.nombre}</strong>: {categoria.descripcion}
            <button onClick={() => manejarEditar(categoria)}>Editar</button>
            <button onClick={() => manejarEliminar(categoria.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriasList;

