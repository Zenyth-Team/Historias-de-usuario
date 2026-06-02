const express = require('express');
const db      = require('./db');

// --- LIBRERÍAS DE SWAGGER ---
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app     = express();
app.use(express.json());

// --- CONFIGURACIÓN DE SWAGGER ---
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { 
      title: 'API Inventario Ferretería', 
      version: '1.0.0',
      description: 'API para gestionar el inventario y las secciones de la ferretería' 
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local' },
      { url: 'https://cursos-api-krbv.onrender.com/', description: 'Production' }
    ]
  },
  apis: ['./index.js']
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ==========================================
// RUTAS DE LA FERRETERÍA
// ==========================================

/**
 * @swagger
 * /secciones:
 *   get:
 *    summary: Obtener todas las secciones
 *    responses:
 *      200:
 *        description: Lista de las secciones de la ferretería
 */
app.get('/secciones', (req, res) => {
  const secciones = db.prepare('SELECT * FROM secciones').all();
  res.json(secciones);
});

/**
 * @swagger
 * /secciones:
 *   post:
 *    summary: Crear una nueva sección
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nombre_seccion:
 *                type: string
 *              descripcion_de_ubicacion:
 *                type: string
 *    responses:
 *      201:
 *        description: Sección creada exitosamente
 */
app.post('/secciones', (req, res) => {
  const { nombre_seccion, descripcion_de_ubicacion } = req.body;
  const result = db.prepare('INSERT INTO secciones (nombre_seccion, descripcion_de_ubicacion) VALUES (?, ?)').run(nombre_seccion, descripcion_de_ubicacion);
  res.status(201).json({ id: result.lastInsertRowid, nombre_seccion, descripcion_de_ubicacion });
});

/**
 * @swagger
 * /secciones/{id}:
 *   put:
 *    summary: Actualizar una sección existente
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nombre_seccion:
 *                type: string
 *              descripcion_de_ubicacion:
 *                type: string
 *    responses:
 *      200:
 *        description: Sección actualizada
 *      404:
 *        description: Sección no encontrada
 */
app.put('/secciones/:id', (req, res) => {
  const { id } = req.params;
  const { nombre_seccion, descripcion_de_ubicacion } = req.body;
  const result = db.prepare('UPDATE secciones SET nombre_seccion = ?, descripcion_de_ubicacion = ? WHERE id = ?').run(nombre_seccion, descripcion_de_ubicacion, id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Sección no encontrada' });
  }
  res.json({ id, nombre_seccion, descripcion_de_ubicacion });
});

/**
 * @swagger
 * /secciones/{id}:
 *   get:
 *    summary: Obtener una sección específica por ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Datos de la sección solicitada
 *      404:
 *        description: Sección no encontrada
 */
app.get('/secciones/:id', (req, res) => {
  const { id } = req.params;
  const seccion = db.prepare('SELECT * FROM secciones WHERE id = ?').get(id);
  
  if (!seccion) {
    return res.status(404).json({ error: 'Sección no encontrada' });
  }
  res.json(seccion);
});

/**
 * @swagger
 * /secciones/{id}:
 *   delete:
 *    summary: Eliminar una sección
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Sección eliminada correctamente
 *      404:
 *        description: Sección no encontrada
 */
app.delete('/secciones/:id', (req, res) => {
  const { id } = req.params;
  const result = db.prepare('DELETE FROM secciones WHERE id = ?').run(id);
  
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Sección no encontrada' });
  }
  res.json({ message: 'Sección eliminada correctamente' });
});

/**
 * @swagger
 * /api/v1/productos/sku/{sku}:
 * get:
 * summary: Consultar precio de un producto por código SKU
 * parameters:
 * - in: path
 * name: sku
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Información del producto encontrada
 * 400:
 * description: Formato de SKU inválido
 * 404:
 * description: Producto no encontrado
 * 500:
 * description: Error interno del servidor
 */
app.get('/api/v1/productos/sku/:sku', (req, res) => {
  try {
    const { sku } = req.params;
    
    const skuUpper = sku.toUpperCase();

    const formatoValido = /^[A-Z0-9-]+$/i.test(skuUpper);
    if (!formatoValido || skuUpper.length < 3 || skuUpper.length > 15) {
        return res.status(400).json({
            error: "Bad Request",
            mensaje: "El formato del SKU es inválido, longitud incorrecta o caracteres no permitidos."
        });
    }

    if (skuUpper === "ERROR-500") {
        throw new Error("Simulando caída del servidor para recolectar evidencia de QA.");
    }

    // Consulta a la Base de Datos REAL usando SQLite
    const producto = db.prepare('SELECT sku, nombre, precio, estado FROM productos WHERE sku = ?').get(skuUpper);

    // CA2: Producto No Encontrado
    if (!producto) {
        return res.status(404).json({
            error: "Not Found",
            mensaje: "El producto con el SKU especificado no fue encontrado en la base de datos."
        });
    }

    return res.status(200).json({
        sku: producto.sku,
        nombre: producto.nombre,
        precio: producto.precio,
        estado: producto.estado
    });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return res.status(500).json({
        error: "Internal Server Error",
        mensaje: "Ocurrió una excepción inesperada durante el procesamiento de la solicitud."
    });
  }
});


app.listen(3000, () => {
  console.log('API corriendo en http://localhost:3000');
  console.log('Documentación Swagger disponible en http://localhost:3000/api-docs');
});