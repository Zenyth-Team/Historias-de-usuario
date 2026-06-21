Gestión de Deuda Técnica (Tabla de Registro)IDUbicaciónDescripción del ProblemaSolución TécnicaDT-01API2.jsDuplicidad de lógica: La validación del SKU se repite en múltiples rutas (POST, GET, DELETE).Implementar un Middleware centralizado para validar el formato del SKU.DT-02buscar-producto.htmlCódigo Muerto: Bloque de validación else if para error 409 que no ocurre.Eliminar el bloque de manejo de error 409 para reducir la complejidad innecesaria.DT-03Consultas SQLFalta de datos: La UI espera ubicación, pero la consulta SQL actual no lo recupera.Implementar un LEFT JOIN con la tabla secciones en el controlador de productos.DT-04buscar-producto.htmlHardcodeo de URLs: La API está configurada solo para localhost:3000.Usar lógica dinámica window.location para adaptar la URL base al entorno.

Plan de Mejora de Arquitectura
Para asegurar la escalabilidad del sistema, se han planificado las siguientes acciones de mejora:

Integración Continua (CI/CD): Configurar GitHub Actions para automatizar la construcción de la imagen de Docker y ejecutar pruebas unitarias con cada push a la rama main.

Refactorización de Capas: Estandarizar la comunicación entre el Controlador y la Base de Datos para facilitar el aislamiento de pruebas (unit testing).

Gestión de Entorno: Migrar todas las configuraciones sensibles a archivos .env gestionados por Docker, eliminando cualquier dato estático dentro del código fuente.