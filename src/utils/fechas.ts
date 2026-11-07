import {
  addMonths,
  addWeeks,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isValid,
  parse,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { es } from 'date-fns/locale'
import type { Periodo } from '../tipos'

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

// ---------- Periodos (vista Gantt) ----------

/** La semana empieza en lunes. */
const OPCIONES_SEMANA = { weekStartsOn: 1 } as const

export interface RangoFechas {
  inicio: string
  fin: string
}

export interface PosicionBarra {
  /** Columna de inicio dentro del periodo, empezando en 1. */
  columnaInicio: number
  /** Columna de fin (incluida) dentro del periodo. */
  columnaFin: number
  recortadaIzquierda: boolean
  recortadaDerecha: boolean
}

function aTexto(fecha: Date): string {
  return format(fecha, FORMATO_ISO)
}

/** Semana (lunes a domingo) o mes que contiene la fecha de referencia. */
export function rangoPeriodo(
  referencia: string,
  periodo: Periodo,
): RangoFechas {
  const base = parsearFecha(referencia) ?? new Date()
  if (periodo === 'semana') {
    return {
      inicio: aTexto(startOfWeek(base, OPCIONES_SEMANA)),
      fin: aTexto(endOfWeek(base, OPCIONES_SEMANA)),
    }
  }
  return { inicio: aTexto(startOfMonth(base)), fin: aTexto(endOfMonth(base)) }
}

/** Todos los días del rango, de inicio a fin, como "AAAA-MM-DD". */
export function diasDelPeriodo(inicio: string, fin: string): string[] {
  const desde = parsearFecha(inicio)
  const hasta = parsearFecha(fin)
  if (!desde || !hasta || hasta < desde) return []
  return eachDayOfInterval({ start: desde, end: hasta }).map(aTexto)
}

/**
 * Referencia del periodo anterior (pasos < 0) o siguiente (pasos > 0).
 * Parte del primer día del periodo para evitar saltos como 31 ene + 1 mes.
 */
export function desplazarPeriodo(
  referencia: string,
  periodo: Periodo,
  pasos: number,
): string {
  const { inicio } = rangoPeriodo(referencia, periodo)
  const base = parsearFecha(inicio) ?? new Date()
  return aTexto(
    periodo === 'semana' ? addWeeks(base, pasos) : addMonths(base, pasos),
  )
}

/** Un rango se solapa con un periodo si empieza antes de que acabe y acaba después de que empiece. */
export function seSolapa(rango: RangoFechas, periodo: RangoFechas): boolean {
  const a = parsearFecha(rango.inicio)
  const b = parsearFecha(rango.fin)
  const c = parsearFecha(periodo.inicio)
  const d = parsearFecha(periodo.fin)
  if (!a || !b || !c || !d) return false
  return (
    differenceInCalendarDays(a, d) <= 0 && differenceInCalendarDays(b, c) >= 0
  )
}

/**
 * Columnas que ocupa una barra dentro del periodo, recortada a sus límites.
 * Devuelve null si no se solapa o si el rango es inválido (fin anterior a inicio).
 */
export function posicionBarra(
  rango: RangoFechas,
  periodo: RangoFechas,
): PosicionBarra | null {
  if (validarRango(rango.inicio, rango.fin) !== null) return null
  if (!seSolapa(rango, periodo)) return null
  const inicio = parsearFecha(rango.inicio)
  const fin = parsearFecha(rango.fin)
  const periodoInicio = parsearFecha(periodo.inicio)
  const periodoFin = parsearFecha(periodo.fin)
  if (!inicio || !fin || !periodoInicio || !periodoFin) return null

  const ultimoDia = differenceInCalendarDays(periodoFin, periodoInicio)
  const diaInicio = differenceInCalendarDays(inicio, periodoInicio)
  const diaFin = differenceInCalendarDays(fin, periodoInicio)
  return {
    columnaInicio: Math.max(diaInicio, 0) + 1,
    columnaFin: Math.min(diaFin, ultimoDia) + 1,
    recortadaIzquierda: diaInicio < 0,
    recortadaDerecha: diaFin > ultimoDia,
  }
}

/** Texto del periodo: "2 – 8 nov 2026" para semana, "noviembre 2026" para mes. */
export function etiquetaPeriodo(rango: RangoFechas, periodo: Periodo): string {
  const inicio = parsearFecha(rango.inicio)
  const fin = parsearFecha(rango.fin)
  if (!inicio || !fin) return ''
  if (periodo === 'mes') return format(inicio, 'LLLL yyyy', { locale: es })
  if (inicio.getFullYear() !== fin.getFullYear()) {
    return `${format(inicio, 'd MMM yyyy', { locale: es })} – ${format(fin, 'd MMM yyyy', { locale: es })}`
  }
  if (inicio.getMonth() !== fin.getMonth()) {
    return `${format(inicio, 'd MMM', { locale: es })} – ${format(fin, 'd MMM yyyy', { locale: es })}`
  }
  return `${format(inicio, 'd', { locale: es })} – ${format(fin, 'd MMM yyyy', { locale: es })}`
}

/** Encabezado de columna: "lun 2". */
export function etiquetaDia(fecha: string): string {
  const f = parsearFecha(fecha)
  return f ? format(f, 'EEE d', { locale: es }) : fecha
}

/** Sábado o domingo. */
export function esFinDeSemana(fecha: string): boolean {
  const f = parsearFecha(fecha)
  return f !== null && (f.getDay() === 0 || f.getDay() === 6)
}
