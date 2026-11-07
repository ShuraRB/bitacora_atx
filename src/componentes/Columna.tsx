import { useDroppable } from '@dnd-kit/core'
import { ESTILO_ESTADO } from '../estilos'
import { ETIQUETAS_ESTADO, type Estado, type Tarea } from '../tipos'
import { Icono } from './Icono'
import { TarjetaTarea } from './TarjetaTarea'

interface Props {
  estado: Estado
  tareas: Tarea[]
  alMover: (id: string, estado: Estado) => void
}

export function Columna({ estado, tareas, alMover }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: estado })
  const titulo = ETIQUETAS_ESTADO[estado]
  const estilo = ESTILO_ESTADO[estado]

  return (
    <section
      ref={setNodeRef}
      aria-label={titulo}
      className={`flex min-h-52 flex-col rounded-2xl border p-2.5 transition-colors duration-200 ${
        isOver
          ? 'border-acento bg-acento-suave'
          : 'border-borde bg-superficie-2/60'
      }`}
    >
      <h2 className="flex items-center gap-2 px-1.5 pb-3 pt-1.5 text-sm font-semibold">
        <span
          aria-hidden="true"
          className={`size-2.5 rounded-full ${estilo.punto}`}
        />
        {titulo}
        <span
          className={`ml-auto min-w-6 rounded-full px-2 py-0.5 text-center text-xs font-semibold tabular-nums ${estilo.chip}`}
        >
          {tareas.length}
        </span>
      </h2>
      {tareas.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-borde-fuerte px-4 py-8 text-center text-sm text-tenue">
          <Icono nombre="bandeja" className="size-5" />
          <p>Sin tareas.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {tareas.map((t) => (
            <TarjetaTarea key={t.id} tarea={t} alMover={alMover} />
          ))}
        </div>
      )}
    </section>
  )
}
