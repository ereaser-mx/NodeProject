const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'proyectofinal1',
  password: 'Larousse',
  port: 5432,
});

module.exports = pool;
