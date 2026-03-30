import { LayoutDashboard, CalendarDays, PawPrint, Users, UserCog, BarChart2, Settings } from 'lucide-react'
import { Routes } from '@/src/core/navigator/routes'

export const linksAdmin = [
  {
    label: 'Panel principal',
    href: Routes.dashboard.admin.overview,
    icon: <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Clientes',
    href: Routes.dashboard.admin.clientes,
    icon: <Users className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Citas',
    href: Routes.dashboard.admin.citas,
    icon: <CalendarDays className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Pacientes',
    href: Routes.dashboard.admin.pacientes,
    icon: <PawPrint className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Personal',
    href: Routes.dashboard.admin.personal,
    icon: <UserCog className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Análisis',
    href: Routes.dashboard.admin.analisis,
    icon: <BarChart2 className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
  {
    label: 'Configuración',
    href: Routes.dashboard.admin.configuracion,
    icon: <Settings className="h-5 w-5 shrink-0 text-neutral-700" />,
  },
]