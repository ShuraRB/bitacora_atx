import { describe, expect, it } from 'vitest'
import {
  desplazarPeriodo,
  diasDelPeriodo,
  esFechaValida,
  etiquetaDia,
  etiquetaPeriodo,
  posicionBarra,
  rangoPeriodo,
  seSolapa,
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

describe('rangoPeriodo', () => {
  it('la semana va de lunes a domingo', () => {
    // 2026-11-05 es jueves
    expect(rangoPeriodo('2026-11-05', 'semana')).toEqual({
      inicio: '2026-11-02',
      fin: '2026-11-08',
    })
  })

  it('un domingo pertenece a la semana que termina ese día', () => {
    expect(rangoPeriodo('2026-11-08', 'semana')).toEqual({
      inicio: '2026-11-02',
      fin: '2026-11-08',
    })
    expect(rangoPeriodo('2026-11-02', 'semana').inicio).toBe('2026-11-02')
  })

  it('la semana puede cruzar de mes y de año', () => {
    expect(rangoPeriodo('2026-12-31', 'semana')).toEqual({
      inicio: '2026-12-28',
      fin: '2027-01-03',
    })
  })

  it('el mes va del día 1 al último día', () => {
    expect(rangoPeriodo('2026-11-15', 'mes')).toEqual({
      inicio: '2026-11-01',
      fin: '2026-11-30',
    })
    expect(rangoPeriodo('2026-12-10', 'mes').fin).toBe('2026-12-31')
  })

  it('febrero tiene 28 o 29 días según el año', () => {
    expect(rangoPeriodo('2026-02-10', 'mes').fin).toBe('2026-02-28')
    expect(rangoPeriodo('2024-02-10', 'mes').fin).toBe('2024-02-29')
  })
})

describe('diasDelPeriodo', () => {
  it('lista los 7 días de una semana', () => {
    const { inicio, fin } = rangoPeriodo('2026-11-05', 'semana')
    const dias = diasDelPeriodo(inicio, fin)
    expect(dias).toHaveLength(7)
    expect(dias[0]).toBe('2026-11-02')
    expect(dias[6]).toBe('2026-11-08')
  })

  it('lista todos los días del mes', () => {
    expect(diasDelPeriodo('2024-02-01', '2024-02-29')).toHaveLength(29)
    expect(diasDelPeriodo('2026-12-01', '2026-12-31')).toHaveLength(31)
  })

  it('devuelve [] si el rango es inválido', () => {
    expect(diasDelPeriodo('2026-11-05', '2026-11-01')).toEqual([])
    expect(diasDelPeriodo('x', '2026-11-01')).toEqual([])
  })
})

describe('desplazarPeriodo', () => {
  it('mueve semanas hacia atrás y adelante desde el lunes', () => {
    expect(desplazarPeriodo('2026-11-05', 'semana', 1)).toBe('2026-11-09')
    expect(desplazarPeriodo('2026-11-05', 'semana', -1)).toBe('2026-10-26')
  })

  it('mueve meses sin saltarse ninguno desde el día 31', () => {
    expect(desplazarPeriodo('2026-01-31', 'mes', 1)).toBe('2026-02-01')
    expect(desplazarPeriodo('2026-03-31', 'mes', -1)).toBe('2026-02-01')
  })

  it('cambia de año', () => {
    expect(desplazarPeriodo('2026-12-15', 'mes', 1)).toBe('2027-01-01')
    expect(desplazarPeriodo('2027-01-15', 'mes', -1)).toBe('2026-12-01')
  })
})

describe('seSolapa', () => {
  const periodo = { inicio: '2026-11-02', fin: '2026-11-08' }

  it('detecta tareas dentro del periodo', () => {
    expect(seSolapa({ inicio: '2026-11-03', fin: '2026-11-04' }, periodo)).toBe(
      true,
    )
  })

  it('cuenta como solapadas las que tocan solo el primer o el último día', () => {
    expect(seSolapa({ inicio: '2026-10-30', fin: '2026-11-02' }, periodo)).toBe(
      true,
    )
    expect(seSolapa({ inicio: '2026-11-08', fin: '2026-11-12' }, periodo)).toBe(
      true,
    )
  })

  it('detecta tareas que abarcan todo el periodo', () => {
    expect(seSolapa({ inicio: '2026-10-01', fin: '2026-12-01' }, periodo)).toBe(
      true,
    )
  })

  it('descarta tareas totalmente antes o después', () => {
    expect(seSolapa({ inicio: '2026-10-25', fin: '2026-11-01' }, periodo)).toBe(
      false,
    )
    expect(seSolapa({ inicio: '2026-11-09', fin: '2026-11-10' }, periodo)).toBe(
      false,
    )
  })
})

describe('posicionBarra', () => {
  const semana = { inicio: '2026-11-02', fin: '2026-11-08' }

  it('una tarea de un solo día ocupa una columna', () => {
    expect(
      posicionBarra({ inicio: '2026-11-05', fin: '2026-11-05' }, semana),
    ).toEqual({
      columnaInicio: 4,
      columnaFin: 4,
      recortadaIzquierda: false,
      recortadaDerecha: false,
    })
  })

  it('una tarea dentro del periodo no se recorta', () => {
    expect(
      posicionBarra({ inicio: '2026-11-03', fin: '2026-11-06' }, semana),
    ).toEqual({
      columnaInicio: 2,
      columnaFin: 5,
      recortadaIzquierda: false,
      recortadaDerecha: false,
    })
  })

  it('una tarea de toda la semana ocupa las 7 columnas sin recorte', () => {
    expect(posicionBarra(semana, semana)).toEqual({
      columnaInicio: 1,
      columnaFin: 7,
      recortadaIzquierda: false,
      recortadaDerecha: false,
    })
  })

  it('recorta por la izquierda si empieza antes del periodo', () => {
    expect(
      posicionBarra({ inicio: '2026-10-29', fin: '2026-11-04' }, semana),
    ).toEqual({
      columnaInicio: 1,
      columnaFin: 3,
      recortadaIzquierda: true,
      recortadaDerecha: false,
    })
  })

  it('recorta por la derecha si termina después del periodo', () => {
    expect(
      posicionBarra({ inicio: '2026-11-06', fin: '2026-11-12' }, semana),
    ).toEqual({
      columnaInicio: 5,
      columnaFin: 7,
      recortadaIzquierda: false,
      recortadaDerecha: true,
    })
  })

  it('recorta por ambos lados si abarca el periodo completo', () => {
    expect(
      posicionBarra({ inicio: '2026-10-01', fin: '2026-12-01' }, semana),
    ).toEqual({
      columnaInicio: 1,
      columnaFin: 7,
      recortadaIzquierda: true,
      recortadaDerecha: true,
    })
  })

  it('una tarea que cruza dos semanas aparece recortada en cada una', () => {
    const tarea = { inicio: '2026-11-06', fin: '2026-11-10' }
    const siguiente = { inicio: '2026-11-09', fin: '2026-11-15' }
    expect(posicionBarra(tarea, semana)?.recortadaDerecha).toBe(true)
    expect(posicionBarra(tarea, siguiente)).toEqual({
      columnaInicio: 1,
      columnaFin: 2,
      recortadaIzquierda: true,
      recortadaDerecha: false,
    })
  })

  it('devuelve null fuera del periodo', () => {
    expect(
      posicionBarra({ inicio: '2026-11-09', fin: '2026-11-10' }, semana),
    ).toBeNull()
  })

  it('devuelve null si fin es anterior a inicio', () => {
    expect(
      posicionBarra({ inicio: '2026-11-06', fin: '2026-11-03' }, semana),
    ).toBeNull()
  })

  it('funciona en un mes completo', () => {
    const mes = { inicio: '2026-11-01', fin: '2026-11-30' }
    expect(
      posicionBarra({ inicio: '2026-11-30', fin: '2026-12-02' }, mes),
    ).toEqual({
      columnaInicio: 30,
      columnaFin: 30,
      recortadaIzquierda: false,
      recortadaDerecha: true,
    })
  })

  it('cuenta días de calendario en el cambio de horario de marzo', () => {
    // En zonas con horario de verano, ese fin de semana tiene un día de 23 horas.
    const periodo = { inicio: '2026-03-01', fin: '2026-03-31' }
    expect(
      posicionBarra({ inicio: '2026-03-10', fin: '2026-03-10' }, periodo),
    ).toMatchObject({
      columnaInicio: 10,
      columnaFin: 10,
    })
  })
})

describe('etiquetaPeriodo / etiquetaDia', () => {
  it('etiqueta una semana dentro de un mes', () => {
    expect(
      etiquetaPeriodo({ inicio: '2026-11-02', fin: '2026-11-08' }, 'semana'),
    ).toBe('2 – 8 nov 2026')
  })

  it('etiqueta una semana que cruza de mes y de año', () => {
    expect(
      etiquetaPeriodo({ inicio: '2026-10-26', fin: '2026-11-01' }, 'semana'),
    ).toBe('26 oct – 1 nov 2026')
    expect(
      etiquetaPeriodo({ inicio: '2026-12-28', fin: '2027-01-03' }, 'semana'),
    ).toBe('28 dic 2026 – 3 ene 2027')
  })

  it('etiqueta un mes', () => {
    expect(
      etiquetaPeriodo({ inicio: '2026-11-01', fin: '2026-11-30' }, 'mes'),
    ).toBe('noviembre 2026')
  })

  it('etiqueta un día', () => {
    expect(etiquetaDia('2026-11-02')).toBe('lun 2')
  })
})
