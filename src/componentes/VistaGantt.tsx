import { useState } from 'react'
import type { Periodo, Tarea } from '../tipos'
import {
  desplazarPeriodo,
  diasDelPeriodo,
  etiquetaDia,
  etiquetaPeriodo,
  hoy,
  posicionBarra,
  rangoPeriodo,
} from '../utils/fechas'
import { tareasDelPeriodo } from '../utils/tareas'
import { BarraTarea } from './BarraTarea'
import { ControlesPeriodo } from './ControlesPeriodo'

interface Props {
  tareas: Tarea[]
}

const ANCHO_ETIQUETA = '12rem'
const ANCHO_MINIMO_DIA = 2.5 // rem
// La primera columna de la cuadrícula es la etiqueta de la tarea.
const DESPLAZAMIENTO = 1

export function VistaGantt({ tareas }: Props) {
  const [periodo, setPeriodo] = useState<Periodo>('semana')
  const [referencia, setReferencia] = useState<string>(() => hoy())

  const rango = rangoPeriodo(referencia, periodo)
  const dias = diasDelPeriodo(rango.inicio, rango.fin)
  const visibles = tareasDelPeriodo(tareas, rango)
  const hoyTexto = hoy()
  const columnas = `${ANCHO_ETIQUETA} repeat(${dias.length}, minmax(${ANCHO_MINIMO_DIA}rem, 1fr))`

  return (
    <section aria-label="Vista Gantt" className="space-y-4">
      <ControlesPeriodo
        periodo={periodo}
        etiqueta={etiquetaPeriodo(rango, periodo)}
        alCambiarPeriodo={setPeriodo}
        alAnterior={() =>
          setReferencia(desplazarPeriodo(referencia, periodo, -1))
        }
        alSiguiente={() =>
          setReferencia(desplazarPeriodo(referencia, periodo, 1))
        }
        alHoy={() => setReferencia(hoy())}
      />
      {visibles.length === 0 ? (
        <p className="rounded-lg bg-white p-4 text-sm text-blue-900 shadow-sm">
          No hay tareas en este periodo.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
          <div
            className="grid"
            style={{
              gridTemplateColumns: columnas,
              minWidth: `calc(${ANCHO_ETIQUETA} + ${dias.length * ANCHO_MINIMO_DIA}rem)`,
            }}
          >
            <div
              style={{ gridRow: 1, gridColumn: 1 }}
              className="sticky left-0 z-[2] border-b border-blue-200 bg-white p-2 text-xs font-bold uppercase tracking-wide text-blue-800"
            >
              Tarea
            </div>
            {dias.map((dia, i) => (
              <div
                key={dia}
                style={{ gridRow: 1, gridColumn: i + 1 + DESPLAZAMIENTO }}
                className={`border-b border-l border-blue-200 p-1 text-center text-xs ${
                  dia === hoyTexto ? 'bg-blue-100 font-bold' : 'text-blue-800'
                }`}
              >
                {etiquetaDia(dia)}
              </div>
            ))}
            {visibles.map((tarea, fila) => {
              const posicion = posicionBarra(tarea, rango)
              const numeroFila = fila + 2
              return (
                <Fila
                  key={tarea.id}
                  tarea={tarea}
                  dias={dias}
                  hoyTexto={hoyTexto}
                  numeroFila={numeroFila}
                  barra={
                    posicion && (
                      <BarraTarea
                        tarea={tarea}
                        posicion={posicion}
                        fila={numeroFila}
                        desplazamiento={DESPLAZAMIENTO}
                      />
                    )
                  }
                />
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}

interface PropsFila {
  tarea: Tarea
  dias: string[]
  hoyTexto: string
  numeroFila: number
  barra: React.ReactNode
}

function Fila({ tarea, dias, hoyTexto, numeroFila, barra }: PropsFila) {
  return (
    <>
      <div
        style={{ gridRow: numeroFila, gridColumn: 1 }}
        className="sticky left-0 z-[2] min-w-0 border-b border-blue-100 bg-white p-2"
      >
        <p className="truncate text-sm font-semibold">{tarea.titulo}</p>
        <p className="truncate text-xs text-blue-700">{tarea.proyecto}</p>
      </div>
      {dias.map((dia, i) => (
        <div
          key={dia}
          aria-hidden="true"
          style={{ gridRow: numeroFila, gridColumn: i + 1 + DESPLAZAMIENTO }}
          className={`border-b border-l border-blue-100 ${
            dia === hoyTexto ? 'bg-blue-50' : ''
          }`}
        />
      ))}
      {barra}
    </>
  )
}
