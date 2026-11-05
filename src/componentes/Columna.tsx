import { useDroppable } from '@dnd-kit/core'
import { ETIQUETAS_ESTADO, type Estado, type Tarea } from '../tipos'
import { TarjetaTarea } from './TarjetaTarea'

interface Props {
  estado: Estado
  tareas: Tarea[]
  alMover: (id: string, estado: Estado) => void
}

export function Columna({ estado, tareas, alMover }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: estado })
  const titulo = ETIQUETAS_ESTADO[estado]

  return (
    <section
      ref={setNodeRef}
      aria-label={titulo}
      className={`flex min-h-40 flex-col gap-3 rounded-lg p-3 transition-colors ${
        isOver ? 'bg-indigo-100' : 'bg-slate-200/60'
      }`}
    >
      <h2 className="flex items-center justify-between text-sm font-bold uppercase tracking-wide text-slate-600">
        {titulo}
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold">
          {tareas.length}
        </span>
      </h2>
      {tareas.length === 0 ? (
        <p className="text-xs text-slate-500">Sin tareas.</p>
      ) : (
        tareas.map((t) => (
          <TarjetaTarea key={t.id} tarea={t} alMover={alMover} />
        ))
      )}
    </section>
  )
}
