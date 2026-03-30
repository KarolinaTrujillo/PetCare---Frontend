import { LayoutDashboard, CalendarDays, PawPrint, Settings } from 'lucide-react'
import { Routes } from '@/src/core/navigator/routes'

export const links = [
  {
    label: 'Panel principal',
    href: Routes.dashboard.cliente.overview,
    icon: <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Mis citas',
    href: Routes.dashboard.cliente.citas,
    icon: <CalendarDays className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Mis mascotas',
    href: Routes.dashboard.cliente.mascotas,
    icon: <PawPrint className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Configuración',
    href: Routes.dashboard.cliente.configuracion,
    icon: <Settings className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
]