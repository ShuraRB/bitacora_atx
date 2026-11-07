import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

async function agregar(
  titulo: string,
  proyecto: string,
  user = userEvent.setup(),
) {
  if (titulo) await user.type(screen.getByLabelText('Título'), titulo)
  if (proyecto) await user.type(screen.getByLabelText('Proyecto'), proyecto)
  await user.click(screen.getByRole('button', { name: 'Agregar tarea' }))
}

describe('App', () => {
  it('no guarda sin título ni proyecto y muestra los mensajes', async () => {
    render(<App />)
    await agregar('', '')
    expect(screen.getByText('El título es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('El proyecto es obligatorio.')).toBeInTheDocument()
    expect(localStorage.getItem('bitacora-tareas')).toBe('[]')
  })

  it('no guarda con fin anterior al inicio', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.clear(screen.getByLabelText('Fecha de inicio'))
    await user.type(screen.getByLabelText('Fecha de inicio'), '2026-11-05')
    await user.clear(screen.getByLabelText('Fecha de fin'))
    await user.type(screen.getByLabelText('Fecha de fin'), '2026-11-01')
    await agregar('Algo', 'Proy', user)
    expect(
      screen.getByText('La fecha de fin no puede ser anterior a la de inicio.'),
    ).toBeInTheDocument()
  })

  it('agrega una tarea en "Por hacer", la mueve con botones y persiste al recargar', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    await agregar('Informe', 'Ventas', user)

    const porHacer = screen.getByRole('region', { name: 'Por hacer' })
    expect(within(porHacer).getByText('Informe')).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Mover "Informe" a En curso' }),
    )
    const enCurso = screen.getByRole('region', { name: 'En curso' })
    expect(within(enCurso).getByText('Informe')).toBeInTheDocument()

    unmount()
    render(<App />)
    expect(
      within(screen.getByRole('region', { name: 'En curso' })).getByText(
        'Informe',
      ),
    ).toBeInTheDocument()
  })

  it('alterna entre Kanban y Gantt sin perder las tareas', async () => {
    const user = userEvent.setup()
    render(<App />)
    await agregar('Informe', 'Ventas', user)

    expect(screen.getByRole('button', { name: 'Kanban' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await user.click(screen.getByRole('button', { name: 'Gantt' }))
    expect(
      screen.getByRole('region', { name: 'Vista Gantt' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: 'Por hacer' })).toBeNull()
    expect(
      screen.getByRole('img', { name: /Informe \(Ventas\)/ }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Kanban' }))
    expect(
      within(screen.getByRole('region', { name: 'Por hacer' })).getByText(
        'Informe',
      ),
    ).toBeInTheDocument()
  })

  it('alterna el tema, lo aplica al documento y lo conserva al recargar', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    const interruptor = screen.getByRole('switch', { name: 'Modo oscuro' })
    expect(interruptor).toHaveAttribute('aria-checked', 'false')
    expect(document.documentElement.dataset.tema).toBe('claro')

    await user.click(interruptor)
    expect(interruptor).toHaveAttribute('aria-checked', 'true')
    expect(document.documentElement.dataset.tema).toBe('oscuro')
    expect(localStorage.getItem('bitacora-tema')).toBe('oscuro')

    unmount()
    render(<App />)
    expect(screen.getByRole('switch', { name: 'Modo oscuro' })).toHaveAttribute(
      'aria-checked',
      'true',
    )
    expect(document.documentElement.dataset.tema).toBe('oscuro')
  })
})
