# Guía de desarrollo

## Requisitos

Node.js 22 o superior y npm.

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`). Para probar desde el celular en la misma red: `npm run dev -- --host`.

## Scripts

| Comando           | Qué hace                             |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Servidor de desarrollo               |
| `npm run build`   | Comprueba tipos y genera `dist/`     |
| `npm run lint`    | Lint con oxlint                      |
| `npm test`        | Ejecuta las pruebas una vez (Vitest) |
| `npm run format`  | Formatea todo con Prettier           |
| `npm run preview` | Sirve el build de producción         |

Antes de confirmar cambios, deben pasar `build`, `lint` y `test`.

## Pruebas

- Vitest con entorno `jsdom`; configuración en `vite.config.ts` y `src/setupTests.ts` (limpia el DOM y `localStorage` tras cada prueba).
- Pruebas unitarias para `fechas`, `tareas` y `almacenamiento`; pruebas de interfaz en `App.test.tsx`.
- Las pruebas de fechas deben cubrir hora local y el caso de fin anterior a inicio.

## Convenciones

- Un componente por archivo en `src/componentes/`.
- Lógica de fechas solo en `src/utils/fechas.ts`; acceso a `localStorage` solo en `src/almacenamiento.ts`.
- Textos de interfaz y mensajes de error en español.
- Prettier: sin punto y coma, comillas simples.
- No agregar librerías nuevas sin acordarlo antes.
