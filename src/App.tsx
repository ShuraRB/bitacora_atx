import { useEffect, useState } from 'react'
import { cargarTareas, guardarTareas } from './almacenamiento'
import { FormularioTarea } from './componentes/FormularioTarea'
import { Tablero } from './componentes/Tablero'
import type { Estado, Tarea } from './tipos'

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>(cargarTareas)

  useEffect(() => {
    guardarTareas(tareas)
  }, [tareas])

  const agregar = (tarea: Tarea) => setTareas((ts) => [...ts, tarea])

  const mover = (id: string, estado: Estado) =>
    setTareas((ts) => ts.map((t) => (t.id === id ? { ...t, estado } : t)))

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <h1 className="text-2xl font-bold">Bitácora de tareas</h1>
      <FormularioTarea alAgregar={agregar} />
      <Tablero tareas={tareas} alMover={mover} />
    </div>
  )
}
