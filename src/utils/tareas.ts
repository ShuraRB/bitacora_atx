import { ESTADOS, type Estado, type Tarea } from '../tipos'
import { seSolapa, validarRango, type RangoFechas } from './fechas'

export interface DatosTarea {
  titulo: string
  proyecto: string
  inicio: string
  fin: string
  horas: string
}

export type ErroresTarea = Partial<Record<keyof DatosTarea, string>>

export function validarTarea(datos: DatosTarea): ErroresTarea {
  const errores: ErroresTarea = {}
  if (!datos.titulo.trim()) errores.titulo = 'El título es obligatorio.'
  if (!datos.proyecto.trim()) errores.proyecto = 'El proyecto es obligatorio.'

  const horas = Number(datos.horas)
  if (datos.horas.trim() === '' || !Number.isFinite(horas)) {
    errores.horas = 'Las horas deben ser un número.'
  } else if (horas < 0) {
    errores.horas = 'Las horas no pueden ser negativas.'
  } else if (!esMultiploDeMedia(horas)) {
    errores.horas = 'Las horas deben ir en múltiplos de 0.5.'
  }

  const errorRango = validarRango(datos.inicio, datos.fin)
  if (errorRango) {
    // El error de rango se asocia a la fecha que lo provoca.
    if (errorRango.includes('inicio no es')) errores.inicio = errorRango
    else errores.fin = errorRango
  }
  return errores
}

export function esMultiploDeMedia(n: number): boolean {
  return Number.isInteger(n * 2)
}

export function crearTarea(datos: DatosTarea): Tarea {
  return {
    id: crypto.randomUUID(),
    titulo: datos.titulo.trim(),
    proyecto: datos.proyecto.trim(),
    estado: 'por-hacer',
    inicio: datos.inicio,
    fin: datos.fin,
    horas: Number(datos.horas),
  }
}

export function esEstado(valor: unknown): valor is Estado {
  return ESTADOS.includes(valor as Estado)
}

/** Tareas que se solapan con el periodo, ordenadas por inicio y luego por título. */
export function tareasDelPeriodo(
  tareas: Tarea[],
  periodo: RangoFechas,
): Tarea[] {
  return tareas
    .filter(
      (t) => validarRango(t.inicio, t.fin) === null && seSolapa(t, periodo),
    )
    .sort(
      (a, b) =>
        a.inicio.localeCompare(b.inicio) ||
        a.titulo.localeCompare(b.titulo, 'es'),
    )
}
