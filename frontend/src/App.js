import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsuariosList from './components/Usuarios/List';
import ProductosList from './components/Productos/List';
import ServiciosList from './components/Servicios/List';
import OrdenesList from './components/Ordenes/List';
import CategoriasList from './components/Categorias/List';
import UbicacionesList from './components/Ubicaciones/List';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/usuarios">Usuarios</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/ordenes">Órdenes</Link></li>
          <li><Link to="/categorias">Categorías</Link></li>
          <li><Link to="/ubicaciones">Ubicaciones</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/usuarios" element={<UsuariosList />} />
        <Route path="/productos" element={<ProductosList />} />
        <Route path="/servicios" element={<ServiciosList />} />
        <Route path="/ordenes" element={<OrdenesList />} />
        <Route path="/categorias" element={<CategoriasList />} />
        <Route path="/ubicaciones" element={<UbicacionesList />} />
      </Routes>
    </Router>
  );
}

export default App;
