import express from 'express';
import db from './database.js'; 

const app = express();
app.use(express.json()); 

app.post('/api/v1/productos', (req, res) => {
    const { sku, nombre, descripcion, precio, stock } = req.body;

    
    if (!sku || !nombre || precio === undefined || stock === undefined) {
        return res.status(400).json({
            error: "Faltan campos obligatorios en el JSON"
        });
    }

    if (precio < 0 || isNaN(precio)) {
        return res.status(400).json({
            error: "El precio no puede ser un número negativo o inválido"
        });
    }

    if (stock < 0 || isNaN(stock)) {
        return res.status(400).json({
            error: "El stock debe ser mayor o igual a 0"
        });
    }

    const query = `INSERT INTO productos (sku, nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(query, [sku, nombre, descripcion, precio, stock], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(409).json({
                    "error": "El SKU ingresado ya se encuentra registrado"
                });
            }
            return res.status(500).json({ error: "Error de servidor" });
        }
        return res.status(201).json({
            id: this.lastID, 
            sku: sku,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            stock: stock
        });
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});