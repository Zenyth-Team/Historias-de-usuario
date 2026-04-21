# impact_analysis.md – Template 

 

## 1. Cambio solicitado 

[Describir el cambio de requerimiento asignado por el profesor] 

 

## 2. Nuevas historias de usuario 

 

### US-XX: [nombre] 

Como [actor], 

quiero [acción], 

para [beneficio]. 

 

Criterios de aceptación: 

- CA1: ... 

- CA2: ... 

 

## 3. Impacto en requisitos extrafuncionales 

 

Indicar si el cambio altera la prioridad de algún REF o introduce nuevos. 

Trazar cambios de prioridad que motiven cambios en decisiones de arquitectura. 

 

## 2. Nuevas historias de usuario

| ID | Historia de Usuario | Criterios de Aceptación |
|---|---|---|
| **US-11** | **Como** cajero,<br>**quiero** seguir registrando ventas sin internet,<br>**para** no parar la atención en la ferretería. | **CA1:** Permitir escanear y cobrar sin red.<br>**CA2:** Guardar la venta en la memoria del PC. |
| **US-12** | **Como** sistema,<br>**quiero** subir los datos locales apenas vuelva el internet,<br>**para** actualizar el stock sin que nadie lo haga a mano. | **CA1:** Detectar la red y subir datos en segundo plano.<br>**CA2:** No borrar datos locales hasta que el servidor confirme. |
| **US-13** | **Como** administrador,<br>**quiero** que el sistema resuelva los choques de stock al sincronizar,<br>**para** no cuadrar a mano si se vendió más de la cuenta. | **CA1:** Permitir stock negativo temporal si hubo quiebre.<br>**CA2:** Guardar la venta sin trancar la sincronización del resto. |
| **US-14** | **Como** dueño,<br>**quiero** sacar reportes gigantes sin pegar el sistema,<br>**para** no molestar al cajero que está atendiendo. | **CA1:** El reporte se hace de fondo sin bloquear la caja.<br>**CA2:** Avisar con un mensaje cuando el archivo esté listo. |
| **US-15** | **Como** cajero,<br>**quiero** que la caja reaccione al toque (menos de 0.5s),<br>**para** atender rápido a la fila de clientes. | **CA1:** Buscar o escanear productos en menos de 500ms.<br>**CA2:** Mantener esa velocidad aunque el dueño saque reportes pesados. |


 

## 4. Impacto en entidades del dominio 

[Nuevas entidades, atributos o relaciones afectadas] + Diagrama acutalizado 

 

## 5. Impacto en mockups 

[Mockups afectados y descripción de cambios necesarios] 

 

## 6. Impacto en arquitectura 

 

### 6.1 ¿Cambia el estilo arquitectónico? 

[Sí/No] — Justificación: 

[Si la repriorización de REF obliga a cambiar el estilo, explicar por qué. 

Si el estilo se mantiene, justificar que sigue siendo válido frente al cambio.] 

 

### 6.2 Relación REF (repriorizado) con decisiones de arquitectura 

 

| REF ID | Prioridad nueva | Decisión de arquitectura que lo aborda         | 

|--------|-----------------|------------------------------------------------| 

| REF-03 | Alta            | [cambio o confirmación de decisión existente]  | 

| REF-07 | Alta            | [nueva decisión derivada del cambio]           | 

 

## 7. Impacto en módulos 

 

| Módulo             | Tipo de impacto    | Responsabilidad actualizada        | Ofrece a otros (actualizado)   | 

|--------------------|--------------------|------------------------------------|--------------------------------| 

| [Módulo existente] | modificado         | [descripción actualizada]          | [interfaces actualizadas]      | 

| [Módulo nuevo]     | nuevo              | [responsabilidad]                  | [qué expone]                   | 

| [Módulo eliminado] | eliminado          | —                                  | —                              | 

 

Fundamentación de cambios modulares: 

[Justificar por qué se agregan, modifican o eliminan módulos en función del 

cambio de requerimientos y/o la repriorización de REF.] 

 

## 8. Nuevas decisiones de diseño 

 

### Decisión 1 

- Decisión: [qué se decide] 

- Motivación: [por qué, referenciando REF repriorizado si aplica] 

- Alternativas consideradas: [opciones evaluadas] 

- Impacto: [en qué módulos o REF afecta] 

 

## 9. Trazabilidad actualizada 

 

| Historia | REF relacionado | Módulo     | Mockup  | 

|----------|-----------------|------------|---------| 

| US-XX    | REF-XX          | [módulo]   | [ref]   | 

 

## 10. Justificación global y trade-offs 

[Por qué la solución propuesta es coherente con el sistema. 

Qué trade-offs se asumieron, especialmente ante cambios de prioridad en REF. 

Qué se gana y qué se sacrifica con las decisiones tomadas.] 
