# impact_analysis.md – Template 

 

## 1. Cambio solicitado 

[Describir el cambio de requerimiento asignado por el profesor] 

 

 

## 2. Nuevas historias de usuario

| ID | Historia de Usuario | Criterios de Aceptación |
|---|---|---|
| **US-11** | **Como** cajero,<br>**quiero** seguir registrando ventas sin internet,<br>**para** no parar la atención en la ferretería. | **CA1:** Permitir escanear y cobrar sin red.<br>**CA2:** Guardar la venta en la memoria del PC. |
| **US-12** | **Como** sistema,<br>**quiero** subir los datos locales apenas vuelva el internet,<br>**para** actualizar el stock sin que nadie lo haga a mano. | **CA1:** Detectar la red y subir datos en segundo plano.<br>**CA2:** No borrar datos locales hasta que el servidor confirme. |
| **US-13** | **Como** administrador,<br>**quiero** que el sistema resuelva los choques de stock al sincronizar,<br>**para** no cuadrar a mano si se vendió más de la cuenta. | **CA1:** Permitir stock negativo temporal si hubo quiebre.<br>**CA2:** Guardar la venta sin trancar la sincronización del resto. |
| **US-14** | **Como** dueño,<br>**quiero** sacar reportes gigantes sin pegar el sistema,<br>**para** no molestar al cajero que está atendiendo. | **CA1:** El reporte se hace de fondo sin bloquear la caja.<br>**CA2:** Avisar con un mensaje cuando el archivo esté listo. |
| **US-15** | **Como** cajero,<br>**quiero** que la caja reaccione al toque (menos de 0.5s),<br>**para** atender rápido a la fila de clientes. | **CA1:** Buscar o escanear productos en menos de 500ms.<br>**CA2:** Mantener esa velocidad aunque el dueño saque reportes pesados. |
 

## 3. Impacto en requisitos extrafuncionales

El cambio estructural propuesto altera significativamente las prioridades y la naturaleza de los requisitos originales, introduciendo nuevas necesidades de diseño:

* **REF-01 (Rendimiento):** Mantiene prioridad **Alta**, pero se vuelve más estricto. Ahora se exige explícitamente mantener un tiempo de respuesta menor a 500ms en el POS, incluso bajo concurrencia masiva de reportes.
* **REF-02 (Disponibilidad):** Mantiene prioridad **Alta**. Pasa de ser una "operación local" general a requerir disponibilidad transaccional 100% offline con posterior resolución de conflictos.
* **REF-07 (Mantenibilidad/Arquitectura):** Su prioridad sube a **Alta**. La restricción original de mantener una arquitectura puramente monolítica queda invalidada por los nuevos requerimientos; se debe repriorizar hacia el desacoplamiento.
* **NUEVO - REF-11 (Consistencia de Datos - Tolerancia a fallos):** Prioridad **Alta**. Al permitir ventas offline, el sistema no será 100% síncrono. Se requiere garantizar la consistencia eventual y la integridad del inventario al momento de sincronizar.

## 4. Impacto en entidades del dominio

Para soportar el funcionamiento asíncrono y la operación offline del Smart Client, el modelo de datos debe incorporar nuevos atributos y tablas de resolución:

* **Entidad `Venta`:**
  * Nuevo atributo: `estado_sincronizacion` (Valores: Pendiente, Sincronizado, Conflicto).
  * Nuevo atributo: `id_venta_local` (UUID generado en la caja para evitar colisiones).
* **Entidad `Producto`:**
  * Diferenciación conceptual entre `stock_central_real` (Servidor) y `stock_local_cache` (POS).
* **NUEVA Entidad `Alerta_Merma_Sync`:**
  * Registra las transacciones que se generaron offline pero que, al volver el internet, produjeron un quiebre de stock negativo en la base de datos central.

*(Nota: Insertar aquí el diagrama de Entidad-Relación actualizado mostrando la tabla Venta conectada a la nueva tabla de Alertas).*

## 5. Impacto en mockups

* **Mockup POS (Caja):**
  * Agregar un indicador de estado de red (Verde: Online / Rojo: Offline).
  * Agregar un contador visual de "Transacciones pendientes de sincronización".
* **Mockup Reportes Financieros:**
  * Cambiar el botón de "Generar" para que no bloquee la pantalla. Agregar una vista de "Reportes en Cola" y "Reportes Listos para Descargar".
* **NUEVO Mockup - Dashboard Administrador:**
  * Bandeja de entrada para revisión de "Conflictos de Sincronización y Mermas" generados tras cortes de internet.

## 6. Impacto en arquitectura

### 6.1 ¿Cambia el estilo arquitectónico?

**Sí** — Justificación: 
El cambio de requerimientos afecta a la arquitectura del proyecto de forma definitiva. Para cumplir simultáneamente con la alta disponibilidad offline y el procesamiento masivo, la arquitectura monolítica de tres capas original (REF-07) es insuficiente. Se opta por una combinación de arquitecturas Cliente-Servidor y Event-Driven. Si el servidor se pone a calcular millones de datos bajo el esquema anterior, la caja se pega.

### 6.2 Relación REF (repriorizado) con decisiones de arquitectura

| REF ID | Prioridad nueva | Decisión de arquitectura que lo aborda |
|--------|-----------------|----------------------------------------|
| REF-02 | Alta | El Frontend pasa a ser un "Smart Client" (Cliente-Servidor) que guarda las ventas en local utilizando SQLite cuando el internet está caído. |
| REF-01 | Alta | Implementación Event-Driven. Con eventos, se manda el cálculo a una cola en segundo plano y se libera el sistema para seguir rindiendo bajo los 500ms. |
| REF-07 | Alta | Transición de un monolito estricto a un Monolito Modular con procesamiento asíncrono. |

## 7. Impacto en módulos

Se necesita una redefinición de los módulos y agregar nuevos para soportar la arquitectura asíncrona.

| Módulo | Tipo de impacto | Responsabilidad actualizada | Ofrece a otros (actualizado) |
|--------|-----------------|-----------------------------|------------------------------|
| Módulo de Ventas (POS) | modificado | El front end deja de ser una pagina web y pasa a ser una aplicación integrando las funciones de venta en caché local. | Interfaz de captura de ventas; envío por lotes (REST). |
| Módulo de Reportes | modificado | Pierde la capacidad de procesar en el hilo principal. Delega el cálculo a un worker. | API para encolar reportes; consulta de estado. |
| **Worker Asíncrono** | nuevo | Procesar cálculos pesados de fin de mes en segundo plano fuera de Flask. | Generación de reportes masivos en disco/BD. |
| **Gestor de Sincronización** | nuevo | Recibir ventas locales; cuando vuelve el internet, el cliente le manda todo de golpe al Servidor. | Endpoint REST; Validación de stock; Resolución de mermas. |

**Fundamentación de cambios modulares:** Se agregan los módulos de Sincronización y el Worker para desacoplar las responsabilidades. El módulo de ventas tradicional no puede manejar envíos masivos por reconexión sin generar cuellos de botella transaccionales. El worker es la única forma viable de cumplir el REF-01 (500ms) sin afectar el POS activo.

## 8. Nuevas decisiones de diseño

### Decisión 1
* **Decisión:** Transformar el Frontend (HTML/JS) en un Smart Client o Rich Client (PWA/Local) con base de datos SQLite embebida.
* **Motivación:** Garantizar la alta disponibilidad (REF-02). Para el internet caído, el Cliente necesita autonomía total para guardar las ventas en local.
* **Alternativas consideradas:** Replicación de bases de datos complejas o microservicios en el nodo (descartadas por alta complejidad técnica para el equipo).
* **Impacto:** Afecta directamente al REF-06 (Restricción técnica frontend) e impacta el Módulo de Ventas, que ahora posee lógica de persistencia.

### Decisión 2
* **Decisión:** Implementar un Message Broker (Cola de tareas, ej. Redis+Celery) para procesar los reportes financieros.
* **Motivación:** Mantener el rendimiento (REF-01) y no bloquear el POS, ya que calcular millones de datos en el servidor afectaría la respuesta.
* **Alternativas consideradas:** Consultas SQL hiper-optimizadas o pre-agregación nocturna (descartadas porque el reporte masivo sigue bloqueando recursos de CPU compartidos).
* **Impacto:** Modifica el Módulo de Reportes y obliga a desplegar infraestructura adicional (Worker Asíncrono).

## 9. Trazabilidad actualizada

| Historia | REF relacionado | Módulo | Mockup |
|----------|-----------------|--------|--------|
| US-0X (Venta Offline) | REF-02, REF-03 | Ventas (Smart Client) | POS (Indicador Red) |
| US-0Y (Sync Pospuesta) | REF-11 (Nuevo) | Gestor de Sincronización | Dashboard Admin (Alertas) |
| US-0Z (Cierre de Mes) | REF-01, REF-07 | Worker Asíncrono | Reportes (Vista Asíncrona) |

## 10. Justificación global y trade-offs

La solución propuesta (Cliente-Servidor + Event-Driven) es la más coherente para salvaguardar la operación principal de la ferretería: la venta fluida. Al aislar las cargas de trabajo incompatibles (ventas instantáneas vs. procesamiento masivo de datos) evitamos que la caja se pegue. 

**Trade-offs asumidos:**
* **Consistencia vs. Disponibilidad:** Privilegiamos que el cajero pueda vender siempre, asumiendo el trade-off de que el sistema no será 100% síncrono (Consistencia Eventual). Esto generará posibles descuadres de stock físicos que deberán resolverse administrativamente mediante el Gestor de Sincronización.
* **Complejidad del Desarrollo:** El front end deja de ser una pagina web simple y pasa a ser una aplicación más compleja, aumentando los tiempos de desarrollo y las pruebas necesarias para manejar estados de desconexión.
Qué se gana y qué se sacrifica con las decisiones tomadas.] 
