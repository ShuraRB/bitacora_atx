import type { Tema, Vista } from '../tipos'
import { InterruptorTema } from './InterruptorTema'
import { SelectorVista } from './SelectorVista'

interface Props {
  vista: Vista
  alCambiarVista: (vista: Vista) => void
  tema: Tema
  alCambiarTema: (tema: Tema) => void
}

export function Cabecera({
  vista,
  alCambiarVista,
  tema,
  alCambiarTema,
}: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-borde bg-fondo/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            className="size-9 shrink-0 text-acento"
          >
            <rect width="32" height="32" rx="8" fill="currentColor" />
            <g fill="var(--sobre-acento)">
              <rect x="6" y="8" width="12" height="3.5" rx="1.75" />
              <rect x="11" y="14.25" width="15" height="3.5" rx="1.75" />
              <rect x="8" y="20.5" width="10" height="3.5" rx="1.75" />
            </g>
          </svg>
          <h1 className="truncate font-display text-2xl font-semibold tracking-tight sm:text-[1.65rem]">
            Bitácora de tareas
          </h1>
        </div>
        <SelectorVista
          vista={vista}
          alCambiar={alCambiarVista}
          className="order-last w-full sm:order-none sm:w-auto"
        />
        <InterruptorTema tema={tema} alCambiar={alCambiarTema} />
      </div>
    </header>
  )
}
