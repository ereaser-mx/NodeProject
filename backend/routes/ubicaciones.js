const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todas las ubicaciones
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ubicaciones ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una ubicación por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ubicaciones WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva ubicación
router.post('/', async (req, res) => {
  const { direccion, ciudad, estado, pais } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ubicaciones (direccion, ciudad, estado, pais) VALUES ($1, $2, $3, $4) RETURNING *',
      [direccion, ciudad, estado, pais]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una ubicación
router.put('/:id', async (req, res) => {
  const { direccion, ciudad, estado, pais } = req.body;
  try {
    const result = await pool.query(
      'UPDATE ubicaciones SET direccion = $1, ciudad = $2, estado = $3, pais = $4 WHERE id = $5 RETURNING *',
      [direccion, ciudad, estado, pais, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una ubicación
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM ubicaciones WHERE id = $1', [req.params.id]);
    res.json({ message: 'Ubicación eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
