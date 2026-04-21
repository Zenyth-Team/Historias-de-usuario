# Sterling & Co.

## Descripción del sistema
**Problemática:** Nuestro proyecto se enfoca en la gestión de inventario de una empresa ficticia Sterling & Co. El objetivo principal es implementar una base de datos que permita la trazabilidad de productos, el control de stock mediante niveles mínimos, la generación de alertas automáticas cuando se alcancen niveles críticos de inventario y el registro contable de las ventas.

**Características Funcionales:**
* Gestión de productos: Registro con códigos SKU únicos.
* Escaneo de precios: Consulta mediante códigos SKU.
* Reportes y gráficas: Visualización de productos más vendidos.
* Ubicación de productos: Identificación rápida en tienda.
* Resumen financiero: Cálculo de ingresos y valor del inventario.
* Autoguardado local: Respaldo automático de movimientos.
* Órdenes de compra: Creación de PDFs ante falta de stock.
* Venta a granel: Soporte para venta por peso.
* Alertas de stock crítico: Notificaciones automáticas.

## Historias de Usuario
Todas las historias están registradas como GitHub Issues.

| ID | Nombre | Issue |
|---|---|---|
| US-01 | Registrar nuevos productos en el inventario | [Issue #1](https://github.com/Zenyth-Team/Historias-de-usuario/issues/1) |
| US-02 | Escanear precios mediante SKU | [Issue #2](https://github.com/Zenyth-Team/Historias-de-usuario/issues/2) |
| US-03 | Visualizar productos más vendidos y gráfica de stock | [Issue #3](https://github.com/Zenyth-Team/Historias-de-usuario/issues/3) |
| US-04 | Identificar ubicación de productos en tienda | [Issue #4](https://github.com/Zenyth-Team/Historias-de-usuario/issues/4) |
| US-05 | Resumen financiero y valor total del inventario | [Issue #5](https://github.com/Zenyth-Team/Historias-de-usuario/issues/5) |
| US-06 | Autoguardado local de inventario y movimientos | [Issue #6](https://github.com/Zenyth-Team/Historias-de-usuario/issues/6) |
| US-07 | Generación automática de órdenes de compra en PDF | [Issue #7](https://github.com/Zenyth-Team/Historias-de-usuario/issues/7) |
| US-08 | Venta de productos a granel | [Issue #8](https://github.com/Zenyth-Team/Historias-de-usuario/issues/8) |
| US-09 | Alertas automáticas de stock crítico | [Issue #9](https://github.com/Zenyth-Team/Historias-de-usuario/issues/9) |
| US-10 | Ajuste manual de inventario por mermas o daños | [Issue #10](https://github.com/Zenyth-Team/Historias-de-usuario/issues/10) |
| US-11 | Reporte de Mermas Mensuales | [Issue #11](https://github.com/Zenyth-Team/Historias-de-usuario/issues/16) |
| US-12 | Descuentos Temporales | [Issue #12](https://github.com/Zenyth-Team/Historias-de-usuario/issues/17) |
| US-13 | Login de Cajero | [Issue #13](https://github.com/Zenyth-Team/Historias-de-usuario/issues/18) |



## Requisitos Extrafuncionales
Ver catálogo detallado en: [ReqExtrafuncionales.md](./ReqExtrafuncionales.md)

## Entidades del Dominio
El sistema gestiona la persistencia de datos mediante las siguientes entidades principales y sus atributos:
* **Producto:** SKU, nombre, descripción, precio, cantidad_stock, stock_minimo, seccion_id.
* **Sección:** ID, nombre_seccion, descripción de ubicación.
* **Venta:** ID, fecha_hora, total_venta, metodo_pago.
* **DetalleVenta:** venta_id, producto_id, cantidad_vendida, subtotal.
* **Movimiento/Merma:** ID, producto_id, cantidad, tipo_movimiento, motivo, fecha.
* **Proveedor:** ID, nombre_empresa, contacto, categoría_productos.

## Mockups
A continuación se presentan los prototipos de baja fidelidad del sistema.  
Enlace a Figma: https://carry-pack-20330348.figma.site/

| Mockup / Pantalla | Historia de usuario relacionada |
|---|---|
| [Ver vista de Registro de Producto](./US-01.png) | US-01 |
| [Ver vista de Escáner de Precios](./US-02.png) | US-02 |
| [Ver vista de Dashboard y Gráficas](./US-03.png) | US-03 |
| [Ver vista de Ubicación en Tienda](./US-04.png) | US-04 |
| [Ver vista de Resumen Financiero](./US-05.png) | US-05 |
| [Ver vista de Autoguardado](./US-06.png) | US-06 |
| [Ver vista de Órdenes de Compra](./US-07.png) | US-07 |
| [Ver vista de Venta a Granel](./US-08.png) | US-08 |
| [Ver vista de Alertas de Stock](./US-09.png) | US-09 |
| [Ver vista de Ajuste por Mermas](./US-10.png) | US-10 |

## Diseño Arquitectónico
Ver detalle de arquitectura y decisiones de diseño en: [arquitectura.md](./arquitectura.md)

## Responsabilidades del Equipo
| Integrante | Rol | Ítems de la rúbrica a cargo |
|---|---|---|
| David Daniel Nuñéz Ruiz | Scrum Master | Historias de Usuario (Completitud y Correctitud) y Gestión de Issues. |
| Ignacio Jorquera | Product Owner | Requisitos Extrafuncionales (Catálogo y Priorización) y README. |
| Diego Marengo | Developer | Diseño Arquitectónico (Estilo y Justificación) en Arquitectura.md. |
| Sebastián Fredy Gonzalez Pereira | Developer | Descomposición Modular y Diagrama de Arquitectura. |
| Matias Horvath | Developer | Entidades del Dominio (Completitud) y Mockups (Consistencia). |
