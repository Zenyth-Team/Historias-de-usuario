// index.js
const express = require('express');
const db      = require('./db');

// Importar los módulos de las APIs independientes
const API2 = require('./API2');
const API1 = require('./API1');

const app = express();
app.use(express.json());

// --- CONFIGURACIÓN DE SWAGGER ---
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'API Inventario Ferretería', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./index.js', './API2.js', './API1.js'] // Swagger leerá la documentación de todos los archivos
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ==========================================
// RUTAS PROPIAS DE INDEX (Ej: Secciones)
// ==========================================
app.get('/secciones', (req, res) => {
  const secciones = db.prepare('SELECT * FROM secciones').all();
  res.json(secciones);
});

app.post('/secciones', (req, res) => {
  const { nombre_seccion, descripcion_de_ubicacion } = req.body;
  const result = db.prepare('INSERT INTO secciones (nombre_seccion, descripcion_de_ubicacion) VALUES (?, ?)').run(nombre_seccion, descripcion_de_ubicacion);
  res.status(201).json({ id: result.lastInsertRowid, nombre_seccion, descripcion_de_ubicacion });
});

// (Mantén aquí el resto de tus rutas PUT, GET por id y DELETE de secciones...)


// ==========================================
// ENLAZAR LAS APIS DE LAS OTRAS HISTORIAS DE USUARIO
// ==========================================
// Todo lo que esté en API2 y API1 tendrá el prefijo /api/v1
app.use('/api/v1', API2);
app.use('/api/v1', API1);


// --- INICIO ÚNICO DEL SERVIDOR ---
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000 con todas las APIs integradas modularmente.");
});