import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { ESTADOS, type Estado, type Tarea } from '../tipos'
import { esEstado } from '../utils/tareas'
import { Columna } from './Columna'

interface Props {
  tareas: Tarea[]
  alMover: (id: string, estado: Estado) => void
}

export function Tablero({ tareas, alMover }: Props) {
  const sensores = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
    useSensor(KeyboardSensor),
  )

  const alSoltar = ({ active, over }: DragEndEvent) => {
    if (over && esEstado(over.id)) alMover(String(active.id), over.id)
  }

  return (
    <DndContext sensors={sensores} onDragEnd={alSoltar}>
      <div className="grid gap-4 md:grid-cols-3">
        {ESTADOS.map((estado) => (
          <Columna
            key={estado}
            estado={estado}
            tareas={tareas.filter((t) => t.estado === estado)}
            alMover={alMover}
          />
        ))}
      </div>
    </DndContext>
  )
}
