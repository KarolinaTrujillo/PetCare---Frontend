'use client'

import { NavBarVetComponent } from "../../components/NavBarVet"
import { StatCard } from "../../components/StatCard"
import { CitasTable } from "../../components/CitasTable"
import { PacientesTable } from "../../components/PacientesTable"
import { CalendarDays, PawPrint } from "lucide-react"
import { useCitasVetViewModel } from "../../viewmodels/citas.vet.viewmodel"
import { usePacientesVetViewModel } from "../../viewmodels/pacientes.vet.viewmodel"
import { LoaderOne } from "@/src/core/components/ui/loader"

export const OverviewVetScreen = () => {
  const { citas,     isLoading: loadingCitas }     = useCitasVetViewModel()
  const { pacientes, isLoading: loadingPacientes } = usePacientesVetViewModel()

  const isLoading = loadingCitas || loadingPacientes

  // Mostrar solo las 5 más recientes en cada tabla
  const citasRecientes    = citas.slice(0, 5)
  const pacientesRecientes = pacientes.slice(0, 5)

  // Stats
  const citasHoy = citas.filter(c => {
    const hoy = new Date()
    const fecha = new Date(c.fecha)
    return (
      fecha.getDate()     === hoy.getDate()  &&
      fecha.getMonth()    === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    )
  })

  const pacientesActivos = pacientes.filter(p => p.activo)

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center">
      <LoaderOne />
    </div>
  )

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBarVetComponent
        title="INICIO"
        subtitle="Gestiona tu contenido aquí..."
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-y-auto">

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Citas hoy"
            value={citasHoy.length}
            description={`${citas.length} citas en total`}
            icon={<CalendarDays size={22} />}
          />
          <StatCard
            label="Pacientes activos"
            value={pacientesActivos.length}
            description={`${pacientes.length} pacientes en total`}
            icon={<PawPrint size={22} />}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
          <CitasTable    citas={citasRecientes} />
          <PacientesTable pacientes={pacientesRecientes} />
        </div>

      </div>
    </div>
  )
}