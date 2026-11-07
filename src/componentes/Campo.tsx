import type { ReactNode } from 'react'
import type { DatosTarea } from '../utils/tareas'

interface Props {
  id: keyof DatosTarea
  etiqueta: string
  error?: string
  className?: string
  children: ReactNode
}

export function Campo({
  id,
  etiqueta,
  error,
  className = '',
  children,
}: Props) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-suave"
      >
        {etiqueta}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 animate-aviso text-[13px] font-medium text-peligro"
        >
          {error}
        </p>
      )}
    </div>
  )
}
