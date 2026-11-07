import type { Tarea, Tema } from './tipos'
import { esFechaValida } from './utils/fechas'
import { esEstado } from './utils/tareas'

const CLAVE = 'bitacora-tareas'
const CLAVE_TEMA = 'bitacora-tema'

function esTarea(x: unknown): x is Tarea {
  if (typeof x !== 'object' || x === null) return false
  const t = x as Record<string, unknown>
  return (
    typeof t.id === 'string' &&
    typeof t.titulo === 'string' &&
    typeof t.proyecto === 'string' &&
    esEstado(t.estado) &&
    typeof t.inicio === 'string' &&
    esFechaValida(t.inicio) &&
    typeof t.fin === 'string' &&
    esFechaValida(t.fin) &&
    typeof t.horas === 'number' &&
    Number.isFinite(t.horas)
  )
}

/** Lee las tareas guardadas. Si no hay datos o están dañados, devuelve []. */
export function cargarTareas(): Tarea[] {
  try {
    const crudo = localStorage.getItem(CLAVE)
    if (!crudo) return []
    const datos: unknown = JSON.parse(crudo)
    return Array.isArray(datos) ? datos.filter(esTarea) : []
  } catch {
    return []
  }
}

export function guardarTareas(tareas: Tarea[]): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(tareas))
  } catch {
    // Almacenamiento lleno o no disponible: la app sigue funcionando en memoria.
  }
}

/** Tema elegido por la persona; null si nunca eligió uno. */
export function cargarTema(): Tema | null {
  try {
    const valor = localStorage.getItem(CLAVE_TEMA)
    return valor === 'claro' || valor === 'oscuro' ? valor : null
  } catch {
    return null
  }
}

export function guardarTema(tema: Tema): void {
  try {
    localStorage.setItem(CLAVE_TEMA, tema)
  } catch {
    // Sin almacenamiento disponible: el tema solo dura mientras la página esté abierta.
  }
}
