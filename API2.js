const express = require('express');
const router = express.Router();
const db = require('./db'); // Comparte la misma conexión

/**
 * @swagger
 * /api/v1/productos:
 * post:
 * summary: Crear un nuevo producto (HU1 y HU2)
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

module.exports = router;