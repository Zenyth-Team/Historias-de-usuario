# Especificación: US-01 Registrar nuevos productos en el inventario

Como encargado de bodega, quiero registrar nuevos productos ingresando su SKU, nombre, precio, stock inicial y sección, para mantener el catálogo actualizado y disponible para las ventas.

## Criterios de Aceptación

- **CA1:** Si los datos ingresados son válidos y el SKU no existe previamente, el sistema debe guardar el producto en la base de datos SQLite y responder con un código HTTP 201 (Created) en menos de 2.0 segundos.
- **CA2:** Si se intenta registrar un SKU que ya está duplicado en la base de datos, el backend en Express debe capturar la excepción y retornar un código HTTP 409 (Conflict) estructurado (ej. `{ "error": "El producto con este SKU ya existe" }`), asegurando que la interfaz maneje el mensaje de forma controlada.
- **CA3:** Si los campos numéricos como el precio o el stock inicial vienen con valores negativos o vacíos, el backend debe rechazar la solicitud devolviendo un código HTTP 400 (Bad Request) para mitigar inconsistencias de datos antes de realizar el guardado.

## Criterios de Término (DoD)

1. El código del endpoint de creación (`POST /api/productos`) debe ser desarrollado en su propia rama de característica exclusiva e integrado a la rama `main` únicamente mediante un Pull Request revisado y aprobado por el equipo.
2. Deben registrarse y ejecutarse con éxito las pruebas locales en Express comprobando el flujo correcto de inserción, el bloqueo por duplicados (409) y las validaciones de datos incorrectos (400).
3. La funcionalidad completa debe ser verificada corriendo el entorno multi-capa mediante `docker-compose up`, validando la comunicación correcta de red entre el frontend servido por Nginx (puerto 8080) y la API en Express (puerto 3000).
4. El código del backend debe contar con validaciones de entrada básicas para limpiar y validar los parámetros antes de interactuar con la base de datos SQLite embebida, previniendo valores nulos.
