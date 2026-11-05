# Modelo de datos

## Tarea

Definida en `src/tipos.ts`:

```ts
interface Tarea {
  id: string
  titulo: string
  proyecto: string
  estado: 'por-hacer' | 'en-curso' | 'hecho'
  inicio: string // AAAA-MM-DD
  fin: string // AAAA-MM-DD
  horas: number
}
```

| Campo      | Regla                                                                          |
| ---------- | ------------------------------------------------------------------------------ |
| `id`       | Texto único generado con `crypto.randomUUID()`                                 |
| `titulo`   | Obligatorio (se recortan espacios)                                             |
| `proyecto` | Obligatorio (se recortan espacios)                                             |
| `estado`   | Una tarea nueva empieza en `por-hacer`                                         |
| `inicio`   | Fecha real en formato `AAAA-MM-DD`; por defecto, hoy                           |
| `fin`      | Fecha real en `AAAA-MM-DD`; no puede ser anterior a `inicio`; por defecto, hoy |
| `horas`    | Número desde 0, en múltiplos de 0.5                                            |

## Fechas

Siempre en **hora local** del usuario, nunca UTC. Por eso no se usa `toISOString()` ni `new Date("AAAA-MM-DD")` (ambos pueden desplazar el día). Se usa `format` y `parse` de date-fns, que trabajan en hora local, encapsulados en `src/utils/fechas.ts`.

## Almacenamiento

- Clave de `localStorage`: `bitacora-tareas`.
- Valor: arreglo JSON de `Tarea`.
- Al cargar, los registros con forma inválida o JSON dañado se descartan en lugar de romper la app.
