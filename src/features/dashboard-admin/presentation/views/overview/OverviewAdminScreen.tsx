'use client'

import { NavBarAdminComponent } from "../../components/NavBarAdmin"
import { StatCard } from "../../components/StatCard"
import { CitasAdminTable } from "../../components/CitasAdminTable"
import { ClientesAdminTable } from "../../components/ClientesAdminTable"
import { CalendarDays, Users, PawPrint, UserCog } from "lucide-react"
import { useOverviewAdminViewModel } from "../../viewmodels/overview.viewmodel"
import { LoaderOne } from "@/src/core/components/ui/loader"

export const OverviewAdminScreen = () => {
  const { citas, clientes, totalClientes, totalMascotas, totalPersonal, isLoading, error } = useOverviewAdminViewModel()

  const citasHoy = citas.filter(c => {
    const hoy = new Date()
    const fecha = new Date(c.fecha)
    return (
      fecha.getDate()     === hoy.getDate()  &&
      fecha.getMonth()    === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    )
  })

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center">
      <LoaderOne />
    </div>
  )

  if (error) return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
    </div>
  )

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBarAdminComponent
        title="INICIO"
        subtitle="Panel de administración"
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-y-auto">

        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total citas hoy" value={citasHoy.length} description="citas registradas" icon={<CalendarDays size={22} />} />
          <StatCard label="Clientes activos" value={totalClientes} description="clientes registrados" icon={<Users size={22} />} />
          <StatCard label="Pacientes activos" value={totalMascotas} description="pacientes registrados" icon={<PawPrint size={22} />} />
          <StatCard label="Personal activo" value={totalPersonal} description="veterinarios activos" icon={<UserCog size={22} />} />
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
          <CitasAdminTable citas={citas} />
          <ClientesAdminTable clientes={clientes} />
        </div>

      </div>
    </div>
  )
}