import { useState, type FormEvent } from 'react'
import type { Tarea } from '../tipos'
import { hoy } from '../utils/fechas'
import {
  crearTarea,
  validarTarea,
  type DatosTarea,
  type ErroresTarea,
} from '../utils/tareas'

interface Props {
  alAgregar: (tarea: Tarea) => void
}

function datosIniciales(): DatosTarea {
  const fecha = hoy()
  return { titulo: '', proyecto: '', inicio: fecha, fin: fecha, horas: '1' }
}

const clase =
  'w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'

interface CampoProps {
  id: keyof DatosTarea
  etiqueta: string
  error?: string
  children: React.ReactNode
}

function Campo({ id, etiqueta, error, children }: CampoProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {etiqueta}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export function FormularioTarea({ alAgregar }: Props) {
  const [datos, setDatos] = useState<DatosTarea>(datosIniciales)
  const [errores, setErrores] = useState<ErroresTarea>({})

  const cambiar = (campo: keyof DatosTarea, valor: string) =>
    setDatos((d) => ({ ...d, [campo]: valor }))

  const propsCampo = (campo: keyof DatosTarea) => ({
    id: campo,
    value: datos[campo],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      cambiar(campo, e.target.value),
    className: clase,
    'aria-invalid': errores[campo] ? true : undefined,
    'aria-describedby': errores[campo] ? `${campo}-error` : undefined,
  })

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const nuevosErrores = validarTarea(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return
    alAgregar(crearTarea(datos))
    setDatos(datosIniciales())
  }

  return (
    <form
      onSubmit={enviar}
      noValidate
      aria-label="Agregar tarea"
      className="grid gap-4 rounded-lg bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-6"
    >
      <div className="sm:col-span-2 lg:col-span-2">
        <Campo id="titulo" etiqueta="Título" error={errores.titulo}>
          <input type="text" {...propsCampo('titulo')} />
        </Campo>
      </div>
      <div className="lg:col-span-1">
        <Campo id="proyecto" etiqueta="Proyecto" error={errores.proyecto}>
          <input type="text" {...propsCampo('proyecto')} />
        </Campo>
      </div>
      <Campo id="inicio" etiqueta="Fecha de inicio" error={errores.inicio}>
        <input type="date" {...propsCampo('inicio')} />
      </Campo>
      <Campo id="fin" etiqueta="Fecha de fin" error={errores.fin}>
        <input type="date" {...propsCampo('fin')} />
      </Campo>
      <Campo id="horas" etiqueta="Horas" error={errores.horas}>
        <input type="number" min={0} step={0.5} {...propsCampo('horas')} />
      </Campo>
      <div className="sm:col-span-2 lg:col-span-6">
        <button
          type="submit"
          className="w-full rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:w-auto"
        >
          Agregar tarea
        </button>
      </div>
    </form>
  )
}
