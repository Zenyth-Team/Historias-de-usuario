const db = require('./db');

try {
  db.prepare("INSERT OR IGNORE INTO productos (sku, nombre, descripcion, precio, stock, estado) VALUES ('TEST-SKU-01', 'Producto Test Activo', 'Descripción', 10.5, 100, 'Activo')").run();
  db.prepare("INSERT OR IGNORE INTO productos (sku, nombre, descripcion, precio, stock, estado) VALUES ('TEST-SKU-02', 'Producto Test Inactivo', 'Descripción', 20.0, 50, 'Inactivo')").run();
  console.log("Database seeded successfully.");
} catch (error) {
  console.error("Error seeding database:", error);
}
