import type { ReactNode } from 'react'
import type { Tarea } from '../tipos'
import { esFinDeSemana } from '../utils/fechas'

interface Props {
  tarea: Tarea
  dias: string[]
  hoyTexto: string
  numeroFila: number
  /** La primera columna de la cuadrícula es la etiqueta de la tarea. */
  desplazamiento: number
  barra: ReactNode
}

export function FilaGantt({
  tarea,
  dias,
  hoyTexto,
  numeroFila,
  desplazamiento,
  barra,
}: Props) {
  return (
    <div className="group contents">
      <div
        style={{ gridRow: numeroFila, gridColumn: 1 }}
        className="sticky left-0 z-[2] flex min-w-0 flex-col justify-center border-b border-r border-borde bg-superficie px-3 py-2 transition-colors group-hover:bg-superficie-2"
      >
        <p className="truncate text-sm font-semibold">{tarea.titulo}</p>
        <p className="truncate text-xs text-tenue">{tarea.proyecto}</p>
      </div>
      {dias.map((dia, i) => (
        <div
          key={dia}
          aria-hidden="true"
          style={{ gridRow: numeroFila, gridColumn: i + 1 + desplazamiento }}
          className={`min-h-14 border-b border-l border-borde/60 transition-colors group-hover:bg-acento-suave/40 ${
            dia === hoyTexto
              ? 'bg-acento-suave/60'
              : esFinDeSemana(dia)
                ? 'bg-superficie-2/70'
                : ''
          }`}
        />
      ))}
      {barra}
    </div>
  )
}
