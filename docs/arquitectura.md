# Arquitectura

## Stack

| Área           | Herramienta                                       |
| -------------- | ------------------------------------------------- |
| Framework      | React 19 + TypeScript, con Vite                   |
| Estilos        | Tailwind CSS (plugin oficial `@tailwindcss/vite`) |
| Drag and drop  | dnd-kit (`@dnd-kit/core`)                         |
| Fechas         | date-fns                                          |
| Pruebas        | Vitest + React Testing Library                    |
| Lint / formato | oxlint (de la plantilla) y Prettier               |
| Datos          | `localStorage`                                    |

## Estructura

```
src/
├── main.tsx              Punto de entrada
├── App.tsx               Estado de tareas; une formulario y tablero
├── tipos.ts              Tipos del proyecto (Tarea, Estado)
├── almacenamiento.ts     ÚNICO lugar que lee/escribe localStorage
├── componentes/          Un componente por archivo
│   ├── FormularioTarea.tsx
│   ├── Tablero.tsx       DndContext y sensores
│   ├── Columna.tsx       Zona de soltado (droppable)
│   ├── TarjetaTarea.tsx  Tarjeta arrastrable y botones de mover
│   ├── SelectorVista.tsx Alterna Kanban / Gantt
│   ├── VistaGantt.tsx    Cuadrícula de días y filas de tareas
│   ├── ControlesPeriodo.tsx  Semana / Mes y Anterior, Hoy, Siguiente
│   └── BarraTarea.tsx    Barra de una tarea, con color por estado
└── utils/
    ├── fechas.ts         Toda la lógica de fechas (funciones puras), incluidos los periodos del Gantt
    └── tareas.ts         Validación, creación y filtrado por periodo
```

Cada módulo con lógica tiene su archivo `.test.ts(x)` al lado.

## Flujo de datos

`App` guarda las tareas en estado de React. Al cargar lee con `cargarTareas()`; cada cambio se persiste con `guardarTareas()` mediante un `useEffect`. `FormularioTarea` valida con `validarTarea()` y entrega una `Tarea` nueva; `Tablero` notifica movimientos con `alMover(id, estado)`, ya sea por drag and drop o por los botones.

## Reglas de diseño

- Los componentes **no calculan fechas**: usan `utils/fechas.ts`.
- Los componentes **no tocan `localStorage`**: usan `almacenamiento.ts`. Cambiar el almacenamiento (por ejemplo a una API) solo afecta ese archivo.
- Todos los textos de la interfaz están en español.

## Vista Gantt

- Solo lectura: cada tarea es una barra entre `inicio` y `fin`; el selector Semana / Mes y los botones Anterior, Hoy y Siguiente cambian el periodo.
- La semana va de lunes a domingo.
- `VistaGantt` calcula el periodo con `rangoPeriodo` y `diasDelPeriodo`, filtra con `tareasDelPeriodo` y ubica cada barra con `posicionBarra` (columnas dentro de una cuadrícula CSS, una por día).
- Las tareas que empiezan antes o terminan después del periodo se recortan y el extremo se dibuja en flecha.
- Los días se cuentan con `differenceInCalendarDays`, para que el cambio de horario no desplace las barras.

## Diseño visual y temas

- Dirección "plano técnico": tinta azul marino y cobalto sobre papel con rejilla; los títulos usan una serif del sistema y el resto una sans del sistema.
- `src/index.css` define los tokens (superficies, bordes, tinta, acento, colores por estado) para el tema claro y el oscuro. Los componentes solo usan esos nombres.
- El tema se guarda en `bitacora-tema` (`almacenamiento.ts`) y se aplica como `data-tema` en `<html>`. Sin preferencia guardada se usa la del sistema.
- Responsive: en pantalla ancha el formulario va en una barra lateral fija; en tablet y móvil va arriba y las columnas del Kanban se apilan en móvil.
- Las animaciones se desactivan con `prefers-reduced-motion`.
