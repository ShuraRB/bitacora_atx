import { useState } from 'react'
import { ESTILO_ESTADO } from '../estilos'
import { ESTADOS, ETIQUETAS_ESTADO, type Periodo, type Tarea } from '../tipos'
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
import { FilaGantt } from './FilaGantt'
import { Icono } from './Icono'

interface Props {
  tareas: Tarea[]
}

const ANCHO_MINIMO_DIA = 3 // rem
// La primera columna de la cuadrícula es la etiqueta de la tarea.
const DESPLAZAMIENTO = 1

export function VistaGantt({ tareas }: Props) {
  const [periodo, setPeriodo] = useState<Periodo>('semana')
  const [referencia, setReferencia] = useState<string>(() => hoy())

  const rango = rangoPeriodo(referencia, periodo)
  const dias = diasDelPeriodo(rango.inicio, rango.fin)
  const visibles = tareasDelPeriodo(tareas, rango)
  const hoyTexto = hoy()

  return (
    <section aria-label="Vista Gantt" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl border border-borde bg-superficie p-3.5 shadow-tarjeta">
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
        <ul
          aria-label="Leyenda de estados"
          className="flex items-center gap-4 text-[13px] text-suave"
        >
          {ESTADOS.map((estado) => (
            <li key={estado} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={`h-2.5 w-4 rounded-sm ${ESTILO_ESTADO[estado].punto}`}
              />
              {ETIQUETAS_ESTADO[estado]}
            </li>
          ))}
        </ul>
      </div>
      {visibles.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-borde-fuerte bg-superficie px-4 py-14 text-center text-sm text-tenue">
          <Icono nombre="bandeja" className="size-6" />
          <p>No hay tareas en este periodo.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-borde bg-superficie shadow-tarjeta">
          <div className="overflow-x-auto">
            <div
              // Se remonta al cambiar de periodo para que las barras vuelvan a crecer.
              key={`${periodo}-${rango.inicio}`}
              className="grid [--w-etiqueta:9.5rem] sm:[--w-etiqueta:13rem]"
              style={{
                gridTemplateColumns: `var(--w-etiqueta) repeat(${dias.length}, minmax(${ANCHO_MINIMO_DIA}rem, 1fr))`,
                minWidth: `calc(var(--w-etiqueta) + ${dias.length * ANCHO_MINIMO_DIA}rem)`,
              }}
            >
              <div
                style={{ gridRow: 1, gridColumn: 1 }}
                className="sticky left-0 z-[2] flex items-center border-b border-r border-borde bg-superficie px-3 py-2 text-xs font-semibold text-tenue"
              >
                Tarea
              </div>
              {dias.map((dia, i) => (
                <div
                  key={dia}
                  style={{ gridRow: 1, gridColumn: i + 1 + DESPLAZAMIENTO }}
                  className="flex items-center justify-center border-b border-l border-borde/60 px-0.5 py-1.5"
                >
                  <span
                    className={`w-min rounded-md px-1.5 py-0.5 text-center text-sm font-semibold leading-tight tabular-nums first-line:text-[11px] first-line:font-medium ${
                      dia === hoyTexto
                        ? 'bg-acento text-sobre-acento'
                        : 'text-suave'
                    }`}
                  >
                    {etiquetaDia(dia)}
                  </span>
                </div>
              ))}
              {visibles.map((tarea, fila) => {
                const posicion = posicionBarra(tarea, rango)
                const numeroFila = fila + 2
                return (
                  <FilaGantt
                    key={tarea.id}
                    tarea={tarea}
                    dias={dias}
                    hoyTexto={hoyTexto}
                    numeroFila={numeroFila}
                    desplazamiento={DESPLAZAMIENTO}
                    barra={
                      posicion && (
                        <BarraTarea
                          tarea={tarea}
                          posicion={posicion}
                          fila={numeroFila}
                          desplazamiento={DESPLAZAMIENTO}
                          retraso={Math.min(fila, 12) * 35}
                        />
                      )
                    }
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
