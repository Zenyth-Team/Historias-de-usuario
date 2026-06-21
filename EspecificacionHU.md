# Especificación: US-02 Escanear precios mediante SKU

Como vendedor, quiero ingresar o escanear el SKU de un producto para ver su precio, stock y ubicación en la tienda de forma inmediata, sin tener que ir a buscarlo manualmente.

## Criterios de Aceptación

- **CA1:** Si el SKU existe en la base de datos, el sistema debe responder en menos de 2 segundos mostrando el nombre, precio, stock actual y la sección donde está guardado, todo sin recargar la página.
- **CA2:** Si el SKU no existe o está mal escrito, el backend debe capturar el error y devolver un estado HTTP 404 con un JSON estructurado (ej: `{ "error": "Producto no encontrado" }`), permitiendo que la interfaz muestre el aviso al usuario de forma controlada.
- **CA3:** Si el stock del producto consultado es igual o menor al mínimo establecido, la pantalla debe mostrar una alerta visual o cambiar a color rojo para advertir que quedan pocas unidades.

## Criterios de Término (DoD)

1. El código del endpoint (`/api/productos/:sku`) se trabajó en su propia rama y se integró a main mediante un Pull Request revisado por el equipo.
2. Se probaron los flujos en Express con la base de datos SQLite local para confirmar que los datos y los errores cargan bien.
3. Se verificó el funcionamiento usando Docker Compose, revisando que el contenedor de Nginx (puerto 8080) se comunique correctamente con la API en Express (puerto 3000).
4. El código de la consulta se configuró como método GET (solo lectura) para asegurar que buscar un precio no altere los datos del producto.
