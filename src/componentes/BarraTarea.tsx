import type { CSSProperties } from 'react'
import { ESTILO_ESTADO } from '../estilos'
import { ETIQUETAS_ESTADO, type Tarea } from '../tipos'
import { formatearRango, type PosicionBarra } from '../utils/fechas'

interface Props {
  tarea: Tarea
  posicion: PosicionBarra
  fila: number
  /** Columna de la cuadrícula en la que empieza el primer día del periodo. */
  desplazamiento: number
  /** Retraso de la animación de entrada, en milisegundos. */
  retraso?: number
}

const PUNTA = '0.5rem'

/** Recorta el extremo en flecha para indicar que la tarea continúa fuera del periodo. */
function recorte({
  recortadaIzquierda: izq,
  recortadaDerecha: der,
}: PosicionBarra) {
  if (!izq && !der) return undefined
  const izquierda = izq ? PUNTA : '0'
  const derecha = der ? `calc(100% - ${PUNTA})` : '100%'
  const puntos = [`${izquierda} 0`, `${derecha} 0`]
  if (der) puntos.push('100% 50%')
  puntos.push(`${derecha} 100%`, `${izquierda} 100%`)
  if (izq) puntos.push('0 50%')
  return `polygon(${puntos.join(', ')})`
}

export function BarraTarea({
  tarea,
  posicion,
  fila,
  desplazamiento,
  retraso = 0,
}: Props) {
  const descripcion = `${tarea.titulo} (${tarea.proyecto}), ${formatearRango(
    tarea.inicio,
    tarea.fin,
  )}, ${tarea.horas} h, ${ETIQUETAS_ESTADO[tarea.estado]}`

  const estilo: CSSProperties = {
    gridRow: fila,
    gridColumn: `${posicion.columnaInicio + desplazamiento} / ${posicion.columnaFin + desplazamiento + 1}`,
    clipPath: recorte(posicion),
    animationDelay: `${retraso}ms`,
  }

  return (
    <div
      role="img"
      aria-label={descripcion}
      title={descripcion}
      style={estilo}
      className={`origen-izquierda z-[1] mx-0.5 flex h-9 animate-crecer items-center self-center rounded-md px-1.5 text-xs font-semibold tabular-nums ring-1 ring-inset ring-tinta/10 transition-[filter] duration-150 hover:brightness-110 ${ESTILO_ESTADO[tarea.estado].barra}`}
    >
      <span className="truncate">{tarea.horas} h</span>
    </div>
  )
}
