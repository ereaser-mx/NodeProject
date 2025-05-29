import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsuariosForm from './Form';

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null); // ID del usuario en edición
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });

  const loadUsuarios = () => {
    axios.get('http://localhost:3000/api/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al cargar usuarios:', err));
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const handleEdit = (usuario) => {
    setEditando(usuario.id);
    setFormData(usuario);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/usuarios/${editando}`, formData)
      .then(() => {
        loadUsuarios();
        setEditando(null);
        setFormData({ nombre: '', email: '', telefono: '' });
      })
      .catch(err => console.error('Error al actualizar usuario:', err));
  };
  const handleDelete = (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    axios.delete(`http://localhost:3000/api/usuarios/${id}`)
      .then(() => {
        loadUsuarios(); // recarga la lista
      })
      .catch(err => console.error('Error al eliminar usuario:', err));
  }
};

  return (
    <div>
      <h2>Lista de Usuarios</h2>

      {editando ? (
        <form onSubmit={handleUpdate}>
          <h3>Editar Usuario</h3>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <button type="submit">Actualizar</button>
          <button onClick={() => setEditando(null)}>Cancelar</button>
          <ul>
  {usuarios.map(usuario => (
    <li key={usuario.id}>
      {usuario.nombre} - {usuario.email} - {usuario.telefono}
      <button onClick={() => handleEdit(usuario)}>Editar</button>
      <button onClick={() => handleDelete(usuario.id)}>Eliminar</button>
    </li>
  ))}
</ul>

        </form>
      ) : (
        <UsuariosForm onAdd={loadUsuarios} />
      )}

      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.nombre} - {usuario.email} - {usuario.telefono}
            <button onClick={() => handleEdit(usuario)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuariosList;
