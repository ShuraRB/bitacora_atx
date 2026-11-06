# Memoria del proyecto

## Estado actual

- Versión 1 terminada: formulario con validación, kanban de tres columnas, mover tareas arrastrando o con botones, y persistencia en `localStorage`.
- Vista Gantt hecha (solo lectura): selector Kanban / Gantt, selector Semana / Mes y botones Anterior, Hoy y Siguiente.
- `npm run build`, `npm run lint` y `npm run test` pasan (62 pruebas). El Gantt aún no se ha revisado a ojo en el navegador.
- Interfaz con paleta azul (Tailwind: `blue` para estructura, `sky` para textos secundarios).
- Existen `docs/` (visión, arquitectura, datos, guía de desarrollo, decisiones), `CLAUDE.md` y `.claude/settings.json` con permisos y un hook de lint.
- Aún no hay commits en `main`; todo está sin confirmar.

## Decisiones (y por qué)

- Linter oxlint en lugar de ESLint: la plantilla `react-ts` actual de Vite ya no trae ESLint y se respetó la plantilla.
- Solo `@dnd-kit/core` y `@dnd-kit/utilities`: no se pidió reordenar dentro de una columna.
- Arrastre desde el icono ⠿: evita choques con el scroll táctil y con los botones de la tarjeta.
- Validación de tareas en `utils/tareas.ts`: los componentes quedan sin lógica de negocio.
- Al cargar, se descartan registros inválidos: un `localStorage` dañado no debe romper la app.
- `.claude/settings.json` lista los comandos `npm run` uno por uno en lugar de `npm run *`, para no permitir scripts que no se pidieron.
- Gantt: semana desde lunes; las barras fuera del periodo se recortan con extremo en flecha; color por estado (sky, blue 500, blue 800); sin arrastrar ni editar desde el Gantt.
- `seSolapa` y `posicionBarra` viven en `utils/fechas.ts` para reutilizarlas en la exportación a Excel.
- Reglas `deny` (`.env`, `package-lock.json`, `git push`, `rm -rf`): son reglas de texto, no una barrera total.

## Aprendizajes y errores a evitar

- Verificado: la regla `Read(./.env)` bloquea la lectura de `.env`; no hay que rodearla con otros comandos.
- Sin verificar: si Claude recibe el error del hook de lint cuando `npm run lint` falla (código 1). Puede hacer falta código 2.
- Las fechas siempre en hora local; ver las trampas en `CLAUDE.md`.
- Probar fechas con `vi.useFakeTimers({ toFake: ['Date'] })`; falsear también los timers rompe `userEvent`.

## Próximos pasos

- Hacer el primer commit del proyecto (pendiente de que el usuario lo pida).
- Probar el hook de lint con una edición real y confirmar si el error llega a Claude.
- Revisar el Gantt en el navegador (móvil y pantalla ancha).
- Exportar las tareas a Excel.
- Completar la sección Documentación de `CLAUDE.md` (Paso 4).
