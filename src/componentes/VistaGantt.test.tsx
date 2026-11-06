import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Tarea } from '../tipos'
import { VistaGantt } from './VistaGantt'

const tarea = (
  id: string,
  titulo: string,
  inicio: string,
  fin: string,
): Tarea => ({
  id,
  titulo,
  proyecto: 'Proy',
  estado: 'en-curso',
  inicio,
  fin,
  horas: 2,
})

const tareas = [
  tarea('1', 'Esta semana', '2026-11-03', '2026-11-04'),
  tarea('2', 'Semana siguiente', '2026-11-10', '2026-11-11'),
  tarea('3', 'Fin de mes', '2026-11-27', '2026-12-02'),
]

const barra = (titulo: string) =>
  screen.queryByRole('img', { name: new RegExp(titulo) })

describe('VistaGantt', () => {
  beforeEach(() => {
    // Jueves 5 de noviembre de 2026, hora local. Solo se falsea Date.
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 10, 5, 12, 0, 0))
  })
  afterEach(() => vi.useRealTimers())

  it('muestra la semana actual con sus tareas y oculta las de fuera', () => {
    render(<VistaGantt tareas={tareas} />)
    expect(screen.getByText('2 – 8 nov 2026')).toBeInTheDocument()
    expect(barra('Esta semana')).toBeInTheDocument()
    expect(barra('Semana siguiente')).not.toBeInTheDocument()
    expect(barra('Fin de mes')).not.toBeInTheDocument()
    expect(screen.getByText('lun 2')).toBeInTheDocument()
    expect(screen.getByText('dom 8')).toBeInTheDocument()
  })

  it('navega a la semana siguiente, a la anterior y vuelve con Hoy', async () => {
    const user = userEvent.setup()
    render(<VistaGantt tareas={tareas} />)

    await user.click(screen.getByRole('button', { name: 'Siguiente' }))
    expect(screen.getByText('9 – 15 nov 2026')).toBeInTheDocument()
    expect(barra('Semana siguiente')).toBeInTheDocument()
    expect(barra('Esta semana')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Anterior' }))
    await user.click(screen.getByRole('button', { name: 'Anterior' }))
    expect(screen.getByText('26 oct – 1 nov 2026')).toBeInTheDocument()
    expect(
      screen.getByText('No hay tareas en este periodo.'),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Hoy' }))
    expect(screen.getByText('2 – 8 nov 2026')).toBeInTheDocument()
    expect(barra('Esta semana')).toBeInTheDocument()
  })

  it('cambia a vista mensual y muestra los 30 días de noviembre', async () => {
    const user = userEvent.setup()
    render(<VistaGantt tareas={tareas} />)
    await user.click(screen.getByRole('button', { name: 'Mes' }))
    expect(screen.getByText('noviembre 2026')).toBeInTheDocument()
    expect(screen.getByText('dom 1')).toBeInTheDocument()
    expect(screen.getByText('lun 30')).toBeInTheDocument()
    expect(barra('Esta semana')).toBeInTheDocument()
    expect(barra('Semana siguiente')).toBeInTheDocument()
    expect(barra('Fin de mes')).toBeInTheDocument()
  })

  it('una tarea que cruza de mes aparece también en el mes siguiente', async () => {
    const user = userEvent.setup()
    render(<VistaGantt tareas={tareas} />)
    await user.click(screen.getByRole('button', { name: 'Mes' }))
    await user.click(screen.getByRole('button', { name: 'Siguiente' }))
    expect(screen.getByText('diciembre 2026')).toBeInTheDocument()
    expect(barra('Fin de mes')).toBeInTheDocument()
    expect(barra('Esta semana')).not.toBeInTheDocument()
  })

  it('muestra un mensaje cuando no hay tareas en el periodo', () => {
    render(<VistaGantt tareas={[]} />)
    expect(
      screen.getByText('No hay tareas en este periodo.'),
    ).toBeInTheDocument()
  })
})
