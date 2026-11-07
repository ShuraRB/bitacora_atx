# Memoria del proyecto

## Estado actual

- Versión 1 terminada: formulario con validación, kanban de tres columnas, mover tareas arrastrando o con botones, y persistencia en `localStorage`.
- Vista Gantt hecha (solo lectura): selector Kanban / Gantt, selector Semana / Mes y botones Anterior, Hoy y Siguiente.
- `npm run build`, `npm run lint` y `npm run test` pasan (62 pruebas). El Gantt aún no se ha revisado a ojo en el navegador.
- Rediseño visual hecho (dirección "plano técnico"): tinta azul marino y cobalto sobre papel con rejilla, títulos en serif del sistema, formulario en barra lateral en pantalla ancha, modo claro y oscuro con interruptor persistente.
- Revisado con capturas en 1440, 820 y 390 px, en ambos temas.
- Existen `docs/` (visión, arquitectura, datos, guía de desarrollo, decisiones), `CLAUDE.md` y `.claude/settings.json` con permisos y un hook de lint.
- Aún no hay commits en `main`; todo está sin confirmar.

## Decisiones (y por qué)

- Linter oxlint en lugar de ESLint: la plantilla `react-ts` actual de Vite ya no trae ESLint y se respetó la plantilla.
- Solo `@dnd-kit/core` y `@dnd-kit/utilities`: no se pidió reordenar dentro de una columna.
- Arrastre desde el icono ⠿: evita choques con el scroll táctil y con los botones de la tarjeta.
- Validación de tareas en `utils/tareas.ts`: los componentes quedan sin lógica de negocio.
- Al cargar, se descartan registros inválidos: un `localStorage` dañado no debe romper la app.
- `.claude/settings.json` lista los comandos `npm run` uno por uno en lugar de `npm run *`, para no permitir scripts que no se pidieron.
- Gantt: semana desde lunes; las barras fuera del periodo se recortan con extremo en flecha; color por estado con los tokens `hacer`, `curso` y `hecho`; sin arrastrar ni editar desde el Gantt.
- `seSolapa` y `posicionBarra` viven en `utils/fechas.ts` para reutilizarlas en la exportación a Excel.
- Rediseño: colores como tokens semánticos en `index.css` (sin `dark:` por componente); sin fuentes externas, para que funcione sin conexión; solo una animación llamativa (las barras del Gantt crecen al cambiar de periodo).
- Tema guardado en la clave `bitacora-tema`, separada de las tareas; `almacenamiento.ts` sigue siendo el único que toca `localStorage`.
- Reglas `deny` (`.env`, `package-lock.json`, `git push`, `rm -rf`): son reglas de texto, no una barrera total.

## Aprendizajes y errores a evitar

- Verificado: la regla `Read(./.env)` bloquea la lectura de `.env`; no hay que rodearla con otros comandos.
- Sin verificar: si Claude recibe el error del hook de lint cuando `npm run lint` falla (código 1). Puede hacer falta código 2.
- Las fechas siempre en hora local; ver las trampas en `CLAUDE.md`.
- Un `npm run build` vacía `dist/`: si se usan archivos auxiliares para capturas de pantalla, hay que regenerarlos después.
- Probar fechas con `vi.useFakeTimers({ toFake: ['Date'] })`; falsear también los timers rompe `userEvent`.

## Próximos pasos

- Hacer el primer commit del proyecto (pendiente de que el usuario lo pida).
- Probar el hook de lint con una edición real y confirmar si el error llega a Claude.
- En móvil el formulario ocupa la primera pantalla y empuja el tablero hacia abajo; valorar hacerlo plegable.
- Exportar las tareas a Excel.
- Completar la sección Documentación de `CLAUDE.md` (Paso 4).
