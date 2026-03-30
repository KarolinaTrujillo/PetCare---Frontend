import { Users, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ClienteAdminProps } from '../types/cliente.admin.types'
import { Routes } from '@/src/core/navigator/routes'

export const ClientesAdminTable = ({ clientes }: { clientes: ClienteAdminProps[] }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-[#267A6E]" />
          <h2 className="text-sm font-bold text-gray-900">Clientes recientes</h2>
        </div>
        <Link href={Routes.dashboard.admin.clientes} className="text-xs text-[#267A6E] hover:underline flex items-center gap-1">
          Ver todos <ChevronRight size={13} />
        </Link>
      </div>
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-50">
              <th className="px-5 py-3 text-left font-semibold">Nombre</th>
              <th className="px-5 py-3 text-left font-semibold">Email</th>
              <th className="px-5 py-3 text-left font-semibold">Teléfono</th>
              <th className="px-5 py-3 text-left font-semibold">Registro</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c, i) => (
              <tr key={c.id} className={`hover:bg-gray-50 transition-colors ${i !== clientes.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <td className="px-5 py-3 font-medium text-gray-900">{c.nombre} {c.apellido}</td>
                <td className="px-5 py-3 text-gray-500">{c.email}</td>
                <td className="px-5 py-3 text-gray-500">{c.telefono}</td>
                <td className="px-5 py-3 text-gray-500">{new Date(c.created_at).toLocaleDateString('es-MX')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}