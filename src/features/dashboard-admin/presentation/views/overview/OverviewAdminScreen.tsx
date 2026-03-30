'use client'

import { NavBarAdminComponent } from "../../components/NavBarAdmin"
import { StatCard } from "../../components/StatCard"
import { CitasAdminTable } from "../../components/CitasAdminTable"
import { ClientesAdminTable } from "../../components/ClientesAdminTable"
import { CalendarDays, Users, PawPrint, UserCog } from "lucide-react"
import { CitaAdminProps } from "../../types/cita.admin.types"
import { ClienteAdminProps } from "../../types/cliente.admin.types"

const citasRecientes: CitaAdminProps[] = [
  { id: 1, nombre_mascota: 'Max', nombre_dueno: 'Carlos', apellido_dueno: 'García', nombre_veterinario: 'Arturo', apellido_veterinario: 'López', nombre_servicio: 'Vacunación', fecha: '2026-03-26T10:00:00.000Z', estado: 'CONFIRMADA' },
  { id: 2, nombre_mascota: 'Luna', nombre_dueno: 'Ana', apellido_dueno: 'Martínez', nombre_veterinario: 'Sofía', apellido_veterinario: 'Pérez', nombre_servicio: 'Revisión general', fecha: '2026-03-26T11:30:00.000Z', estado: 'PENDIENTE' },
]

const clientesRecientes: ClienteAdminProps[] = [
  { id: 1, nombre: 'Carlos', apellido: 'García', email: 'carlos@email.com', telefono: '9611234567', created_at: '2026-03-20T00:00:00.000Z' },
  { id: 2, nombre: 'Ana', apellido: 'Martínez', email: 'ana@email.com', telefono: '9619876543', created_at: '2026-03-21T00:00:00.000Z' },
  { id: 3, nombre: 'Luis', apellido: 'Hernández', email: 'luis@email.com', telefono: '9615554433', created_at: '2026-03-22T00:00:00.000Z' },
]

export const OverviewAdminScreen = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBarAdminComponent
        title="INICIO"
        subtitle="Panel de administración"
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-y-auto">

        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total citas hoy" value={citasRecientes.length} description="citas registradas" icon={<CalendarDays size={22} />} />
          <StatCard label="Clientes activos" value={clientesRecientes.length} description="clientes registrados" icon={<Users size={22} />} />
          <StatCard label="Pacientes activos" value={12} description="pacientes registrados" icon={<PawPrint size={22} />} />
          <StatCard label="Personal activo" value={5} description="veterinarios activos" icon={<UserCog size={22} />} />
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
          <CitasAdminTable citas={citasRecientes} />
          <ClientesAdminTable clientes={clientesRecientes} />
        </div>

      </div>
    </div>
  )
}