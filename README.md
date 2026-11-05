# Bitácora de tareas

Registro de tareas de trabajo (título, proyecto, fechas y horas) en un tablero kanban. Datos en `localStorage` (clave `bitacora-tareas`).

## Scripts

`npm run dev` · `npm run build` · `npm run lint` · `npm test` · `npm run format`

## Estructura

- `src/tipos.ts`: tipos del proyecto (`Tarea`, `Estado`).
- `src/utils/fechas.ts`: toda la lógica de fechas (hora local, funciones puras).
- `src/almacenamiento.ts`: único lugar que lee/escribe `localStorage`.
- `src/componentes/`: un componente por archivo.
