import { useEffect, useState } from 'react'
import {
  cargarTareas,
  cargarTema,
  guardarTareas,
  guardarTema,
} from './almacenamiento'
import { Cabecera } from './componentes/Cabecera'
import { FormularioTarea } from './componentes/FormularioTarea'
import { Tablero } from './componentes/Tablero'
import { VistaGantt } from './componentes/VistaGantt'
import type { Estado, Tarea, Tema, Vista } from './tipos'

/** Tema que prefiere el sistema operativo (claro si el navegador no lo informa). */
function temaDelSistema(): Tema {
  const oscuro =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  return oscuro ? 'oscuro' : 'claro'
}

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>(cargarTareas)
  const [vista, setVista] = useState<Vista>('kanban')
  const [tema, setTema] = useState<Tema>(() => cargarTema() ?? temaDelSistema())

  useEffect(() => {
    guardarTareas(tareas)
  }, [tareas])

  useEffect(() => {
    document.documentElement.dataset.tema = tema
  }, [tema])

  const cambiarTema = (nuevo: Tema) => {
    setTema(nuevo)
    guardarTema(nuevo)
  }

  const agregar = (tarea: Tarea) => setTareas((ts) => [...ts, tarea])

  const mover = (id: string, estado: Estado) =>
    setTareas((ts) => ts.map((t) => (t.id === id ? { ...t, estado } : t)))

  return (
    <div className="min-h-dvh">
      <Cabecera
        vista={vista}
        alCambiarVista={setVista}
        tema={tema}
        alCambiarTema={cambiarTema}
      />
      <main className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 lg:grid-cols-[21rem_minmax(0,1fr)] lg:items-start lg:px-8">
        <aside className="lg:sticky lg:top-24">
          <FormularioTarea alAgregar={agregar} />
        </aside>
        <div className="min-w-0">
          {vista === 'kanban' ? (
            <Tablero tareas={tareas} alMover={mover} />
          ) : (
            <VistaGantt tareas={tareas} />
          )}
        </div>
      </main>
    </div>
  )
}
