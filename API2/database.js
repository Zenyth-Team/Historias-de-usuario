import express from 'express';
import { modeloProducto } from './database.js';

const app = express();
app.use(express.json());

app.post('/api/v1/productos', async (req, res) => {
    const { sku, nombre, descripcion, precio, stock } = req.body;


    if (!sku || !nombre || precio === undefined || stock === undefined) {
        return res.status(400).json({
            error: "Faltan campos obligatorios en el JSON"
        });
    }

    if (isNaN(precio) || precio < 0) {
        return res.status(400).json({
            error: "El precio no puede ser un número negativo o inválido"
        });
    }

    if (isNaN(stock) || stock < 0) {
        return res.status(400).json({
            error: "El stock debe ser mayor o igual a 0"
        });
    }

    try {
        const productoCreado = await modeloProducto.insertar({ 
            sku, 
            nombre, 
            descripcion, 
            precio, 
            stock 
        });

        return res.status(201).json(productoCreado);

    } catch (error) {
        if (error.message.includes('UNIQUE')) {
            return res.status(409).json({
                error: "El SKU ingresado ya se encuentra registrado"
            });
        }

        return res.status(500).json({ 
            error: "Error interno del servidor" 
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});