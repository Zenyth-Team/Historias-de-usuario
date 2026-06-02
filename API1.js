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

    const producto = db.prepare('SELECT sku, nombre, precio, estado FROM productos WHERE sku = ?').get(skuUpper);

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
        mensaje: "Excepción inesperada durante el procesamiento de la solicitud."
    });
  }
});