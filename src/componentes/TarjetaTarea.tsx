import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { ESTILO_ESTADO } from '../estilos'
import { ESTADOS, ETIQUETAS_ESTADO, type Estado, type Tarea } from '../tipos'
import { formatearRango } from '../utils/fechas'
import { Icono } from './Icono'

interface Props {
  tarea: Tarea
  alMover: (id: string, estado: Estado) => void
}

const botonMover =
  'inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors'

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
      className={`rounded-lg border border-l-4 bg-superficie p-3.5 transition-[box-shadow,border-color,translate,scale,rotate] duration-200 ${
        ESTILO_ESTADO[tarea.estado].lomo
      } ${
        isDragging
          ? 'relative z-20 rotate-1 scale-[1.03] cursor-grabbing border-y-acento border-r-acento shadow-elevada'
          : 'border-y-borde border-r-borde shadow-tarjeta hover:-translate-y-0.5 hover:shadow-media'
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-acento">
            {tarea.proyecto}
          </p>
          <h3 className="mt-0.5 break-words text-[15px] font-semibold leading-snug">
            {tarea.titulo}
          </h3>
        </div>
        <button
          type="button"
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
          aria-label={`Arrastrar tarea ${tarea.titulo}`}
          className="-mr-1.5 -mt-1 grid size-8 shrink-0 cursor-grab touch-none select-none place-items-center rounded-lg text-tenue transition-colors hover:bg-superficie-2 hover:text-tinta active:cursor-grabbing"
        >
          <Icono nombre="agarre" className="size-5" />
        </button>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] tabular-nums text-suave">
        <span className="inline-flex items-center gap-1.5">
          <Icono nombre="calendario" className="size-3.5" />
          {formatearRango(tarea.inicio, tarea.fin)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icono nombre="reloj" className="size-3.5" />
          {tarea.horas} h
        </span>
      </p>
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-borde pt-2.5">
        {anterior ? (
          <button
            type="button"
            onClick={() => alMover(tarea.id, anterior)}
            aria-label={`Mover "${tarea.titulo}" a ${ETIQUETAS_ESTADO[anterior]}`}
            className={`${botonMover} text-suave hover:bg-superficie-2 hover:text-tinta`}
          >
            <Icono nombre="flechaIzquierda" className="size-3.5" />
            {ETIQUETAS_ESTADO[anterior]}
          </button>
        ) : (
          <span />
        )}
        {siguiente && (
          <button
            type="button"
            onClick={() => alMover(tarea.id, siguiente)}
            aria-label={`Mover "${tarea.titulo}" a ${ETIQUETAS_ESTADO[siguiente]}`}
            className={`${botonMover} bg-acento-suave text-acento hover:brightness-95`}
          >
            {ETIQUETAS_ESTADO[siguiente]}
            <Icono nombre="flechaDerecha" className="size-3.5" />
          </button>
        )}
      </div>
    </article>
  )
}
