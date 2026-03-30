import { LayoutDashboard, CalendarDays, PawPrint, Settings } from 'lucide-react'
import { Routes } from '@/src/core/navigator/routes'

export const linksVet = [
  {
    label: 'Panel principal',
    href: Routes.dashboard.veterinario.overview,
    icon: <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Mis citas',
    href: Routes.dashboard.veterinario.citas,
    icon: <CalendarDays className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Mis pacientes',
    href: Routes.dashboard.veterinario.pacientes,
    icon: <PawPrint className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Agenda',
    href: Routes.dashboard.veterinario.agenda,
    icon: <CalendarDays className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Configuración',
    href: Routes.dashboard.veterinario.configuracion,
    icon: <Settings className="h-5 w-5 shrink-0 text-neutral-700" />,
  }
]