import { describe, expect, it } from 'vitest'
import { crearTarea, validarTarea, type DatosTarea } from './tareas'

const base: DatosTarea = {
  titulo: 'Revisar reporte',
  proyecto: 'Ventas',
  inicio: '2026-11-05',
  fin: '2026-11-05',
  horas: '1.5',
}

describe('validarTarea', () => {
  it('no marca errores con datos correctos', () => {
    expect(validarTarea(base)).toEqual({})
  })

  it('exige título y proyecto', () => {
    const e = validarTarea({ ...base, titulo: '  ', proyecto: '' })
    expect(e.titulo).toBe('El título es obligatorio.')
    expect(e.proyecto).toBe('El proyecto es obligatorio.')
  })

  it('rechaza fin anterior a inicio', () => {
    const e = validarTarea({ ...base, inicio: '2026-11-05', fin: '2026-11-01' })
    expect(e.fin).toBe('La fecha de fin no puede ser anterior a la de inicio.')
  })

  it('valida las horas', () => {
    expect(validarTarea({ ...base, horas: '' }).horas).toBeDefined()
    expect(validarTarea({ ...base, horas: '-1' }).horas).toBeDefined()
    expect(validarTarea({ ...base, horas: '1.3' }).horas).toBeDefined()
    expect(validarTarea({ ...base, horas: '0' }).horas).toBeUndefined()
    expect(validarTarea({ ...base, horas: '8.5' }).horas).toBeUndefined()
  })
})

describe('crearTarea', () => {
  it('crea una tarea en "por-hacer" con id único y textos recortados', () => {
    const a = crearTarea({ ...base, titulo: ' Hola ' })
    const b = crearTarea(base)
    expect(a.estado).toBe('por-hacer')
    expect(a.titulo).toBe('Hola')
    expect(a.horas).toBe(1.5)
    expect(a.id).not.toBe(b.id)
  })
})
