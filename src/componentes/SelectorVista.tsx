import type { Vista } from '../tipos'

interface Props {
  vista: Vista
  alCambiar: (vista: Vista) => void
}

const OPCIONES: { valor: Vista; etiqueta: string }[] = [
  { valor: 'kanban', etiqueta: 'Kanban' },
  { valor: 'gantt', etiqueta: 'Gantt' },
]

export function SelectorVista({ vista, alCambiar }: Props) {
  return (
    <div
      role="group"
      aria-label="Vista"
      className="inline-flex overflow-hidden rounded-md border border-blue-200 bg-white text-sm"
    >
      {OPCIONES.map(({ valor, etiqueta }) => (
        <button
          key={valor}
          type="button"
          aria-pressed={vista === valor}
          onClick={() => alCambiar(valor)}
          className={`px-4 py-1.5 font-medium ${
            vista === valor
              ? 'bg-blue-700 text-white'
              : 'text-blue-900 hover:bg-blue-50'
          }`}
        >
          {etiqueta}
        </button>
      ))}
    </div>
  )
}
