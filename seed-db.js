// seed-db.js - Script para insertar 100 productos de ferretería
const db = require('./db');

const productos = [
  { sku: 'FER-001', nombre: 'Martillo 16oz', descripcion: 'Martillo de garra con mango de fibra', precio: 25.00, stock: 45 },
  { sku: 'FER-002', nombre: 'Martillo 20oz', descripcion: 'Martillo de garra con mango de fibra reforzado', precio: 32.00, stock: 38 },
  { sku: 'FER-003', nombre: 'Destornillador Phillips', descripcion: 'Destornillador Phillips cabeza plana', precio: 8.50, stock: 120 },
  { sku: 'FER-004', nombre: 'Destornillador Plano', descripcion: 'Destornillador plano de acero inoxidable', precio: 7.00, stock: 150 },
  { sku: 'FER-005', nombre: 'Juego 12 Destornilladores', descripcion: 'Juego completo de 12 destornilladores variados', precio: 45.00, stock: 25 },
  { sku: 'FER-006', nombre: 'Taladro Inalámbrico', descripcion: 'Taladro 20V con batería incluida', precio: 89.99, stock: 15 },
  { sku: 'FER-007', nombre: 'Broca Acero 1/4', descripcion: 'Broca de acero para metal 1/4 pulgada', precio: 3.50, stock: 200 },
  { sku: 'FER-008', nombre: 'Broca Acero 3/8', descripcion: 'Broca de acero para metal 3/8 pulgada', precio: 4.00, stock: 180 },
  { sku: 'FER-009', nombre: 'Set 21 Brocas', descripcion: 'Set de 21 brocas variadas para madera y metal', precio: 22.00, stock: 50 },
  { sku: 'FER-010', nombre: 'Nivel Espíritu 24"', descripcion: 'Nivel de burbuja de 24 pulgadas', precio: 18.00, stock: 35 },
  { sku: 'FER-011', nombre: 'Nivel Espíritu 30"', descripcion: 'Nivel de burbuja de 30 pulgadas', precio: 25.00, stock: 28 },
  { sku: 'FER-012', nombre: 'Cinta Métrica 25ft', descripcion: 'Cinta métrica retráctil 25 pies', precio: 12.00, stock: 80 },
  { sku: 'FER-013', nombre: 'Cinta Métrica 50ft', descripcion: 'Cinta métrica retráctil 50 pies', precio: 18.00, stock: 60 },
  { sku: 'FER-014', nombre: 'Escuadra de Acero', descripcion: 'Escuadra de acero 7 pulgadas', precio: 14.00, stock: 42 },
  { sku: 'FER-015', nombre: 'Llave Inglesa 8"', descripcion: 'Llave inglesa de 8 pulgadas', precio: 15.00, stock: 55 },
  { sku: 'FER-016', nombre: 'Llave Inglesa 10"', descripcion: 'Llave inglesa de 10 pulgadas', precio: 18.50, stock: 48 },
  { sku: 'FER-017', nombre: 'Juego Llaves Fijas', descripcion: 'Juego 10 llaves fijas 6-22mm', precio: 35.00, stock: 32 },
  { sku: 'FER-018', nombre: 'Juego Llaves Éster', descripcion: 'Juego 16 llaves éster cromadas', precio: 48.00, stock: 22 },
  { sku: 'FER-019', nombre: 'Clavo 2"', descripcion: 'Caja de 100 clavos 2 pulgadas', precio: 5.00, stock: 200 },
  { sku: 'FER-020', nombre: 'Clavo 3"', descripcion: 'Caja de 100 clavos 3 pulgadas', precio: 6.50, stock: 180 },
  { sku: 'FER-021', nombre: 'Tornillo Madera 1"', descripcion: 'Caja 500 tornillos madera 1 pulgada', precio: 8.00, stock: 150 },
  { sku: 'FER-022', nombre: 'Tornillo Madera 1.5"', descripcion: 'Caja 500 tornillos madera 1.5 pulgadas', precio: 10.00, stock: 140 },
  { sku: 'FER-023', nombre: 'Tornillo Madera 2"', descripcion: 'Caja 500 tornillos madera 2 pulgadas', precio: 12.00, stock: 130 },
  { sku: 'FER-024', nombre: 'Tornillo Máquina', descripcion: 'Caja 200 tornillos máquina variados', precio: 15.00, stock: 100 },
  { sku: 'FER-025', nombre: 'Tuerca Varilla 1/4"', descripcion: 'Bolsa 100 tuercas 1/4 pulgada', precio: 4.50, stock: 250 },
  { sku: 'FER-026', nombre: 'Arandela Acero', descripcion: 'Bolsa 100 arandelas acero 1/4"', precio: 5.00, stock: 280 },
  { sku: 'FER-027', nombre: 'Anclaje Pared', descripcion: 'Caja 50 anclajes para pared', precio: 6.00, stock: 160 },
  { sku: 'FER-028', nombre: 'Sierra Manual', descripcion: 'Sierra manual para madera 16"', precio: 22.00, stock: 30 },
  { sku: 'FER-029', nombre: 'Segueta', descripcion: 'Segueta para metal 12"', precio: 11.00, stock: 50 },
  { sku: 'FER-030', nombre: 'Lijadora Orbital', descripcion: 'Lijadora orbital 240W', precio: 65.00, stock: 18 },
  { sku: 'FER-031', nombre: 'Papel Lija 80', descripcion: 'Pack 10 hojas papel lija grano 80', precio: 8.00, stock: 120 },
  { sku: 'FER-032', nombre: 'Papel Lija 120', descripcion: 'Pack 10 hojas papel lija grano 120', precio: 8.50, stock: 115 },
  { sku: 'FER-033', nombre: 'Papel Lija 220', descripcion: 'Pack 10 hojas papel lija grano 220', precio: 9.00, stock: 110 },
  { sku: 'FER-034', nombre: 'Esmeril Angular', descripcion: 'Esmeril angular 125mm 900W', precio: 55.00, stock: 12 },
  { sku: 'FER-035', nombre: 'Disco Corte Metal', descripcion: 'Disco de corte para metal 125mm', precio: 3.50, stock: 200 },
  { sku: 'FER-036', nombre: 'Disco Desbaste', descripcion: 'Disco de desbaste 125mm', precio: 4.00, stock: 180 },
  { sku: 'FER-037', nombre: 'Protección Oídos', descripcion: 'Protector auditivo para uso industrial', precio: 12.00, stock: 90 },
  { sku: 'FER-038', nombre: 'Gafas Seguridad', descripcion: 'Gafas de seguridad con protección UV', precio: 15.00, stock: 100 },
  { sku: 'FER-039', nombre: 'Guantes Trabajo', descripcion: 'Guantes de trabajo algodón y PVC', precio: 8.00, stock: 200 },
  { sku: 'FER-040', nombre: 'Casco Seguridad', descripcion: 'Casco de seguridad amarillo ANSI', precio: 22.00, stock: 60 },
  { sku: 'FER-041', nombre: 'Mascarilla N95', descripcion: 'Caja 50 mascarillas N95 desechables', precio: 35.00, stock: 45 },
  { sku: 'FER-042', nombre: 'Chaleco Reflectivo', descripcion: 'Chaleco reflectivo naranja fluorescente', precio: 18.00, stock: 55 },
  { sku: 'FER-043', nombre: 'Escalera Aluminio 6ft', descripcion: 'Escalera de aluminio 6 pies', precio: 89.00, stock: 10 },
  { sku: 'FER-044', nombre: 'Escalera Aluminio 8ft', descripcion: 'Escalera de aluminio 8 pies', precio: 125.00, stock: 8 },
  { sku: 'FER-045', nombre: 'Escalera Aluminio 10ft', descripcion: 'Escalera de aluminio 10 pies', precio: 165.00, stock: 6 },
  { sku: 'FER-046', nombre: 'Andamio Portátil', descripcion: 'Andamio de trabajo portátil 4x4ft', precio: 250.00, stock: 4 },
  { sku: 'FER-047', nombre: 'Cinturón Herramientas', descripcion: 'Cinturón de herramientas con bolsillos', precio: 38.00, stock: 25 },
  { sku: 'FER-048', nombre: 'Bolsa Herramientas', descripcion: 'Bolsa de lona para herramientas 17"', precio: 45.00, stock: 18 },
  { sku: 'FER-049', nombre: 'Caja Herramientas Metal', descripcion: 'Caja metálica con 300 herramientas', precio: 88.00, stock: 12 },
  { sku: 'FER-050', nombre: 'Organizador Pared', descripcion: 'Panel organizador con ganchos', precio: 32.00, stock: 35 },
  { sku: 'FER-051', nombre: 'Linterna LED', descripcion: 'Linterna LED recargable 1000 lúmenes', precio: 28.00, stock: 40 },
  { sku: 'FER-052', nombre: 'Lámpara Trabajo', descripcion: 'Lámpara de trabajo 500W halógena', precio: 42.00, stock: 22 },
  { sku: 'FER-053', nombre: 'Extensión Eléctrica', descripcion: 'Cable extensión 50ft 12AWG', precio: 35.00, stock: 30 },
  { sku: 'FER-054', nombre: 'Regleta Protección', descripcion: 'Regleta 4 salidas con interruptor', precio: 15.00, stock: 80 },
  { sku: 'FER-055', nombre: 'Adaptador Corriente', descripcion: 'Adaptador 3 a 1 con USB', precio: 12.00, stock: 100 },
  { sku: 'FER-056', nombre: 'Batería 9V', descripcion: 'Batería alcalina 9V marca premium', precio: 4.50, stock: 150 },
  { sku: 'FER-057', nombre: 'Batería AA', descripcion: 'Pack 4 baterías AA alcalinas', precio: 6.00, stock: 200 },
  { sku: 'FER-058', nombre: 'Batería AAA', descripcion: 'Pack 4 baterías AAA alcalinas', precio: 5.00, stock: 180 },
  { sku: 'FER-059', nombre: 'Cargador Universal', descripcion: 'Cargador universal para baterías recargables', precio: 22.00, stock: 35 },
  { sku: 'FER-060', nombre: 'Pintura Látex 1 Gal', descripcion: 'Pintura látex color blanco 1 galón', precio: 28.00, stock: 50 },
  { sku: 'FER-061', nombre: 'Pintura Látex 5 Gal', descripcion: 'Pintura látex color blanco 5 galones', precio: 120.00, stock: 15 },
  { sku: 'FER-062', nombre: 'Pintura Acrílica', descripcion: 'Pintura acrílica color gris 1 galón', precio: 32.00, stock: 40 },
  { sku: 'FER-063', nombre: 'Thinner Estándar', descripcion: 'Thinner para pinturas 1 galón', precio: 18.00, stock: 60 },
  { sku: 'FER-064', nombre: 'Brocha Pintura 2"', descripcion: 'Brocha de pintura 2 pulgadas', precio: 5.00, stock: 100 },
  { sku: 'FER-065', nombre: 'Brocha Pintura 3"', descripcion: 'Brocha de pintura 3 pulgadas', precio: 6.50, stock: 90 },
  { sku: 'FER-066', nombre: 'Rodillo Pintura 9"', descripcion: 'Rodillo de pintura 9 pulgadas', precio: 7.00, stock: 110 },
  { sku: 'FER-067', nombre: 'Bandeja Pintura', descripcion: 'Bandeja para pintura de plástico', precio: 4.00, stock: 150 },
  { sku: 'FER-068', nombre: 'Pistola Pintura', descripcion: 'Pistola para pintar profesional', precio: 85.00, stock: 10 },
  { sku: 'FER-069', nombre: 'Cinta Pintor', descripcion: 'Cinta adhesiva para pintura 2"x60yd', precio: 5.50, stock: 120 },
  { sku: 'FER-070', nombre: 'Plástico Protección', descripcion: 'Plástico protector 9x12ft', precio: 8.00, stock: 160 },
  { sku: 'FER-071', nombre: 'Masilla Madera', descripcion: 'Masilla para madera 500ml', precio: 6.00, stock: 80 },
  { sku: 'FER-072', nombre: 'Pegamento PVA', descripcion: 'Pegamento blanco PVA 500ml', precio: 4.50, stock: 120 },
  { sku: 'FER-073', nombre: 'Pegamento Epoxy', descripcion: 'Pegamento epoxy 2 componentes', precio: 12.00, stock: 50 },
  { sku: 'FER-074', nombre: 'Silicona Blanca', descripcion: 'Silicona blanca tubo 300ml', precio: 5.00, stock: 200 },
  { sku: 'FER-075', nombre: 'Silicona Gris', descripcion: 'Silicona gris tubo 300ml', precio: 5.50, stock: 180 },
  { sku: 'FER-076', nombre: 'Pistola Silicona', descripcion: 'Pistola para silicona y pegamentos', precio: 8.00, stock: 90 },
  { sku: 'FER-077', nombre: 'Remachador Manual', descripcion: 'Remachador manual para remaches 1/8"', precio: 18.00, stock: 35 },
  { sku: 'FER-078', nombre: 'Remaches Aluminio', descripcion: 'Caja 100 remaches aluminio 1/8"x1/4"', precio: 6.00, stock: 150 },
  { sku: 'FER-079', nombre: 'Tuerca Mariposa', descripcion: 'Bolsa 50 tuercas mariposa acero', precio: 7.00, stock: 100 },
  { sku: 'FER-080', nombre: 'Perno Carruaje', descripcion: 'Caja 50 pernos carruaje 1/4"x2"', precio: 9.00, stock: 80 },
  { sku: 'FER-081', nombre: 'Cadena Acero', descripcion: 'Rollo 50ft cadena acero grado 30', precio: 45.00, stock: 15 },
  { sku: 'FER-082', nombre: 'Candado Combinación', descripcion: 'Candado combinación 3 dígitos', precio: 12.00, stock: 70 },
  { sku: 'FER-083', nombre: 'Candado Llave', descripcion: 'Candado de llave 1" acero', precio: 15.00, stock: 60 },
  { sku: 'FER-084', nombre: 'Bisagra Puerta', descripcion: 'Bisagra de puertas 3" acero inoxidable', precio: 8.00, stock: 120 },
  { sku: 'FER-085', nombre: 'Manija Puerta', descripcion: 'Manija de puerta moderna cromada', precio: 14.00, stock: 85 },
  { sku: 'FER-086', nombre: 'Cerradura Cilindro', descripcion: 'Cerradura de cilindro para puertas', precio: 22.00, stock: 40 },
  { sku: 'FER-087', nombre: 'Espejo Retrovisor', descripcion: 'Espejo de seguridad convexo 12"', precio: 28.00, stock: 20 },
  { sku: 'FER-088', nombre: 'Señal Prohibido', descripcion: 'Señal de prohibido pasar aluminio', precio: 18.00, stock: 50 },
  { sku: 'FER-089', nombre: 'Cono Seguridad', descripcion: 'Cono de seguridad reflectivo 28"', precio: 12.00, stock: 100 },
  { sku: 'FER-090', nombre: 'Barrera Seguridad', descripcion: 'Barrera de seguridad amarilla negra', precio: 35.00, stock: 25 },
  { sku: 'FER-091', nombre: 'Eslabón Rápido', descripcion: 'Eslabón rápido acero 3/8"', precio: 6.00, stock: 180 },
  { sku: 'FER-092', nombre: 'Grillete Acero', descripcion: 'Grillete acero galvanizado 3/16"', precio: 8.50, stock: 160 },
  { sku: 'FER-093', nombre: 'Polea Acero', descripcion: 'Polea doble acero 2"', precio: 22.00, stock: 30 },
  { sku: 'FER-094', nombre: 'Cuerda Nylon', descripcion: 'Rollo cuerda nylon 50ft 1/4"', precio: 15.00, stock: 70 },
  { sku: 'FER-095', nombre: 'Cuerda Sisal', descripcion: 'Rollo cuerda sisal 50ft 3/8"', precio: 18.00, stock: 60 },
  { sku: 'FER-096', nombre: 'Bandeja Plástica', descripcion: 'Bandeja plástica 16x12x4"', precio: 6.00, stock: 140 },
  { sku: 'FER-097', nombre: 'Caja Herramientas Plástico', descripcion: 'Caja plástica con asa 24"', precio: 28.00, stock: 35 },
  { sku: 'FER-098', nombre: 'Contenedor Almacenamiento', descripcion: 'Contenedor 55 galones con tapa', precio: 45.00, stock: 12 },
  { sku: 'FER-099', nombre: 'Tubo PVC 1"', descripcion: 'Tubo PVC 1 pulgada x 10ft', precio: 12.00, stock: 80 },
  { sku: 'FER-100', nombre: 'Codo PVC', descripcion: 'Codo PVC 1" 90 grados', precio: 3.00, stock: 250 }
];

try {
  console.log('🔄 Insertando 100 productos en la base de datos...\n');
  
  // Crear statement una sola vez
  const stmt = db.prepare(`
    INSERT INTO productos (sku, nombre, descripcion, precio, stock, estado) 
    VALUES (?, ?, ?, ?, ?, 'Activo')
  `);
  
  // Usar transacción para mejor performance
  const insertMany = db.transaction((items) => {
    let count = 0;
    items.forEach((producto, index) => {
      try {
        stmt.run(
          producto.sku,
          producto.nombre,
          producto.descripcion,
          producto.precio,
          producto.stock
        );
        count++;
        if ((index + 1) % 10 === 0) {
          console.log(`✅ Insertados ${index + 1}/${items.length} productos...`);
        }
      } catch (error) {
        if (error.message.includes('UNIQUE')) {
          console.log(`⚠️  SKU ${producto.sku} ya existe, se saltó.`);
        } else {
          console.error(`❌ Error insertando ${producto.sku}:`, error.message);
        }
      }
    });
    return count;
  });
  
  const count = insertMany(productos);
  console.log(`\n✅ Inserción completada: ${count} productos nuevos en la BD`);
  
} catch (error) {
  console.error('❌ Error fatal:', error);
  process.exit(1);
}
