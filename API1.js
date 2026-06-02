const express = require('express');
const router = express.Router();
const db = require('./db');

/**
 * @swagger
 * /api/v1/productos/sku/{sku}:
 *    get:
 *     summary: Consultar precio de un producto por código SKU
 */
router.get('/productos/sku/:sku', (req, res) => {
  try {
    const { sku } = req.params;
    const skuUpper = sku.toUpperCase();

    const formatoValido = /^[A-Z0-9-]+$/i.test(skuUpper);
    if (!formatoValido || skuUpper.length < 3 || skuUpper.length > 15) {
        return res.status(400).json({
            error: "Bad Request",
            mensaje: "El formato del SKU es inválido."
        });
    }

    if (skuUpper === "ERROR-500") {
        throw new Error("Simulando caída del servidor.");
    }

    const producto = db.prepare('SELECT sku, nombre, precio, estado FROM productos WHERE sku = ?').get(skuUpper);

    if (!producto) {
        return res.status(404).json({
            error: "Not Found",
            mensaje: "El producto no fue encontrado."
        });
    }

    return res.status(200).json(producto);

  } catch (error) {
    console.error("Error en el servidor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;