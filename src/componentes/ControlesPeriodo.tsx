import type { Periodo } from '../tipos'

interface Props {
  periodo: Periodo
  etiqueta: string
  alCambiarPeriodo: (periodo: Periodo) => void
  alAnterior: () => void
  alSiguiente: () => void
  alHoy: () => void
}

const OPCIONES: { valor: Periodo; etiqueta: string }[] = [
  { valor: 'semana', etiqueta: 'Semana' },
  { valor: 'mes', etiqueta: 'Mes' },
]

const botonNavegar =
  'rounded-md border border-blue-200 bg-white px-3 py-1.5 text-sm hover:bg-blue-50'

export function ControlesPeriodo({
  periodo,
  etiqueta,
  alCambiarPeriodo,
  alAnterior,
  alSiguiente,
  alHoy,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        role="group"
        aria-label="Periodo"
        className="inline-flex overflow-hidden rounded-md border border-blue-200 bg-white text-sm"
      >
        {OPCIONES.map(({ valor, etiqueta: texto }) => (
          <button
            key={valor}
            type="button"
            aria-pressed={periodo === valor}
            onClick={() => alCambiarPeriodo(valor)}
            className={`px-4 py-1.5 font-medium ${
              periodo === valor
                ? 'bg-blue-700 text-white'
                : 'text-blue-900 hover:bg-blue-50'
            }`}
          >
            {texto}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={alAnterior} className={botonNavegar}>
          Anterior
        </button>
        <button type="button" onClick={alHoy} className={botonNavegar}>
          Hoy
        </button>
        <button type="button" onClick={alSiguiente} className={botonNavegar}>
          Siguiente
        </button>
      </div>
      <p aria-live="polite" className="text-sm font-semibold capitalize">
        {etiqueta}
      </p>
    </div>
  )
}
