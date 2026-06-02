// db.js
const Database = require('better-sqlite3');
const db = new Database('datos.db');

// Inicializa las tablas de ambas Historias de Usuario
db.exec(`
  CREATE TABLE IF NOT EXISTS secciones (
    id                          INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_seccion              TEXT NOT NULL,
    descripcion_de_ubicacion    TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS productos (
    id                          INTEGER PRIMARY KEY AUTOINCREMENT,
    sku                         TEXT NOT NULL UNIQUE,
    nombre                      TEXT NOT NULL,
    descripcion                 TEXT,
    precio                      REAL NOT NULL,
    stock                       INTEGER NOT NULL,
    estado                      TEXT DEFAULT 'Activo'
  );
`);

module.exports = db;