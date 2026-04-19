# Sterling & Co.
## Problemática: 
Nuestro proyecto se enfoca en la gestión de inventario de una empresa ficticia Sterling & Co. El objetivo principal es implementar una base de datos que permita la trazabilidad de productos, el control de stock mediante niveles mínimos, la verificación de fechas de vencimiento, la generación de alertas automáticas cuando se alcancen niveles críticos de inventario y el registro contable de las ventas.

## Responsabilidades del Equipo

| Integrante | Rol | Ítems de la rúbrica a cargo |
|---|---|---|
| David Daniel Nuñéz Ruiz | Scrum Master | Historias de Usuario (Completitud y Correctitud) y Gestión de Issues. |
| Sebastián Fredy Gonzalez Pereira | Product Owner | Requisitos Extrafuncionales (Catálogo y Priorización) y README. |
| Diego Marengo | Developer | Diseño Arquitectónico (Estilo y Justificación) en Arquitectura.md. |
| Ignacio Jorquera | Developer | Descomposición Modular y Diagrama de Arquitectura. |
| Matias Horvath | Developer | Entidades del Dominio (Completitud) y Mockups (Consistencia). |
## Características de Enfoque/Funcionales

* **Gestión de productos:** Registro con códigos SKU únicos y validación de precios o cantidades no negativas.
* **Escaneo de precios:** Sistema de consulta mediante códigos SKU para obtener información rápida del producto.
* **Reportes y gráficas:** Visualización de productos más vendidos y gráficas de reposición de stock filtradas por fecha.
* **Ubicación de productos:** Identificación rápida de la sección exacta de la tienda donde se encuentra cada artículo.
* **Resumen financiero:** Cálculo automático de ingresos mensuales y del valor total del capital invertido en bodega.
* **Autoguardado local:** Respaldo automático de movimientos e inventario para evitar pérdida de datos al cerrar la aplicación.
* **Generador de órdenes de compra:** Creación automática de documentos PDF con datos prellenados del proveedor ante falta de stock.
* **Venta a granel:** Soporte para venta de productos por peso o unidades fraccionadas con actualización de inventario.
* **Alertas de stock crítico:** Notificaciones automáticas cuando un producto alcanza el nivel mínimo de existencias definido.

## Historias de Usuario
Todas las historias están registradas como GitHub Issues.

| ID | Nombre | Issue |
|---|---|---|
| US-01 | Registrar nuevos productos en el inventario | https://github.com/Zenyth-Team/Historias-de-usuario/issues/1 |
| US-02 | Escanear precios mediante SKU | https://github.com/Zenyth-Team/Historias-de-usuario/issues/2 |
| US-03 | Visualizar productos más vendidos y gráfica de stock | https://github.com/Zenyth-Team/Historias-de-usuario/issues/3 |
| US-04 | Identificar ubicación de productos en tienda | https://github.com/Zenyth-Team/Historias-de-usuario/issues/4 |
| US-05 | Resumen financiero y valor total del inventario | https://github.com/Zenyth-Team/Historias-de-usuario/issues/5 |
| US-06 | Autoguardado local de inventario y movimientos | https://github.com/Zenyth-Team/Historias-de-usuario/issues/6 |
| US-07 | Generación automática de órdenes de compra en PDF | https://github.com/Zenyth-Team/Historias-de-usuario/issues/7 |
| US-08 | Venta de productos a granel | https://github.com/Zenyth-Team/Historias-de-usuario/issues/8 |
| US-09 | Alertas automáticas de stock crítico | https://github.com/Zenyth-Team/Historias-de-usuario/issues/9 |
| US-10 | Ajuste manual de inventario por mermas o daños | https://github.com/Zenyth-Team/Historias-de-usuario/issues/10 |

## Entidades del Dominio

El sistema gestiona la persistencia de datos mediante las siguientes entidades principales y sus atributos:

* **Producto:** SKU (Identificador único), nombre, descripción, precio, cantidad_stock, stock_minimo, seccion_id.
* **Sección:** ID, nombre_seccion (pasillo/estante), descripción de ubicación.
* **Venta:** ID, fecha_hora, total_venta, metodo_pago.
* **DetalleVenta:** venta_id, producto_id, cantidad_vendida, subtotal.
* **Movimiento/Merma:** ID, producto_id, cantidad, tipo_movimiento (Entrada/Salida/Merma), motivo, fecha.
* **Proveedor:** ID, nombre_empresa, contacto, categoría_productos.

## Mockups

A continuación se presentan los prototipos de baja fidelidad del sistema, vinculados a sus respectivas historias de usuario para asegurar la trazabilidad del diseño.

| Mockup / Pantalla | Historia de usuario relacionada |
|---|---|
| [Ver vista de Registro de Producto](./US-01.png) | US-01 |
| [Ver vista de Escáner de Precios](./US-02.png) | US-02 |
| [Ver vista de Dashboard y Gráficas](./US-003.png) | US-03 |
| [Ver vista de Ubicación en Tienda](./US-04.png) | US-04 |
| [Ver vista de Resumen Financiero](./US-05.png) | US-05 |
| [Ver vista de Autoguardado](./US-06.png) | US-06 |
| [Ver vista de Órdenes de Compra](./US-07.png) | US-07 |
| [Ver vista de Venta a Granel](./US-08.png) | US-08 |
| [Ver vista de Alertas de Stock](./US-09.png) | US-09 |
| [Ver vista de Ajuste por Mermas](./US-10.png) | US-10 |

## Figma
Link: https://carry-pack-20330348.figma.site/
## Mockups

A continuación se presentan los prototipos de baja fidelidad del sistema, vinculados a sus respectivas historias de usuario para asegurar la trazabilidad del diseño.

| Mockup / Pantalla | Historia de usuario relacionada |
|---|---|
| [Ver vista de Registro de Producto](./us01.png) | US-01 |
| [Ver vista de Escáner de Precios](./us02.png) | US-02 |
| [Ver vista de Dashboard y Gráficas](./us03.png) | US-03 |
| [Ver vista de Ubicación en Tienda](./us04.png) | US-04 |
| [Ver vista de Resumen Financiero](./us05.png) | US-05 |
| [Ver vista de Autoguardado](./us06.png) | US-06 |
| [Ver vista de Órdenes de Compra](./us07.png) | US-07 |
| [Ver vista de Venta a Granel](./us08.png) | US-08 |
| [Ver vista de Alertas de Stock](./us09.png) | US-09 |
| [Ver vista de Ajuste por Mermas](./us10.png) | US-10 |
# Stack:

## Decisión Arquitectonica: 
Se ha optado por una arquitectura monolítica organizada en tres capas lógicas. Esta decisión permite centralizar la lógica de negocio y facilitar el despliegue de la página web:

**Capa de Presentación (Frontend):** Se diseñara en HTML5, CSS3 y JavaScript, asegurando una interfaz responsiva y dinámica que refleje fielmente el diseño de Figma. Utilizando JavaScript para el escaneo de códigos SKU y la interactividad de las gráficas.

**Capa de Lógica de Negocio (Backend):** Implementada en Python utilizando el micro-framework Flask. Gestiona el control de stock crítico, la verificación de fechas de vencimiento y el cálculo automático de ingresos financieros.

**Capa de Datos (Persistencia):** Sera basada en SQLite. Se elige esta base de datos relacional por su capacidad de "Autoguardado local" mediante un archivo persistente, eliminando la necesidad de configurar servidores de base de datos externos.

## Atributos:
**Escalabilidad:** Capacidad de manejar un aumento en la carga (usuarios, datos) sin degradar rendimiento.

**Disponibilidad:** El tiempo que el sistema está operativo y accesible.

**Mantenibilidad:** Corregir errores o agregar nuevas funcionalidades.

**Seguridad:** Protección de datos y resistir ataques malintencionados.

**Rendimiento:** Tiempos de respuesta y uso de recursos bajo condiciones específicas.
