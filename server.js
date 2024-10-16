const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   // Cambia esto según tu configuración
  password: '123456',
  database: 'dbnode'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Rutas CRUD

// Obtener todos los usuarios
app.get('/api/posts', (req, res) => {
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// Crear un nuevo usuario
app.post('/api/posts', (req, res) => {
    const { titulo, descripcion } = req.body;
    const sql = 'INSERT INTO posts (titulo, descripcion) VALUES (?, ?)';
    db.query(sql, [titulo, descripcion], (err, result) => {
      if (err) throw err;
      res.send({ id: result.insertId, titulo, descripcion });
    });
  });
  
  // Actualizar un usuario
  app.put('/api/posts/:id', (req, res) => {
    const { titulo, descripcion } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE posts SET titulo = ?, descripcion = ? WHERE idposts = ?';
    db.query(sql, [titulo, descripcion, id], (err, result) => {
      if (err) throw err;
      res.send({ id, titulo, descripcion });
    });
  });
  
  // Eliminar un usuario
  app.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM posts WHERE idposts = ?';
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send({ message: 'Post eliminado', id });
    });
  });
  
  app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});