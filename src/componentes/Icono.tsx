import type { ReactNode } from 'react'

const ICONOS = {
  sol: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ),
  luna: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  calendario: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  reloj: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  agarre: (
    <>
      <circle cx="9" cy="6" r="1" />
      <circle cx="15" cy="6" r="1" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="9" cy="18" r="1" />
      <circle cx="15" cy="18" r="1" />
    </>
  ),
  flechaIzquierda: <path d="M19 12H5M12 19l-7-7 7-7" />,
  flechaDerecha: <path d="M5 12h14M12 5l7 7-7 7" />,
  chevronIzquierda: <path d="m15 18-6-6 6-6" />,
  chevronDerecha: <path d="m9 18 6-6-6-6" />,
  mas: <path d="M12 5v14M5 12h14" />,
  bandeja: (
    <>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </>
  ),
  tablero: (
    <>
      <rect x="3" y="3" width="5" height="18" rx="1.5" />
      <rect x="10" y="3" width="5" height="11" rx="1.5" />
      <rect x="17" y="3" width="4" height="15" rx="1.5" />
    </>
  ),
  gantt: <path d="M3 6h9M8 12h13M5 18h10" />,
} satisfies Record<string, ReactNode>

export type NombreIcono = keyof typeof ICONOS

interface Props {
  nombre: NombreIcono
  className?: string
}

/** Icono decorativo (oculto para lectores de pantalla); el significado va en el texto del botón. */
export function Icono({ nombre, className = 'size-4' }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {ICONOS[nombre]}
    </svg>
  )
}
