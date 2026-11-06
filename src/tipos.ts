export type Estado = 'por-hacer' | 'en-curso' | 'hecho'

export const ESTADOS: readonly Estado[] = ['por-hacer', 'en-curso', 'hecho']

export const ETIQUETAS_ESTADO: Record<Estado, string> = {
  'por-hacer': 'Por hacer',
  'en-curso': 'En curso',
  hecho: 'Hecho',
}

export interface Tarea {
  id: string
  titulo: string
  proyecto: string
  estado: Estado
  /** Fecha local en formato AAAA-MM-DD */
  inicio: string
  /** Fecha local en formato AAAA-MM-DD */
  fin: string
  /** Múltiplos de 0.5, desde 0 */
  horas: number
}

export type Vista = 'kanban' | 'gantt'

export type Periodo = 'semana' | 'mes'
