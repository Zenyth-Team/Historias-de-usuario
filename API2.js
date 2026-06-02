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

module.exports = router;