import { CalendarDays, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { CitaVetProps } from '../types/cita.vet.types'
import { Routes } from '@/src/core/navigator/routes'

const estadoStyles: Record<string, string> = {
  PENDIENTE:  'bg-yellow-100 text-yellow-700',
  CONFIRMADA: 'bg-green-100 text-green-700',
  ATENDIDA:   'bg-blue-100 text-blue-700',
  CANCELADA:  'bg-red-100 text-red-700',
}

export const CitasTable = ({ citas }: { citas: CitaVetProps[] }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-[#267A6E]" />
          <h2 className="text-sm font-bold text-gray-900">Próximas citas</h2>
        </div>
        <Link href={Routes.dashboard.veterinario.citas} className="text-xs text-[#267A6E] hover:underline flex items-center gap-1">
          Ver todas <ChevronRight size={13} />
        </Link>
      </div>

      <div className="overflow-y-auto flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-50">
              <th className="px-5 py-3 text-left font-semibold">Paciente</th>
              <th className="px-5 py-3 text-left font-semibold">Propietario</th>
              <th className="px-5 py-3 text-left font-semibold">Hora</th>
              <th className="px-5 py-3 text-left font-semibold">Tipo</th>
              <th className="px-5 py-3 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((c, i) => (
              <tr
                key={c.id}
                className={`hover:bg-gray-50 transition-colors ${i !== citas.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <td className="px-5 py-3 font-medium text-gray-900">{c.nombre_mascota}</td>
                <td className="px-5 py-3 text-gray-500">{c.nombre_dueno} {c.apellido_dueno}</td>
                <td className="px-5 py-3 text-gray-500">{c.hora}</td>
                <td className="px-5 py-3 text-gray-500 truncate max-w-[100px]">{c.nombre_servicio}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoStyles[c.estado] ?? ''}`}>
                    {c.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}