import { PawPrint, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { PacienteVetProps } from '../types/paciente.vet.types'
import { Routes } from '@/src/core/navigator/routes'

export const PacientesTable = ({ pacientes }: { pacientes: PacienteVetProps[] }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <PawPrint size={16} className="text-[#267A6E]" />
          <h2 className="text-sm font-bold text-gray-900">Pacientes recientes</h2>
        </div>
        <Link href={Routes.dashboard.veterinario.pacientes} className="text-xs text-[#267A6E] hover:underline flex items-center gap-1">
          Ver todos <ChevronRight size={13} />
        </Link>
      </div>

      <div className="overflow-y-auto flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-50">
              <th className="px-5 py-3 text-left font-semibold">Paciente</th>
              <th className="px-5 py-3 text-left font-semibold">Especie</th>
              <th className="px-5 py-3 text-left font-semibold">Propietario</th>
              <th className="px-5 py-3 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p, i) => (
              <tr key={p.id} className={`hover:bg-gray-50 transition-colors ${i !== pacientes.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <td className="px-5 py-3 font-medium text-gray-900">{p.nombre}</td>
                <td className="px-5 py-3 text-gray-500">{p.especie} · {p.raza ?? 'Sin raza'}</td>
                <td className="px-5 py-3 text-gray-500">{p.nombre_dueno ?? '-'} {p.apellido_dueno ?? ''}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.activo ? 'Activo' : 'Inactivo'}
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