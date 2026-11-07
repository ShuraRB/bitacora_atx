import { useState, type FormEvent } from 'react'
import type { Tarea } from '../tipos'
import { hoy } from '../utils/fechas'
import {
  crearTarea,
  validarTarea,
  type DatosTarea,
  type ErroresTarea,
} from '../utils/tareas'
import { Campo } from './Campo'
import { Icono } from './Icono'

interface Props {
  alAgregar: (tarea: Tarea) => void
}

function datosIniciales(): DatosTarea {
  const fecha = hoy()
  return { titulo: '', proyecto: '', inicio: fecha, fin: fecha, horas: '1' }
}

const claseCampo =
  'h-11 w-full rounded-lg border border-borde bg-superficie-2 px-3 text-sm text-tinta transition-[border-color,box-shadow,background-color] duration-150 hover:border-borde-fuerte focus:border-acento focus:bg-superficie focus:outline-none focus:ring-4 focus:ring-acento/20 aria-[invalid=true]:border-peligro aria-[invalid=true]:focus:ring-peligro/20'

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
    className: claseCampo,
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
      className="grid grid-cols-2 gap-x-3 gap-y-4 rounded-2xl border border-borde bg-superficie p-5 shadow-tarjeta md:grid-cols-6 lg:grid-cols-2"
    >
      <h2 className="col-span-full font-display text-xl font-semibold tracking-tight">
        Nueva tarea
      </h2>
      <Campo
        id="titulo"
        etiqueta="Título"
        error={errores.titulo}
        className="col-span-2 md:col-span-3 lg:col-span-2"
      >
        <input type="text" {...propsCampo('titulo')} />
      </Campo>
      <Campo
        id="proyecto"
        etiqueta="Proyecto"
        error={errores.proyecto}
        className="col-span-2 md:col-span-3 lg:col-span-2"
      >
        <input type="text" {...propsCampo('proyecto')} />
      </Campo>
      <Campo
        id="inicio"
        etiqueta="Fecha de inicio"
        error={errores.inicio}
        className="md:col-span-2 lg:col-span-1"
      >
        <input type="date" {...propsCampo('inicio')} />
      </Campo>
      <Campo
        id="fin"
        etiqueta="Fecha de fin"
        error={errores.fin}
        className="md:col-span-2 lg:col-span-1"
      >
        <input type="date" {...propsCampo('fin')} />
      </Campo>
      <Campo
        id="horas"
        etiqueta="Horas"
        error={errores.horas}
        className="col-span-2 md:col-span-2 lg:col-span-2"
      >
        <input
          type="number"
          min={0}
          step={0.5}
          {...propsCampo('horas')}
          className={`${claseCampo} tabular-nums`}
        />
      </Campo>
      <button
        type="submit"
        className="col-span-full inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-acento px-4 text-sm font-semibold text-sobre-acento shadow-tarjeta transition hover:bg-acento-fuerte active:scale-[0.98]"
      >
        <Icono nombre="mas" />
        Agregar tarea
      </button>
    </form>
  )
}
