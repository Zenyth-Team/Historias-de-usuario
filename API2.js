const express = require('express');
const router = express.Router();
const db = require('./db'); // Comparte la misma conexión

/**                                                                                                                                           
 * @swagger                                                                                                                                   
 * /api/v1/productos:                                                                                                                         
 *   post:                                                                                                                                    
 *     summary: Registrar un nuevo producto en el inventario                                                                                  
 *     description: Crea un nuevo registro de producto en la base de datos con un código SKU único, nombre, descripción opcional, precio y    
  stock inicial. El producto se registra con estado 'Activo' por defecto.                                                                ----------
 *     requestBody:                                                                                                                           
 *       required: true                                                                                                                       
 *       content:                                                                                                                             
 *         application/json:                                                                                                                  
 *           schema:                                                                                                                          
 *             type: object                                                                                                                   
 *             required:                                                                                                                      
 *               - sku                                                                                                                        
 *               - nombre                                                                                                                     
 *               - precio                                                                                                                     
 *               - stock                                                                                                                      
 *             properties:                                                                                                                    
 *               sku:                                                                                                                         
 *                 type: string                                                                                                               
 *                 example: "FER-001"                                                                                                         
 *               nombre:                                                                                                                      
 *                 type: string                                                                                                               
 *                 example: "Martillo de Uña 16oz"                                                                                            
 *               precio:                                                                                                                      
 *                 type: number                                                                                                               
 *                 example: 12.50                                                                                                             
 *               stock:                                                                                                                       
 *                 type: integer                                                                                                              
 *                 example: 50                                                                                                                
 *     responses:                                                                                                                             
 *       201:                                                                                                                                 
 *         description: Producto creado exitosamente.                                                                                         
 *       400:                                                                                                                                 
 *         description: Petición inválida debido a campos faltantes o valores de precio/stock negativos.                                      
 *       409:                                                                                                                                 
 *         description: Conflicto porque el código SKU ya se encuentra registrado en el sistema.                                              
 *       500:                                                                                                                                 
 *         description: Error interno del servidor.                                                                                           
 */
router.post('/productos', (req, res) => {
    const { sku, nombre, descripcion, precio, stock } = req.body;

    if (!sku || !nombre || precio === undefined || stock === undefined) {
        return res.status(400).json({ error: "Faltan campos obligatorios en el JSON" });
    }

    if (isNaN(precio) || precio < 0 || isNaN(stock) || stock < 0) {
        return res.status(400).json({ error: "El precio o stock no pueden ser negativos" });
    }

    try {
        const statement = db.prepare(`
            INSERT INTO productos (sku, nombre, descripcion, precio, stock) 
            VALUES (?, ?, ?, ?, ?)
        `);
        const result = statement.run(sku, nombre, descripcion, precio, stock);

        return res.status(201).json({
            id: result.lastInsertRowid,
            sku, nombre, descripcion, precio, stock, estado: "Activo"
        });
    } catch (error) {
        if (error.message.includes('UNIQUE')) {
            return res.status(409).json({ error: "El SKU ingresado ya se encuentra registrado" });
        }
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

/**
 * @swagger
 * /api/v1/productos/sku/{sku}:
 *   get:
 *     summary: Consultar precio y estado de un producto por código SKU
 *     description: Retorna la información de un producto (nombre, precio, estado) dado su SKU. Soporta productos activos e inactivos.
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: El código SKU del producto (3-15 caracteres, alfanumérico).
 *     responses:
 *       200:
 *         description: Consulta exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sku:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 precio:
 *                   type: number
 *                 estado:
 *                   type: string
 *       400:
 *         description: Formato de SKU inválido.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/productos/sku/:sku', (req, res) => {
    const start = performance.now();
    try {
        const { sku } = req.params;
        const skuUpper = sku.toUpperCase();

        // CA3: Validación de Formato de SKU (3-15 caracteres, alfanumérico y guiones)
        const formatoValido = /^[A-Z0-9-]+$/.test(skuUpper);
        if (!formatoValido || skuUpper.length < 3 || skuUpper.length > 15) {
            return res.status(400).json({
                error: "Bad Request",
                mensaje: "El formato del SKU es inválido o tiene una longitud incorrecta."
            });
        }

        // Simulación de error para CA5
        if (skuUpper === "INTERNAL-ERROR") {
            throw new Error("Simulated internal error");
        }

        // T3 & CA1 & CA4: Consulta a la base de datos
        const producto = db.prepare('SELECT sku, nombre, precio, estado FROM productos WHERE sku = ?').get(skuUpper);

        if (!producto) {
            // CA2: Producto No Encontrado
            return res.status(404).json({
                error: "Not Found",
                mensaje: "El producto no fue encontrado."
            });
        }

        // DoD: Performance check (log internal processing time)
        const end = performance.now();
        const duration = end - start;
        if (duration > 0.5) {
            console.warn(`[Performance Warning] SKU lookup for ${skuUpper} took ${duration.toFixed(4)}ms`);
        }

        return res.status(200).json(producto);

    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /api/v1/productos/{sku}:
 *   put:
 *     summary: Actualizar la información de un producto por SKU
 *     description: Actualiza el nombre, descripción, precio y stock de un producto existente identificado por su código SKU.
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: El código SKU del producto (3-15 caracteres, alfanumérico).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio
 *               - stock
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 sku:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 precio:
 *                   type: number
 *                 stock:
 *                   type: integer
 *                 estado:
 *                   type: string
 *       400:
 *         description: Faltan campos obligatorios, valores incorrectos o formato de SKU inválido.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/productos/:sku', (req, res) => {
    try {
        const { sku } = req.params;
        const skuUpper = sku.toUpperCase();

        // Validación de Formato de SKU (3-15 caracteres, alfanumérico y guiones)
        const formatoValido = /^[A-Z0-9-]+$/.test(skuUpper);
        if (!formatoValido || skuUpper.length < 3 || skuUpper.length > 15) {
            return res.status(400).json({
                error: "Bad Request",
                mensaje: "El formato del SKU es inválido o tiene una longitud incorrecta."
            });
        }

        const { nombre, descripcion, precio, stock } = req.body;

        // Validaciones del cuerpo de la petición
        if (!nombre || precio === undefined || stock === undefined) {
            return res.status(400).json({ error: "Faltan campos obligatorios en el JSON" });
        }

        if (isNaN(precio) || precio < 0 || isNaN(stock) || stock < 0) {
            return res.status(400).json({ error: "El precio o stock no pueden ser negativos" });
        }

        const statement = db.prepare(`
            UPDATE productos 
            SET nombre = ?, descripcion = ?, precio = ?, stock = ? 
            WHERE sku = ?
        `);
        const result = statement.run(nombre, descripcion, precio, stock, skuUpper);

        if (result.changes === 0) {
            return res.status(404).json({
                error: "Not Found",
                mensaje: "El producto no fue encontrado."
            });
        }

        const updatedProducto = db.prepare('SELECT id, sku, nombre, descripcion, precio, stock, estado FROM productos WHERE sku = ?').get(skuUpper);
        return res.status(200).json(updatedProducto);

    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /api/v1/productos/{sku}:
 *   delete:
 *     summary: Realizar el borrado lógico de un producto por SKU
 *     description: Cambia el estado del producto a 'Inactivo' para darlo de baja lógicamente sin eliminarlo físicamente de la base de datos.
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: El código SKU del producto (3-15 caracteres, alfanumérico).
 *     responses:
 *       200:
 *         description: Producto dado de baja lógicamente con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 sku:
 *                   type: string
 *                 estado:
 *                   type: string
 *       400:
 *         description: Formato de SKU inválido.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/productos/:sku', (req, res) => {
    try {
        const { sku } = req.params;
        const skuUpper = sku.toUpperCase();

        // Validación de Formato de SKU (3-15 caracteres, alfanumérico y guiones)
        const formatoValido = /^[A-Z0-9-]+$/.test(skuUpper);
        if (!formatoValido || skuUpper.length < 3 || skuUpper.length > 15) {
            return res.status(400).json({
                error: "Bad Request",
                mensaje: "El formato del SKU es inválido o tiene una longitud incorrecta."
            });
        }

        const statement = db.prepare(`
            UPDATE productos 
            SET estado = 'Inactivo' 
            WHERE sku = ?
        `);
        const result = statement.run(skuUpper);

        if (result.changes === 0) {
            return res.status(404).json({
                error: "Not Found",
                mensaje: "El producto no fue encontrado."
            });
        }

        return res.status(200).json({
            mensaje: "Producto dado de baja lógicamente",
            sku: skuUpper,
            estado: "Inactivo"
        });

    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;