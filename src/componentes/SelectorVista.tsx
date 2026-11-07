import type { Vista } from '../tipos'
import { ControlSegmentado, type OpcionSegmentada } from './ControlSegmentado'

interface Props {
  vista: Vista
  alCambiar: (vista: Vista) => void
  className?: string
}

const OPCIONES: OpcionSegmentada<Vista>[] = [
  { valor: 'kanban', etiqueta: 'Kanban', icono: 'tablero' },
  { valor: 'gantt', etiqueta: 'Gantt', icono: 'gantt' },
]

export function SelectorVista({ vista, alCambiar, className }: Props) {
  return (
    <ControlSegmentado
      etiqueta="Vista"
      opciones={OPCIONES}
      valor={vista}
      alCambiar={alCambiar}
      className={className}
    />
  )
}
