# Angular Tools Manager Application

## Overview
Esta es una aplicación Angular que implementa una interfaz moderna para consumir la API de herramientas de Laravel con estilos de Bootstrap.

## Features
- ✅ **Listado de Herramientas**: Ver todas las herramientas disponibles
- ✅ **Detalles de Herramientas**: Consultar información detallada de cada herramienta
- ✅ **Categorías**: Navegar herramientas por categoría
- ✅ **Responsive Design**: Diseño completamente responsivo con Bootstrap 5
- ✅ **Interfaz Moderna**: Componentes interactivos y atractivos

## Estructura del Proyecto

```
src/app/
├── components/
│   ├── navbar.component.ts          # Barra de navegación
│   ├── home.component.ts            # Página de inicio
│   ├── tools-list.component.ts      # Listado de herramientas
│   ├── tool-detail.component.ts     # Detalle de herramienta
│   ├── categories.component.ts      # Listado de categorías
│   └── category-tools.component.ts  # Herramientas por categoría
├── services/
│   └── tools.service.ts             # Servicio para consumir API
├── models/
│   └── tool.model.ts                # Interfaz de herramienta
├── app.ts                           # Componente raíz
└── app.routes.ts                    # Configuración de rutas
```

## Dependencias

- **Angular**: ^22.0.0
- **Bootstrap**: ^5.x
- **RxJS**: ~7.8.0

## Instalación

1. Navega al directorio Angular:
```bash
cd Angular
```

2. Instala las dependencias:
```bash
npm install
```

## Configuración

### API URL
La aplicación está configurada para conectarse a la API en `http://localhost:8000/api`.

Si tu API está en una URL diferente, actualiza la URL en [src/app/services/tools.service.ts](src/app/services/tools.service.ts):

```typescript
private apiUrl = 'http://tu-api-url:puerto/api';
```

## Ejecución

### Desarrollo
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### Compilación para Producción
```bash
npm run build
```

## Rutas de la Aplicación

- `/` - Página de inicio
- `/tools` - Listado de todas las herramientas
- `/tools/:id` - Detalle de una herramienta específica
- `/categories` - Listado de categorías
- `/category/:name` - Herramientas de una categoría específica

## Componentes

### Navbar Component
Barra de navegación con links a secciones principales de la aplicación.

### Home Component
Página de bienvenida con estadísticas (cantidad de herramientas y categorías).

### Tools List Component
Muestra todas las herramientas en formato de tarjetas Bootstrap con información básica.

### Tool Detail Component
Muestra información detallada de una herramienta específica.

### Categories Component
Lista todas las categorías disponibles con el count de herramientas en cada una.

### Category Tools Component
Muestra todas las herramientas que pertenecen a una categoría específica.

## Servicios

### Tools Service
Servicio que realiza las peticiones HTTP a la API de Laravel:
- `getAll()` - Obtiene todas las herramientas
- `getById(id)` - Obtiene una herramienta específica
- `getByCategory(category)` - Obtiene herramientas de una categoría

## Estilos

La aplicación utiliza:
- **Bootstrap 5**: Para la estructura base y componentes
- **Estilos personalizados** en `src/app/app.css` para mejoras visuales

## CORS Configuration

La API de Laravel ha sido configurada con soporte CORS en `config/cors.php` para permitir solicitudes desde Angular.

## Requisitos del Sistema

- Node.js 18+ 
- npm 9+
- Angular CLI 22.0.0+

## Troubleshooting

### Error de CORS
Si recibes errores de CORS, verifica que:
1. La API de Laravel está ejecutándose
2. La configuración de CORS en Laravel está correcta
3. La URL de la API en el servicio es correcta

### Error de conexión a la API
- Asegúrate de que Laravel está corriendo en `http://localhost:8000`
- Verifica los logs de Laravel para errores
- Comprueba la conectividad de red

## Desarrollo

Para contribuir o modificar la aplicación:

1. Todos los componentes son standalone
2. Se utiliza Angular Signals para manejo de estado
3. El proyecto usa TypeScript strict mode
4. Bootstrap 5 para estilos

## Licencia
MIT
