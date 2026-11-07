import type { Periodo } from '../tipos'
import { ControlSegmentado, type OpcionSegmentada } from './ControlSegmentado'
import { Icono } from './Icono'

interface Props {
  periodo: Periodo
  etiqueta: string
  alCambiarPeriodo: (periodo: Periodo) => void
  alAnterior: () => void
  alSiguiente: () => void
  alHoy: () => void
}

const OPCIONES: OpcionSegmentada<Periodo>[] = [
  { valor: 'semana', etiqueta: 'Semana' },
  { valor: 'mes', etiqueta: 'Mes' },
]

const botonNavegar =
  'inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-sm font-medium text-suave transition-colors hover:bg-superficie hover:text-tinta'

export function ControlesPeriodo({
  periodo,
  etiqueta,
  alCambiarPeriodo,
  alAnterior,
  alSiguiente,
  alHoy,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <p
        aria-live="polite"
        className="min-w-44 font-display text-xl font-semibold tracking-tight tabular-nums first-letter:uppercase"
      >
        {etiqueta}
      </p>
      <ControlSegmentado
        etiqueta="Periodo"
        opciones={OPCIONES}
        valor={periodo}
        alCambiar={alCambiarPeriodo}
      />
      <div className="inline-flex rounded-xl border border-borde bg-superficie-2 p-1">
        <button type="button" onClick={alAnterior} className={botonNavegar}>
          <Icono nombre="chevronIzquierda" />
          Anterior
        </button>
        <button type="button" onClick={alHoy} className={botonNavegar}>
          Hoy
        </button>
        <button type="button" onClick={alSiguiente} className={botonNavegar}>
          Siguiente
          <Icono nombre="chevronDerecha" />
        </button>
      </div>
    </div>
  )
}
