const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dbnode'
});

db.connect((err)=>{
    if(err)throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Obtener todos los productos
app.get('/api/producto', (req, res) => {
    const sql = 'SELECT * FROM producto';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  // Crear un nuevo producto
  app.post('/api/producto', (req, res) => {
      const { nombre, precio } = req.body;
      const sql = 'INSERT INTO producto (nombre, precio) VALUES (?, ?)';
      db.query(sql, [nombre, precio], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, nombre, precio });
      });
    });
    
    // Actualizar un producto
    app.put('/api/producto/:id', (req, res) => {
      const { nombre, precio } = req.body;
      const { id } = req.params;
      const sql = 'UPDATE producto SET nombre = ?, precio = ? WHERE idproducto = ?';
      db.query(sql, [nombre, precio, id], (err, result) => {
        if (err) throw err;
        res.send({ id, nombre, precio });
      });
    });
    
    // Eliminar un producto
    app.delete('/api/producto/:id', (req, res) => {
      const { id } = req.params;
      const sql = 'DELETE FROM producto WHERE idproducto = ?';
      db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Producto eliminado', id });
      });
    });
    
    app.listen(PORT, ()=>{
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
  });