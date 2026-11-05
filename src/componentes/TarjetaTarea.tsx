import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { ESTADOS, ETIQUETAS_ESTADO, type Estado, type Tarea } from '../tipos'
import { formatearRango } from '../utils/fechas'

interface Props {
  tarea: Tarea
  alMover: (id: string, estado: Estado) => void
}

export function TarjetaTarea({ tarea, alMover }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: tarea.id })

  const indice = ESTADOS.indexOf(tarea.estado)
  const anterior = indice > 0 ? ESTADOS[indice - 1] : null
  const siguiente = indice < ESTADOS.length - 1 ? ESTADOS[indice + 1] : null

  return (
    <article
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={`relative rounded-md border border-slate-200 bg-white p-3 shadow-sm ${
        isDragging ? 'z-10 opacity-80 shadow-lg ring-2 ring-indigo-300' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
          aria-label={`Arrastrar tarea ${tarea.titulo}`}
          className="mt-0.5 cursor-grab touch-none select-none rounded px-1 text-slate-400 hover:bg-slate-100 active:cursor-grabbing"
        >
          ⠿
        </button>
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-sm font-semibold">{tarea.titulo}</h3>
          <p className="text-xs text-slate-500">{tarea.proyecto}</p>
          <p className="mt-1 text-xs text-slate-600">
            {formatearRango(tarea.inicio, tarea.fin)} · {tarea.horas} h
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {anterior && (
          <button
            type="button"
            onClick={() => alMover(tarea.id, anterior)}
            aria-label={`Mover "${tarea.titulo}" a ${ETIQUETAS_ESTADO[anterior]}`}
            className="rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50"
          >
            ← {ETIQUETAS_ESTADO[anterior]}
          </button>
        )}
        {siguiente && (
          <button
            type="button"
            onClick={() => alMover(tarea.id, siguiente)}
            aria-label={`Mover "${tarea.titulo}" a ${ETIQUETAS_ESTADO[siguiente]}`}
            className="rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50"
          >
            {ETIQUETAS_ESTADO[siguiente]} →
          </button>
        )}
      </div>
    </article>
  )
}
