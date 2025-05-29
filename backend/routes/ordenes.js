const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ordenes ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ordenes WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  const { usuario_id, producto_id, cantidad, fecha } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ordenes (usuario_id, producto_id, cantidad, fecha) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, producto_id, cantidad, fecha]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const { usuario_id, producto_id, cantidad, fecha } = req.body;
  try {
    const result = await pool.query(
      'UPDATE ordenes SET usuario_id = $1, producto_id = $2, cantidad = $3, fecha = $4 WHERE id = $5 RETURNING *',
      [usuario_id, producto_id, cantidad, fecha, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM ordenes WHERE id = $1', [req.params.id]);
    res.json({ message: 'Orden eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
