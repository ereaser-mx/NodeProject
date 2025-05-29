const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicios ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicios WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  const { nombre, descripcion, costo } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO servicios (nombre, descripcion, costo) VALUES ($1, $2, $3) RETURNING *',
      [nombre, descripcion, costo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { nombre, descripcion, costo } = req.body;
  try {
    const result = await pool.query(
      'UPDATE servicios SET nombre = $1, descripcion = $2, costo = $3 WHERE id = $4 RETURNING *',
      [nombre, descripcion, costo, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM servicios WHERE id = $1', [req.params.id]);
    res.json({ message: 'Servicio eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
