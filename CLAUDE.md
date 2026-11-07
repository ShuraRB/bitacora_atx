# Bitácora de tareas

## Proyecto

- Web para registrar tareas de trabajo con sus fechas y horas, para consultar lo hecho en la semana o el mes cuando se pida.
- Es de uso personal y funciona solo en el navegador, sin backend.

## Comandos

- `npm run dev`: servidor de desarrollo.
- `npm run build`: comprueba tipos con tsc y genera `dist/`.
- `npm run lint`: ejecuta oxlint.
- `npm run test`: ejecuta Vitest una sola vez.
- `npm run format`: formatea todo el proyecto con Prettier.
- Un solo archivo de pruebas: `npm run test -- src/utils/fechas.test.ts`.

## Stack

- El linter es oxlint (el de la plantilla de Vite), no ESLint.
- Tailwind CSS 4 con el plugin `@tailwindcss/vite`; no hay `tailwind.config`.
- Los colores, sombras y fuentes son tokens semánticos definidos en `src/index.css` (`bg-superficie`, `text-tinta`, `bg-acento`, `bg-hacer`...); el tema claro y el oscuro solo cambian sus valores.
- Drag and drop con `@dnd-kit/core`; no está instalado `@dnd-kit/sortable`.
- Las pruebas usan jsdom y `src/setupTests.ts` limpia el DOM y `localStorage` tras cada prueba.
- Estructura de `src/`:
  - `componentes/`: un componente por archivo (`Cabecera`, `InterruptorTema`, `SelectorVista`, `ControlSegmentado`, `Icono`, `FormularioTarea`, `Campo`, `Tablero`, `Columna`, `TarjetaTarea`, `VistaGantt`, `ControlesPeriodo`, `FilaGantt`, `BarraTarea`).
  - `estilos.ts`: clases de Tailwind por estado de tarea.
  - `tipos.ts`: tipos del proyecto (`Tarea`, `Estado`, `Vista`, `Periodo`, `Tema`).
  - `utils/fechas.ts`: toda la lógica de fechas, como funciones puras; incluye los periodos del Gantt (`rangoPeriodo`, `diasDelPeriodo`, `desplazarPeriodo`, `seSolapa`, `posicionBarra`).
  - `utils/tareas.ts`: validación, creación y filtrado por periodo (`tareasDelPeriodo`) de tareas.
  - `almacenamiento.ts`: único lugar que lee y escribe `localStorage`.

## Convenciones

- Todos los textos de la interfaz y los mensajes de error van en español.
- Escribe código simple, sin abstracciones que no hagan falta.
- Usa nombres descriptivos en español para el dominio (`tarea`, `proyecto`, `inicio`, `fin`).
- No pongas colores fijos (`blue-500`, `#fff`) en los componentes: usa los tokens de `src/index.css` para que funcionen en ambos temas.
- Cada módulo con lógica tiene su archivo de pruebas junto a él.

## Trampas conocidas

- Usa siempre la fecha local del usuario.
- Nunca uses `toISOString()` ni `new Date("AAAA-MM-DD")`: se interpretan en UTC y desplazan el día.
- Los componentes no calculan fechas; llaman a funciones de `utils/fechas.ts`.
- Una tarea pertenece a un periodo si se solapa con él: `inicio <= finDelPeriodo` y `fin >= inicioDelPeriodo`.
- El solapamiento ya está en `seSolapa` (`utils/fechas.ts`); reutilízalo en el Gantt y en la exportación, no lo reescribas.
- Para días entre fechas usa `differenceInCalendarDays` (días de calendario); no restes milisegundos, el cambio de horario rompe la cuenta.
- La semana empieza en lunes (`weekStartsOn: 1`).

## Datos

- Clave de `localStorage`: `bitacora-tareas`, con un arreglo JSON de tareas.
- Forma de cada tarea: `{ id, titulo, proyecto, estado, inicio, fin, horas }`.
- `id`: texto único creado con `crypto.randomUUID()`.
- `estado`: `"por-hacer"`, `"en-curso"` o `"hecho"`; una tarea nueva empieza en `"por-hacer"`.
- `inicio` y `fin`: texto `"AAAA-MM-DD"`; `fin` no puede ser anterior a `inicio`.
- `horas`: número en múltiplos de 0.5, desde 0.
- Al cargar, los registros con forma inválida se descartan.
- Tema: clave `bitacora-tema` con `"claro"` o `"oscuro"`; sin valor guardado se usa la preferencia del sistema.

## Forma de trabajar

- Haz cambios pequeños y revisables.
- No añadas funcionalidades que no se hayan pedido.
- Al terminar, resume qué cambió y qué decisiones tomaste por tu cuenta.

## Límites

- ✅ Siempre: respetar las reglas de fechas y mantener los textos en español.
- ✅ Siempre: actualizar `MEMORY.md` al terminar cada tarea.
- ⚠ Pregunta antes: crear archivos nuevos o cambiar la forma de los datos guardados.
- 🚫 Nunca: añadir librerías sin avisar.

## Verificación

- Antes de dar algo por terminado, ejecuta `npm run build`, `npm run lint` y `npm run test`.
- Los tres deben pasar sin errores.

## Memoria

- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones tomadas.
- Al terminar una tarea, actualiza `MEMORY.md`.
- Mantenlo breve (máximo unas 50 líneas): resume o elimina lo que ya no aporte.
- Si algo se vuelve una regla permanente, propón moverlo a `CLAUDE.md` en lugar de dejarlo en la memoria.
- No guardes nunca datos sensibles.

## Documentación

Se completa en el Paso 4
