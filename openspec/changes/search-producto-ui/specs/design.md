# Diseño: Frontend Buscador de Productos

## Arquitectura de la Solución

```
┌─────────────────────────────────────────┐
│         Navegador Web                    │
│  ┌───────────────────────────────────┐  │
│  │  buscar-producto.html             │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ Interfaz Bootstrap5         │  │  │
│  │  │ ├─ Header Search            │  │  │
│  │  │ ├─ Input + Button           │  │  │
│  │  │ ├─ Spinner (loading)        │  │  │
│  │  │ ├─ Alert (error)            │  │  │
│  │  │ └─ Product Card             │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ Funciones JS                │  │  │
│  │  │ ├─ buscarProducto()         │  │  │
│  │  │ ├─ mostrarProducto()        │  │  │
│  │  │ ├─ mostrarError()           │  │  │
│  │  │ └─ limpiarResultados()      │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│           Fetch API                      │
└─────────────────────────────────────────┘
         ↓ HTTP GET
┌─────────────────────────────────────────┐
│    Backend (puerto 3000)                 │
│    GET /api/v1/productos/sku/:sku       │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│    Base de Datos SQLite                  │
│    Tabla: productos                      │
└─────────────────────────────────────────┘
```

## Estructura HTML

### Secciones Principales

1. **Header**
   - Título con icono
   - Gradient background morado

2. **Search Panel**
   - Input de búsqueda (12 cols en desktop, full en mobile)
   - Botón Buscar (con gradiente y hover effects)

3. **Loading Indicator**
   - Spinner de Bootstrap
   - Texto "Buscando producto..."
   - Display: none por defecto

4. **Error Alert**
   - Alert rojo de Bootstrap (danger)
   - Título del error dinámico
   - Mensaje detallado desde la API
   - Display: none por defecto

5. **Product Card**
   - Grid 2 columnas (responsive)
   - 6 campos: SKU, Nombre, Precio, Estado, Ubicación, Stock
   - Display: none por defecto
   - Animación de entrada suave

## Paleta de Colores

```
┌────────────────┬─────────────────┬──────────────────┐
│ Elemento       │ Color           │ Hex              │
├────────────────┼─────────────────┼──────────────────┤
│ Background     │ Gradiente       │ #667eea → #764ba2│
│ Primary Text   │ Blanco          │ #ffffff          │
│ Card Text      │ Gris Oscuro     │ #333333          │
│ Accent (Data)  │ Azul Púrpura    │ #667eea          │
│ Error          │ Rojo Bootstrap  │ #dc3545          │
│ Button Hover   │ Sombra Púrpura  │ 0 5px 15px       │
└────────────────┴─────────────────┴──────────────────┘
```

## Tipografía

- **Fuente**: Bootstrap Default (Segoe UI, Roboto, etc.)
- **Título (h1)**: 2rem, Weight 700, Color blanco
- **Etiquetas**: 0.9rem, Weight 600, Color gris
- **Valores**: 1.1rem, Color #667eea
- **Input/Button**: 1rem, Weight 600

## Estados de la Interfaz

### Estado 1: Inicial (Idle)
```
- Input: vacío
- Botón: enabled
- Card: oculta
- Alert: oculta
- Spinner: oculta
```

### Estado 2: Buscando (Loading)
```
- Input: disabled (visual)
- Botón: disabled
- Card: oculta
- Alert: oculta
- Spinner: visible ✓
```

### Estado 3: Éxito (Success)
```
- Input: enabled
- Botón: enabled
- Card: visible ✓ (con animación)
- Alert: oculta
- Spinner: oculta
- Datos: poblados en Card
```

### Estado 4: Error (Error)
```
- Input: enabled
- Botón: enabled
- Card: oculta
- Alert: visible ✓ (rojo)
- Spinner: oculta
- Mensaje: dinámico según error
```

## Flujo de Interacción

```
┌─────────────────┐
│  Usuario ingresa│
│  SKU o nombre   │
│                 │
│  [FER-001   ][🔍]
└────────┬────────┘
         │
         ↓
    ┌────────────┐
    │ Click en   │
    │ "Buscar"   │ o Presiona Enter
    │ o Enter    │
    └────┬───────┘
         │
         ↓
    ┌────────────────────┐
    │ Validar input      │
    │ ¿Está vacío?       │
    └──┬──────────┬──────┘
       │ SI       │ NO
       ↓          ↓
    ┌──────┐  ┌──────────────┐
    │Error │  │ Mostrar      │
    │"Vacío"   │ spinner      │
    └──────┘  │ Fetch API    │
       ↑       └──────┬───────┘
       │              ↓
       │      ┌───────────────┐
       │      │ Respuesta OK? │
       │      └──┬─────┬──┬──┬─┘
       │         │     │  │  └─ 500: Error Server
       │         │     │  └──── 409: Inactivo
       │      200 404  400
       │         │     │  │
       │      ✓  │     │  └─ Mostrar Error
       └─────────┴──────┘
              ↓
         ┌──────────┐
         │Mostrar   │
         │Card con  │
         │Datos     │
         └──────────┘
```

## Llamadas API

### Request

```
GET /api/v1/productos/sku/FER-001 HTTP/1.1
Host: localhost:3000
Accept: application/json
```

### Respuestas Esperadas

#### 200 OK - Éxito
```json
{
  "sku": "FER-001",
  "nombre": "Martillo 16oz",
  "precio": 25.00,
  "estado": "Activo",
  "ubicacion": "Pasillo A - Estante 3",
  "stock": 45
}
```

#### 400 Bad Request - Parámetro inválido
```json
{
  "error": "Bad Request",
  "mensaje": "El formato del SKU es inválido o tiene una longitud incorrecta."
}
```

#### 404 Not Found - No encontrado
```json
{
  "error": "Not Found",
  "mensaje": "El producto no fue encontrado."
}
```

#### 409 Conflict - Producto inactivo
```json
{
  "mensaje": "El producto se encuentra inactivo"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "mensaje": "Error interno al consultar la ubicación del producto"
}
```

## Animaciones

### Slide In (Card y Alert)
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Botón Hover
- Transform: translateY(-2px)
- Sombra: 0 5px 15px rgba(102, 126, 234, 0.4)
- Duración: 300ms

## Responsive Design

| Breakpoint | Cambios |
|---|---|
| < 576px (XS) | Botón y input full-width, stack vertical |
| ≥ 576px (SM) | Grid 2 cols para inputs |
| ≥ 768px (MD) | Input 75%, Botón 25%, Card 2 cols |
| ≥ 992px (LG) | Container max-width 600px |
| ≥ 1200px (XL) | Sin cambios adicionales |

## Accesibilidad

- ✅ Labels asociados a inputs
- ✅ Alt text en imágenes (spinner visually-hidden)
- ✅ Contrast ratio adecuado (WCAG AA)
- ✅ Keyboard navigation (Enter en input)
- ✅ ARIA roles en alerts y spinners

## Performance

- ✅ Un solo archivo HTML (~15KB)
- ✅ Bootstrap CDN (minificado)
- ✅ No hay JavaScript transpilación
- ✅ Lazy loading no necesario
- ✅ Fetch API nativa (sin jQuery)
