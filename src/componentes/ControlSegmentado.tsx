import { Icono, type NombreIcono } from './Icono'

export interface OpcionSegmentada<T extends string> {
  valor: T
  etiqueta: string
  icono?: NombreIcono
}

interface Props<T extends string> {
  etiqueta: string
  opciones: OpcionSegmentada<T>[]
  valor: T
  alCambiar: (valor: T) => void
  className?: string
}

/** Grupo de botones excluyentes con un indicador que se desliza hasta la opción activa. */
export function ControlSegmentado<T extends string>({
  etiqueta,
  opciones,
  valor,
  alCambiar,
  className = '',
}: Props<T>) {
  const indice = Math.max(
    0,
    opciones.findIndex((o) => o.valor === valor),
  )

  return (
    <div
      role="group"
      aria-label={etiqueta}
      className={`relative grid auto-cols-fr grid-flow-col rounded-xl border border-borde bg-superficie-2 p-1 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 rounded-lg border border-borde bg-superficie shadow-tarjeta transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 0.5rem) / ${opciones.length})`,
          transform: `translateX(${indice * 100}%)`,
        }}
      />
      {opciones.map((o) => {
        const activa = o.valor === valor
        return (
          <button
            key={o.valor}
            type="button"
            aria-pressed={activa}
            onClick={() => alCambiar(o.valor)}
            className={`relative z-10 inline-flex h-8 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors ${
              activa ? 'text-tinta' : 'text-suave hover:text-tinta'
            }`}
          >
            {o.icono && (
              <Icono
                nombre={o.icono}
                className={`size-4 transition-colors ${activa ? 'text-acento' : ''}`}
              />
            )}
            {o.etiqueta}
          </button>
        )
      })}
    </div>
  )
}
