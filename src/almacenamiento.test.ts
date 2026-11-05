import { describe, expect, it } from 'vitest'
import { cargarTareas, guardarTareas } from './almacenamiento'
import type { Tarea } from './tipos'

const tarea: Tarea = {
  id: 'a',
  titulo: 'Uno',
  proyecto: 'P',
  estado: 'en-curso',
  inicio: '2026-11-01',
  fin: '2026-11-02',
  horas: 2,
}

describe('almacenamiento', () => {
  it('devuelve [] si no hay nada guardado', () => {
    expect(cargarTareas()).toEqual([])
  })

  it('guarda y recupera tareas con la clave bitacora-tareas', () => {
    guardarTareas([tarea])
    expect(localStorage.getItem('bitacora-tareas')).not.toBeNull()
    expect(cargarTareas()).toEqual([tarea])
  })

  it('ignora JSON dañado y registros inválidos', () => {
    localStorage.setItem('bitacora-tareas', '{no es json')
    expect(cargarTareas()).toEqual([])
    localStorage.setItem(
      'bitacora-tareas',
      JSON.stringify([tarea, { ...tarea, estado: 'otro' }, 5]),
    )
    expect(cargarTareas()).toEqual([tarea])
  })
})
