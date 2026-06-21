# Documentación de Cambios en la API (API2.js)

Se han añadido dos nuevos endpoints al módulo `API2.js` para completar el ciclo CRUD (Creación, Lectura, Actualización y Eliminación) de la entidad **Productos**. Ambas funcionalidades están implementadas utilizando sentencias preparadas síncronas del motor `better-sqlite3`.

---

## 1. Endpoint: Actualización de Producto (PUT)

* **Ruta:** `PUT /api/v1/productos/:sku`
* **Descripción:** Permite modificar el nombre, descripción, precio y stock de un producto existente identificado por su SKU.

### Detalles de la Implementación
* **Validación de SKU:**
  * Se normaliza el parámetro SKU a mayúsculas.
  * Debe ser alfanumérico (permitiendo guiones medios `-`) y tener una longitud de entre 3 y 15 caracteres.
  * Retorna `400 Bad Request` en caso de formato no válido.
* **Validación del Cuerpo de la Petición:**
  * Reclama campos obligatorios: `nombre`, `precio` y `stock`.
  * Valida que `precio` y `stock` sean de tipo numérico y no negativos (>= 0).
  * Retorna `400 Bad Request` ante inconsistencias de validación.
* **Persistencia:**
  * Actualiza la tabla `productos` ejecutando la sentencia preparada:
    ```sql
    UPDATE productos 
    SET nombre = ?, descripcion = ?, precio = ?, stock = ? 
    WHERE sku = ?
    ```
* **Manejo de Errores & Respuestas:**
  * **200 OK:** Retorna el objeto del producto actualizado si la base de datos registra cambios.
  * **404 Not Found:** Si ningún registro coincide con el SKU proporcionado.
  * **500 Internal Server Error:** Captura de errores de ejecución mediante bloques `try-catch`.

---

## 2. Endpoint: Borrado Lógico de Producto (DELETE)

* **Ruta:** `DELETE /api/v1/productos/:sku`
* **Descripción:** Realiza la baja lógica de un producto en la base de datos cambiando su atributo `estado` a `'Inactivo'`. No elimina el registro físicamente de la base de datos.

### Detalles de la Implementación
* **Validación de SKU:**
  * Se realiza el mismo control de formato alfanumérico y longitud de entre 3 y 15 caracteres.
* **Persistencia:**
  * Actualiza el estado del producto ejecutando la sentencia preparada:
    ```sql
    UPDATE productos 
    SET estado = 'Inactivo' 
    WHERE sku = ?
    ```
* **Manejo de Errores & Respuestas:**
  * **200 OK:** Retorna un mensaje confirmando la baja lógica del producto, el SKU y el nuevo estado inactivo.
  * **404 Not Found:** Si no se encuentra un producto registrado con el SKU provisto.
  * **500 Internal Server Error:** Captura de errores del servidor.

---

## 3. Swagger / OpenAPI Integrado
Se añadieron los bloques decoradores de JSDoc `@swagger` para documentar la estructura de parámetros, cuerpo de petición y esquemas de respuestas en formato OpenAPI 3.0.0. Los nuevos endpoints se integran automáticamente en la interfaz accesible desde `/api-docs`.
