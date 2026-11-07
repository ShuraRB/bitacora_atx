import type { Tema } from '../tipos'
import { Icono } from './Icono'

interface Props {
  tema: Tema
  alCambiar: (tema: Tema) => void
}

export function InterruptorTema({ tema, alCambiar }: Props) {
  const oscuro = tema === 'oscuro'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={oscuro}
      aria-label="Modo oscuro"
      title={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      onClick={() => alCambiar(oscuro ? 'claro' : 'oscuro')}
      className="relative h-9 w-16 shrink-0 rounded-full border border-borde bg-superficie-2 transition-colors hover:border-borde-fuerte"
    >
      <span
        className={`absolute left-1 top-1 grid size-7 place-items-center rounded-full border border-borde bg-superficie text-acento shadow-tarjeta transition-transform duration-300 ease-out ${
          oscuro ? 'translate-x-7' : ''
        }`}
      >
        <Icono nombre={oscuro ? 'luna' : 'sol'} />
      </span>
    </button>
  )
}
