## Catálogo de Requisitos Extrafuncionales

Clasificación según ISO 25010 y tipo de restricción.
La columna Prioridad refleja la importancia para las decisiones de arquitectura: Alta, Media o Baja.

| ID | Tipo | Prioridad | Descripción |
|---|---|---|---|
| REF-01 | Calidad de servicio (Rendimiento) | Alta | El sistema debe procesar el escaneo de códigos SKU y mostrar la información del producto en menos de 1 segundo. |
| REF-02 | Calidad de servicio (Disponibilidad) | Alta | El sistema debe operar de manera local garantizando una alta disponibilidad sin depender de conexión a internet externa. |
| REF-03 | Restricción técnica | Alta | La capa de persistencia de datos debe estar basada obligatoriamente en SQLite mediante un archivo local. |
| REF-04 | Calidad de servicio (Seguridad/Confiabilidad) | Alta | El sistema debe contar con un autoguardado persistente para evitar la pérdida de datos del inventario al cerrar la aplicación. |
| REF-05 | Restricción técnica | Media | El backend de la aplicación debe ser implementado en Python utilizando el micro-framework Flask. |
| REF-06 | Restricción técnica | Media | La capa de presentación (Frontend) debe ser desarrollada con HTML5, CSS3 y JavaScript. |
| REF-07 | Calidad de servicio (Mantenibilidad) | Media | El sistema debe estar organizado en una arquitectura monolítica de tres capas lógicas para facilitar futuras actualizaciones. |
| REF-08 | Otros no funcionales (Usabilidad) | Media | La interfaz de usuario debe ser responsiva y coincidir fielmente con los mockups diseñados en Figma. |
| REF-09 | Calidad de servicio (Escalabilidad) | Baja | La base de datos debe ser capaz de soportar el registro y búsqueda de al menos 10.000 SKU distintos sin degradación notoria de rendimiento. |
| REF-10 | Calidad de servicio (Interoperabilidad) | Baja | El sistema debe permitir la exportación de los resúmenes financieros mensuales a un formato estándar como CSV o Excel. |
