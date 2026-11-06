import type { CSSProperties } from 'react'
import { ETIQUETAS_ESTADO, type Estado, type Tarea } from '../tipos'
import { formatearRango, type PosicionBarra } from '../utils/fechas'

interface Props {
  tarea: Tarea
  posicion: PosicionBarra
  fila: number
  /** Columna de la cuadrícula en la que empieza el primer día del periodo. */
  desplazamiento: number
}

const COLOR_ESTADO: Record<Estado, string> = {
  'por-hacer': 'bg-sky-300 text-blue-950',
  'en-curso': 'bg-blue-500 text-white',
  hecho: 'bg-blue-800 text-white',
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

export function BarraTarea({ tarea, posicion, fila, desplazamiento }: Props) {
  const descripcion = `${tarea.titulo} (${tarea.proyecto}), ${formatearRango(
    tarea.inicio,
    tarea.fin,
  )}, ${tarea.horas} h, ${ETIQUETAS_ESTADO[tarea.estado]}`

  const estilo: CSSProperties = {
    gridRow: fila,
    gridColumn: `${posicion.columnaInicio + desplazamiento} / ${posicion.columnaFin + desplazamiento + 1}`,
    clipPath: recorte(posicion),
  }

  return (
    <div
      role="img"
      aria-label={descripcion}
      title={descripcion}
      style={estilo}
      className={`z-[1] m-1 flex items-center truncate rounded px-2 text-xs font-medium ${COLOR_ESTADO[tarea.estado]}`}
    >
      <span className="truncate">{tarea.horas} h</span>
    </div>
  )
}
