import { describe, expect, it } from 'vitest'
import {
  esFechaValida,
  formatearFecha,
  formatearRango,
  hoy,
  parsearFecha,
  validarRango,
} from './fechas'

describe('hoy', () => {
  it('usa la fecha local y no la UTC', () => {
    // 31 dic 2026, 23:30 hora local: en UTC podría ser ya el año siguiente.
    expect(hoy(new Date(2026, 11, 31, 23, 30))).toBe('2026-12-31')
    // 1 ene 2027, 00:15 hora local: en UTC podría ser aún el año anterior.
    expect(hoy(new Date(2027, 0, 1, 0, 15))).toBe('2027-01-01')
  })

  it('rellena con ceros mes y día', () => {
    expect(hoy(new Date(2026, 2, 5))).toBe('2026-03-05')
  })
})

describe('parsearFecha / esFechaValida', () => {
  it('interpreta la fecha en hora local sin desplazar el día', () => {
    const f = parsearFecha('2026-11-05')
    expect(f?.getFullYear()).toBe(2026)
    expect(f?.getMonth()).toBe(10)
    expect(f?.getDate()).toBe(5)
  })

  it('acepta fechas reales, incluido el 29 de febrero bisiesto', () => {
    expect(esFechaValida('2024-02-29')).toBe(true)
  })

  it('rechaza fechas inexistentes o mal formadas', () => {
    expect(esFechaValida('2026-02-30')).toBe(false)
    expect(esFechaValida('2025-02-29')).toBe(false)
    expect(esFechaValida('2026-13-01')).toBe(false)
    expect(esFechaValida('2026-1-5')).toBe(false)
    expect(esFechaValida('05/11/2026')).toBe(false)
    expect(esFechaValida('')).toBe(false)
  })
})

describe('validarRango', () => {
  it('acepta fin posterior a inicio', () => {
    expect(validarRango('2026-11-01', '2026-11-05')).toBeNull()
  })

  it('acepta fin igual a inicio', () => {
    expect(validarRango('2026-11-05', '2026-11-05')).toBeNull()
  })

  it('rechaza fin anterior a inicio', () => {
    expect(validarRango('2026-11-05', '2026-11-04')).toBe(
      'La fecha de fin no puede ser anterior a la de inicio.',
    )
  })

  it('compara correctamente entre meses y años', () => {
    expect(validarRango('2026-12-31', '2027-01-01')).toBeNull()
    expect(validarRango('2027-01-01', '2026-12-31')).not.toBeNull()
  })

  it('rechaza fechas vacías o inválidas', () => {
    expect(validarRango('', '2026-11-05')).toBe(
      'La fecha de inicio no es válida.',
    )
    expect(validarRango('2026-11-05', '2026-02-30')).toBe(
      'La fecha de fin no es válida.',
    )
  })
})

describe('formatearFecha / formatearRango', () => {
  it('da formato en español', () => {
    expect(formatearFecha('2026-11-05')).toBe('5 nov 2026')
  })

  it('devuelve el texto original si no es válida', () => {
    expect(formatearFecha('basura')).toBe('basura')
  })

  it('muestra una sola fecha cuando inicio y fin coinciden', () => {
    expect(formatearRango('2026-11-05', '2026-11-05')).toBe('5 nov 2026')
    expect(formatearRango('2026-11-05', '2026-11-07')).toBe(
      '5 nov 2026 – 7 nov 2026',
    )
  })
})
