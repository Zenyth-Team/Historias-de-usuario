# Tareas: Frontend Buscador de Productos

## Sprint 1: Implementación Base

### Tarea 1.1: Crear estructura HTML básica
- **Descripción**: Armar el HTML con Bootstrap 5
- **Subtareas**:
  - [x] Crear archivo `buscar-producto.html`
  - [x] Agregar meta tags (charset, viewport)
  - [x] Importar Bootstrap 5 CDN
  - [x] Crear estructura de elementos (input, botón, card, alert)
  - [x] Agregar id's y clases necesarias
- **Estimación**: 1 hora
- **Responsable**: Desarrollo
- **Estado**: ✅ Completado

### Tarea 1.2: Diseñar la interfaz con CSS
- **Descripción**: Aplicar estilos personalizados y hacer responsive
- **Subtareas**:
  - [x] Crear gradiente de fondo morado
  - [x] Estilar card del producto
  - [x] Estilar inputs y botones
  - [x] Agregar animaciones (slideIn, hover)
  - [x] Media queries para mobile/desktop
  - [x] Estilos para estado loading y error
- **Estimación**: 2 horas
- **Responsable**: Desarrollo
- **Estado**: ✅ Completado

### Tarea 1.3: Implementar funciones JavaScript principales
- **Descripción**: Crear lógica de búsqueda y manejo de respuestas
- **Subtareas**:
  - [x] Función `buscarProducto()` con fetch
  - [x] Función `mostrarProducto()` para llenar la card
  - [x] Función `mostrarError()` para mostrar alertas
  - [x] Función `limpiarResultados()` para resetear estado
  - [x] Comentarios en español en cada función
  - [x] Validación de input vacío
- **Estimación**: 1.5 horas
- **Responsable**: Desarrollo
- **Estado**: ✅ Completado

### Tarea 1.4: Manejo de errores HTTP
- **Descripción**: Implementar casos de error (400, 404, 409, 500)
- **Subtareas**:
  - [x] Manejo para 200 OK (éxito)
  - [x] Manejo para 404 Not Found
  - [x] Manejo para 400 Bad Request
  - [x] Manejo para 409 Conflict (inactivo)
  - [x] Manejo para 500 Server Error
  - [x] Fallback para errores de conexión
- **Estimación**: 1 hora
- **Responsable**: Desarrollo
- **Estado**: ✅ Completado

### Tarea 1.5: Event listeners y interactividad
- **Descripción**: Conectar eventos del usuario a funciones
- **Subtareas**:
  - [x] Click en botón "Buscar"
  - [x] Presionar Enter en el input
  - [x] Limpiar resultados al escribir
  - [x] Focus en input al cargar página
  - [x] Desactivar botón durante búsqueda
- **Estimación**: 0.5 horas
- **Responsable**: Desarrollo
- **Estado**: ✅ Completado

## Sprint 2: Testing y Documentación

### Tarea 2.1: Pruebas manuales en navegador
- **Descripción**: Validar el frontend con casos de prueba
- **Subtareas**:
  - [ ] Prueba búsqueda exitosa (200)
  - [ ] Prueba producto no encontrado (404)
  - [ ] Prueba parámetro vacío (400)
  - [ ] Prueba producto inactivo (409)
  - [ ] Prueba error del servidor (500)
  - [ ] Prueba responsiveness en mobile
  - [ ] Prueba keyboard navigation (Enter)
  - [ ] Prueba múltiples búsquedas consecutivas
  - [ ] Prueba con diferentes navegadores
  - [ ] Verificar que no haya errores en consola
- **Estimación**: 2 horas
- **Responsable**: QA / Testing
- **Estado**: ⏳ Pendiente

### Tarea 2.2: Documentación OpenSpec
- **Descripción**: Documentar la feature en OpenSpec
- **Subtareas**:
  - [x] Crear directorio `openspec/changes/search-producto-ui/specs/`
  - [x] Archivo `proposal.md` (objetivo y alcance)
  - [x] Archivo `design.md` (arquitectura y diseño)
  - [x] Archivo `tasks.md` (plan de tareas)
  - [x] Archivo `cambios.md` (resumen de cambios)
- **Estimación**: 1.5 horas
- **Responsable**: Documentación
- **Estado**: ⏳ En progreso

### Tarea 2.3: README de uso
- **Descripción**: Documentar cómo usar el frontend
- **Subtareas**:
  - [ ] Instrucciones de inicio
  - [ ] Ejemplos de búsqueda
  - [ ] Screenshots de la interfaz
  - [ ] Troubleshooting común
- **Estimación**: 1 hora
- **Responsable**: Documentación
- **Estado**: ⏳ Pendiente

## Sprint 3: Optimizaciones y Extras (Opcional)

### Tarea 3.1: Mejoras de UX
- **Descripción**: Agregar características para mejorar experiencia
- **Subtareas**:
  - [ ] Autocompletado de SKUs frecuentes
  - [ ] Historial de búsquedas
  - [ ] Botón "Limpiar" para resetear
  - [ ] Sonido de notificación en error
- **Estimación**: 2 horas
- **Responsable**: Desarrollo
- **Estado**: ⏳ Pendiente

### Tarea 3.2: Búsqueda por nombre
- **Descripción**: Permitir búsqueda flexible por nombre del producto
- **Subtareas**:
  - [ ] Crear endpoint en backend (si no existe)
  - [ ] Lógica de búsqueda "contains" o similar
  - [ ] Dropdown con sugerencias
- **Estimación**: 3 horas
- **Responsable**: Desarrollo + Backend
- **Estado**: ⏳ Bloqueado (depende de backend)

### Tarea 3.3: Exportar/Imprimir
- **Descripción**: Permitir descargar o imprimir la información
- **Subtareas**:
  - [ ] Botón "Descargar PDF"
  - [ ] Botón "Imprimir"
  - [ ] Formato de impresión personalizado
- **Estimación**: 1.5 horas
- **Responsable**: Desarrollo
- **Estado**: ⏳ Pendiente

## Dependencias

| Tarea | Depende de | Estado |
|---|---|---|
| 1.1 - HTML | - | ✅ Resuelta |
| 1.2 - CSS | 1.1 | ✅ Resuelta |
| 1.3 - JS | 1.1, 1.2 | ✅ Resuelta |
| 1.4 - Errores | 1.3 | ✅ Resuelta |
| 1.5 - Events | 1.1, 1.3 | ✅ Resuelta |
| 2.1 - Testing | 1.1-1.5 | ⏳ Bloqueada |
| 2.2 - Docs | 1.1-1.5 | ⏳ En progreso |
| 3.1 - UX | 2.1 (testing) | ⏳ Pendiente |
| 3.2 - Búsqueda | Endpoint backend | ⏳ Bloqueada |

## Timesheet Estimado

```
Sprint 1: 6 horas
├─ Tarea 1.1: 1 hora
├─ Tarea 1.2: 2 horas
├─ Tarea 1.3: 1.5 horas
├─ Tarea 1.4: 1 hora
└─ Tarea 1.5: 0.5 horas

Sprint 2: 4.5 horas (crítico)
├─ Tarea 2.1: 2 horas
├─ Tarea 2.2: 1.5 horas
└─ Tarea 2.3: 1 hora

Sprint 3: 6.5 horas (opcional)
├─ Tarea 3.1: 2 horas
├─ Tarea 3.2: 3 horas
└─ Tarea 3.3: 1.5 horas

─────────────────────────
Total: 10.5 horas (crítico)
     + 6.5 horas (opcional)
     = 17 horas estimadas
```

## Criterios de Completitud (DoD)

Antes de marcar una tarea como "Completada":

- ✅ El código está escrito y funciona
- ✅ No hay errores en la consola del navegador
- ✅ La funcionalidad se probó manualmente
- ✅ Comentarios en español en funciones clave
- ✅ Código limpio y sin console.log de debug
- ✅ Documentación actualizada
- ✅ Cumple con los criterios de aceptación

## Notas

- El frontend es un archivo único HTML/CSS/JS sin build process
- Bootstrap 5 se carga por CDN (no requiere instalación local)
- API base URL está configurada en: `http://localhost:3000/api/v1`
- Compatible con navegadores que soporten Fetch API (IE 11+)
