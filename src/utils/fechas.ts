import { format, isValid, parse } from 'date-fns'
import { es } from 'date-fns/locale'

const FORMATO_ISO = 'yyyy-MM-dd'
const PATRON_ISO = /^\d{4}-\d{2}-\d{2}$/

/** Fecha de hoy en hora local, como "AAAA-MM-DD". */
export function hoy(ahora: Date = new Date()): string {
  return format(ahora, FORMATO_ISO)
}

/** Convierte "AAAA-MM-DD" a Date en hora local; null si no es una fecha real. */
export function parsearFecha(texto: string): Date | null {
  if (!PATRON_ISO.test(texto)) return null
  const fecha = parse(texto, FORMATO_ISO, new Date(2000, 0, 1))
  return isValid(fecha) ? fecha : null
}

export function esFechaValida(texto: string): boolean {
  return parsearFecha(texto) !== null
}

/** Devuelve un mensaje de error en español, o null si el rango es válido. */
export function validarRango(inicio: string, fin: string): string | null {
  const fechaInicio = parsearFecha(inicio)
  if (!fechaInicio) return 'La fecha de inicio no es válida.'
  const fechaFin = parsearFecha(fin)
  if (!fechaFin) return 'La fecha de fin no es válida.'
  if (fechaFin < fechaInicio) {
    return 'La fecha de fin no puede ser anterior a la de inicio.'
  }
  return null
}

/** Formato legible, p. ej. "5 nov 2026". Si no es válida, devuelve el texto tal cual. */
export function formatearFecha(texto: string): string {
  const fecha = parsearFecha(texto)
  return fecha ? format(fecha, 'd MMM yyyy', { locale: es }) : texto
}

/** Rango legible; si inicio y fin son el mismo día, muestra una sola fecha. */
export function formatearRango(inicio: string, fin: string): string {
  return inicio === fin
    ? formatearFecha(inicio)
    : `${formatearFecha(inicio)} – ${formatearFecha(fin)}`
}
