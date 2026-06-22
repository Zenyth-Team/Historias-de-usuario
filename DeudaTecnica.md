### Gestión de Deuda Técnica (Tabla de Registro)

| ID | Ubicación | Descripción del Problema | Solución Técnica |
| :--- | :--- | :--- | :--- |
| DT-01 | `API2.js` | Duplicidad de lógica: La validación del SKU se repite en múltiples rutas (POST, GET, DELETE). | Implementar un Middleware centralizado para validar el formato del SKU. |
| DT-02 | `buscar-producto.html` | Código Muerto: Bloque de validación `else if` para error 409 que no ocurre. | Eliminar el bloque de manejo de error 409 para reducir la complejidad innecesaria. |
| DT-03 | Consultas SQL | Falta de datos: La UI espera ubicación, pero la consulta SQL actual no lo recupera. | Implementar un `LEFT JOIN` con la tabla secciones en el controlador de productos. |
| DT-04 | `buscar-producto.html` | Hardcodeo de URLs: La API está configurada solo para `localhost:3000`. | Usar lógica dinámica `window.location` para adaptar la URL base al entorno. |

### Plan de Mejora de Arquitectura

Para asegurar la escalabilidad del sistema, se han planificado las siguientes acciones de mejora:

* **Integración Continua (CI/CD):** Configurar GitHub Actions para automatizar la construcción de la imagen de Docker y ejecutar pruebas unitarias con cada push a la rama `main`.
* **Refactorización de Capas:** Estandarizar la comunicación entre el Controlador y la Base de Datos para facilitar el aislamiento de pruebas (unit testing).
* **Gestión de Entorno:** Migrar todas las configuraciones sensibles a archivos `.env` gestionados por Docker, eliminando cualquier dato estático dentro del código fuente.
