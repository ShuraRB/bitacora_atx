# Visión general

**Bitácora de tareas** es una web para registrar tareas de trabajo con sus fechas y horas, de modo que sea fácil consultar lo hecho en la semana o el mes cuando se solicite.

## Alcance de la versión 1

1. Formulario para agregar tareas (título, proyecto, inicio, fin, horas) con mensajes de error en español.
2. Tablero kanban con tres columnas: Por hacer, En curso y Hecho.
3. Mover tareas entre columnas arrastrando o con botones.
4. Persistencia en `localStorage`: los datos sobreviven a recargar la página.

Fuera de alcance en v1: editar o eliminar tareas, vista Gantt, exportación a Excel, cuentas de usuario y backend.

## Hoja de ruta

| Versión | Funcionalidad                           |
| ------- | --------------------------------------- |
| 1       | Formulario, kanban y persistencia local |
| Próxima | Vista Gantt por semana y por mes        |
| Próxima | Exportar tareas a Excel                 |

La base (tipos, lógica de fechas y almacenamiento aislados) está pensada para agregar estas funciones sin reescribir lo existente.
