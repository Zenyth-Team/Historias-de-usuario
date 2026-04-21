# impact_analysis.md – Template 

 

## 1. Cambio solicitado 

### Descripción del Cambio de Requerimientos

El cambio solicitado para la evaluación introduce nuevas restricciones operativas y de rendimiento que generan una tensión directa sobre el diseño original del sistema. Se divide en los siguientes puntos:

**1. Cambio Funcional (Operación Offline y Sincronización)**
Se requiere que el punto de venta (POS) opere completamente offline durante cortes de internet. El sistema debe ser capaz de sincronizar las transacciones pendientes una vez que se recupere la conexión a la red, incluyendo un mecanismo para la resolución automática de conflictos de stock.

**2. Cambio No Funcional (Rendimiento bajo Carga)**
El módulo de reportes financieros debe tener la capacidad de procesar cierres de mes que involucren millones de registros. Esta carga de procesamiento masivo no debe afectar el tiempo de respuesta del POS activo, el cual está estrictamente restringido a mantenerse por debajo de los 500ms en todo momento.

**3. Tensión Arquitectónica Identificada**
El modelo actual presenta una limitación crítica: una arquitectura puramente monolítica comparte el mismo proceso y la misma base de datos para todos sus módulos. Exigir un funcionamiento offline con sincronización diferida y, simultáneamente, ejecutar un procesamiento masivo de reportes en segundo plano sin afectar la latencia del POS, genera conflictos de recursos que el diseño original no está preparado para manejar.

 

 

## 2. Nuevas historias de usuario

| ID | Historia de Usuario | Criterios de Aceptación |
|---|---|---|
| **US-11** | **Como** Cajero,<br>**quiero** poder seguir registrando ventas aunque se corte el internet,<br>**para** no dejar de atender a los clientes de la ferretería durante un fallo de red. | **CA1:** El sistema debe permitir buscar productos y sumarlos al carrito aunque no detecte conexión.<br>**CA2:** Los datos de la venta deben guardarse temporalmente en el equipo local hasta que vuelva la señal. |
| **US-12** | **Como** Sistema,<br>**quiero** subir automáticamente las ventas guardadas al servidor cuando vuelva el internet,<br>**para** mantener el inventario de la tienda actualizado sin hacerlo a mano. | **CA1:** Al recuperar la conexión, el sistema debe enviar las ventas pendientes al servidor de forma automática.<br>**CA2:** El sistema debe confirmar que el servidor recibió los datos antes de borrarlos de la memoria local. |
| **US-13** | **Como** Administrador,<br>**quiero** ver un aviso si hubo errores con el stock después de una venta offline,<br>**para** arreglar manualmente el inventario si se vendió algo que físicamente no quedaba. | **CA1:** El sistema debe mostrar una alerta si una venta sincronizada dejó el stock en negativo o tuvo errores.<br>**CA2:** El administrador debe poder aprobar o corregir el ajuste de stock propuesto por el programa. |
| **US-14** | **Como** Dueño,<br>**quiero** sacar reportes financieros de millones de ventas sin que el sistema se pegue,<br>**para** revisar mis ganancias sin molestar el trabajo del cajero en la pantalla de ventas. | **CA1:** El procesamiento de reportes grandes debe correr de fondo sin bloquear la pantalla de atención al público.<br>**CA2:** El sistema debe avisar o mostrar una barra de progreso mientras genera el archivo final. |
| **US-15** | **Como** Cajero,<br>**quiero** que el sistema responda a mis clics en menos de medio segundo,<br>**para** atender rápido a la gente en las horas de mayor movimiento en la tienda. | **CA1:** Al escanear un código o buscar un nombre, el resultado debe aparecer en menos de 500ms.<br>**CA2:** La velocidad de la caja no puede bajar aunque el servidor esté ocupado procesando cierres mensuales. |
 

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
| :--- | :--- | :--- | :--- |
| US-11 (Venta en Modo Offline) | REF-02 (Disponibilidad) | Ventas (Smart Client) | Mockup POS (Indicador de red) |
| US-12 (Sincronización Automática) | REF-11 (Nuevo - Consistencia) | Gestor de Sincronización | Mockup POS (Contador transacciones) |
| US-13 (Resolución de Conflictos) | REF-11 (Nuevo - Consistencia) | Gestor de Sincronización | Nuevo Mockup - Dashboard Administrador |
| US-14 (Procesamiento Cierre Mensual) | REF-01 (Rendimiento), REF-07 | Worker Asíncrono / Reportes | Mockup Reportes (Vista Asíncrona) |
| US-15 (Optimización de Respuesta) | REF-01 (Rendimiento) | Ventas (Smart Client) | Mockup POS (Caja) |

## 10. Justificación global y trade-offs

La solución propuesta (Cliente-Servidor + Event-Driven) es la más coherente para salvaguardar la operación principal de la ferretería: la venta fluida. Al aislar las cargas de trabajo incompatibles (ventas instantáneas vs. procesamiento masivo de datos) evitamos que la caja se pegue. 

**Trade-offs asumidos:**
* **Consistencia vs. Disponibilidad:** Privilegiamos que el cajero pueda vender siempre, asumiendo el trade-off de que el sistema no será 100% síncrono (Consistencia Eventual). Esto generará posibles descuadres de stock físicos que deberán resolverse administrativamente mediante el Gestor de Sincronización.
* **Complejidad del Desarrollo:** El front end deja de ser una pagina web simple y pasa a ser una aplicación más compleja, aumentando los tiempos de desarrollo y las pruebas necesarias para manejar estados de desconexión.
Qué se gana y qué se sacrifica con las decisiones tomadas.] 
## 11. Estilo Arquitectónico

**Estilo adoptado:** Arquitectura de Dos Capas (Client-Server / Fat Client)

**Justificación basada en REFs (Historias de Usuario) priorizados:**

| REF ID | Descripción | Prioridad | Cómo lo aborda el estilo |
| :--- | :--- | :--- | :--- |
| **US-11/15** | Respuesta POS < 500ms y modo Offline | Alta | Al usar un "Cliente Pesado", la lógica de negocio y el almacenamiento temporal residen en la terminal, garantizando autonomía total sin internet. |
| **US-12** | Sincronización automática de datos | Alta | El cliente gestiona la comunicación directa con el servidor de base de datos, enviando ráfagas de datos apenas se detecta el socket activo. |
| **US-13** | Resolución de conflictos de stock | Alta | La lógica de validación se distribuye: el cliente alerta sobre el quiebre y el servidor procesa la transacción final, asegurando integridad. |
| **US-14** | Procesamiento de reportes masivos | Alta | La carga pesada se delega totalmente al Servidor (Capa 2), permitiendo que el Cliente (Capa 1) mantenga sus recursos libres para la atención. |

**Explicación textual:** Se ha migrado a una **Arquitectura de Dos Capas** para optimizar la distribución de carga en la ferretería. En este esquema, el **Cliente (Capa 1)** es una aplicación robusta que contiene la interfaz y la lógica de venta, permitiendo operar a alta velocidad y de forma offline mediante una base de datos local. El **Servidor (Capa 2)** actúa como el nodo central de datos y el motor de procesamiento para informes masivos. Esta separación física asegura que el cajero nunca perciba lentitud, ya que los procesos de cierre mensual de millones de registros ocurren en el hardware del servidor, mientras que la terminal de venta se mantiene reactiva y ligera para el escaneo de productos.

## 12. Diseño Arquitectónico

**Descripción de los Niveles (Tiers) del sistema:**

| Capa | Componente | Responsabilidad |
| :--- | :--- | :--- |
| **Capa 1: Cliente (Terminal POS)** | Interfaz de Usuario + Lógica de Aplicación + DB Local | Procesa la venta, maneja el stock local de seguridad, valida códigos de barra y gestiona la cola de sincronización asíncrona. |
| **Capa 2: Servidor (Backend & Data)** | Servidor de BD Central + Report Engine | Almacena el inventario maestro, procesa cierres mensuales pesados y resuelve las peticiones de sincronización enviadas por los clientes. |
