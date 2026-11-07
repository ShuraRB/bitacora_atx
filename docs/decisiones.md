# Decisiones técnicas

| Decisión                                           | Motivo                                                                                                                                               |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Usar **oxlint** en lugar de ESLint                 | La plantilla `react-ts` actual de Vite ya no incluye ESLint; se respetó el linter de la plantilla. Se puede cambiar a ESLint si se prefiere.         |
| Solo `@dnd-kit/core` y `@dnd-kit/utilities`        | No hace falta reordenar dentro de una columna; se evita `@dnd-kit/sortable`.                                                                         |
| Arrastrar desde un icono (⠿)                       | Evita conflictos con el scroll táctil y con los botones de la tarjeta.                                                                               |
| Botones "← / →" además del arrastre                | Alternativa accesible cuando arrastrar no es posible (móvil, teclado).                                                                               |
| Validación en `utils/tareas.ts`                    | Mantiene los componentes sin lógica de negocio y la hace testeable.                                                                                  |
| Descartar registros inválidos al cargar            | Datos dañados en `localStorage` no deben romper la app.                                                                                              |
| Columnas apiladas en móvil, tres en pantalla ancha | Legibilidad en ambos formatos.                                                                                                                       |
| Tema claro y oscuro con tokens en `index.css`      | Los componentes usan nombres semánticos (`bg-superficie`, `text-tinta`) y el tema solo cambia los valores; no hace falta `dark:` en cada componente. |
| Tema en la clave `bitacora-tema`                   | Separada de `bitacora-tareas` para no tocar la forma de los datos guardados. Sin valor se respeta la preferencia del sistema.                        |
| Sin fuentes externas                               | Títulos con serif del sistema y texto con sans del sistema: no hay peticiones de red y la app funciona sin conexión.                                 |
| Formulario en barra lateral en pantalla ancha      | Deja el formulario siempre a mano y da todo el ancho al tablero y al Gantt. En tablet y móvil pasa arriba.                                           |
