import { useEffect, useState } from 'react'
import { cargarTareas, guardarTareas } from './almacenamiento'
import { FormularioTarea } from './componentes/FormularioTarea'
import { SelectorVista } from './componentes/SelectorVista'
import { Tablero } from './componentes/Tablero'
import { VistaGantt } from './componentes/VistaGantt'
import type { Estado, Tarea, Vista } from './tipos'

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>(cargarTareas)
  const [vista, setVista] = useState<Vista>('kanban')

  useEffect(() => {
    guardarTareas(tareas)
  }, [tareas])

  const agregar = (tarea: Tarea) => setTareas((ts) => [...ts, tarea])

  const mover = (id: string, estado: Estado) =>
    setTareas((ts) => ts.map((t) => (t.id === id ? { ...t, estado } : t)))

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-blue-900">Bitácora de tareas</h1>
        <SelectorVista vista={vista} alCambiar={setVista} />
      </div>
      <FormularioTarea alAgregar={agregar} />
      {vista === 'kanban' ? (
        <Tablero tareas={tareas} alMover={mover} />
      ) : (
        <VistaGantt tareas={tareas} />
      )}
    </div>
  )
}
