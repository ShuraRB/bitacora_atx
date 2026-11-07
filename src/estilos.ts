import type { Estado } from './tipos'

/** Clases de Tailwind por estado, basadas en los tokens de color de `index.css`. */
export const ESTILO_ESTADO: Record<
  Estado,
  { punto: string; lomo: string; chip: string; barra: string }
> = {
  'por-hacer': {
    punto: 'bg-hacer',
    lomo: 'border-l-hacer',
    chip: 'bg-hacer-suave text-hacer',
    barra: 'bg-barra-hacer text-sobre-barra-hacer',
  },
  'en-curso': {
    punto: 'bg-curso',
    lomo: 'border-l-curso',
    chip: 'bg-curso-suave text-curso',
    barra: 'bg-barra-curso text-sobre-barra-curso',
  },
  hecho: {
    punto: 'bg-hecho',
    lomo: 'border-l-hecho',
    chip: 'bg-hecho-suave text-hecho',
    barra: 'bg-barra-hecho text-sobre-barra-hecho',
  },
}
