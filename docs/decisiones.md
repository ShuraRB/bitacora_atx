# Decisiones técnicas

| Decisión                                           | Motivo                                                                                                                                       |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Usar **oxlint** en lugar de ESLint                 | La plantilla `react-ts` actual de Vite ya no incluye ESLint; se respetó el linter de la plantilla. Se puede cambiar a ESLint si se prefiere. |
| Solo `@dnd-kit/core` y `@dnd-kit/utilities`        | No hace falta reordenar dentro de una columna; se evita `@dnd-kit/sortable`.                                                                 |
| Arrastrar desde un icono (⠿)                       | Evita conflictos con el scroll táctil y con los botones de la tarjeta.                                                                       |
| Botones "← / →" además del arrastre                | Alternativa accesible cuando arrastrar no es posible (móvil, teclado).                                                                       |
| Validación en `utils/tareas.ts`                    | Mantiene los componentes sin lógica de negocio y la hace testeable.                                                                          |
| Descartar registros inválidos al cargar            | Datos dañados en `localStorage` no deben romper la app.                                                                                      |
| Columnas apiladas en móvil, tres en pantalla ancha | Legibilidad en ambos formatos.                                                                                                               |
