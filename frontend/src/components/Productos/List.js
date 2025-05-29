import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductosForm from './Form';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });

  const loadProductos = () => {
    axios.get('http://localhost:3000/api/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos:', err));
  };

  useEffect(() => {
    loadProductos();
  }, []);

  const handleEdit = producto => {
    setEditando(producto.id);
    setFormData(producto);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/productos/${editando}`, formData)
      .then(() => {
        loadProductos();
        setEditando(null);
        setFormData({ nombre: '', descripcion: '', precio: '' });
      })
      .catch(err => console.error('Error al actualizar producto:', err));
  };

  const handleDelete = id => {
    if (window.confirm('¿Eliminar este producto?')) {
      axios.delete(`http://localhost:3000/api/productos/${id}`)
        .then(() => loadProductos())
        .catch(err => console.error('Error al eliminar producto:', err));
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>

      {editando ? (
        <form onSubmit={handleUpdate}>
          <h3>Editar Producto</h3>
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
        <ProductosForm onAdd={loadProductos} />
      )}

      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - {producto.descripcion} - ${producto.precio}
            <button onClick={() => handleEdit(producto)}>Editar</button>
            <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosList;

