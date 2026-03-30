'use client'

import { useState } from 'react'
import { NavBarAdminComponent } from '../../components/NavBarAdmin'
import { useClientesViewModel } from '../../viewmodels/clientes.viewmodel'
import { LoaderOne } from '@/src/core/components/ui/loader'
import { Users, Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 10

export const ClientesAdminScreen = () => {
  const { clientes, isLoading, error } = useClientesViewModel()
  const [busqueda, setBusqueda] = useState('')
  const [pagina, setPagina] = useState(1)

  const clientesFiltrados = clientes.filter(c =>
    `${c.nombre} ${c.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    (c.telefono ?? '').includes(busqueda)
  )

  const totalPaginas = Math.ceil(clientesFiltrados.length / ITEMS_PER_PAGE)
  const clientesPaginados = clientesFiltrados.slice(
    (pagina - 1) * ITEMS_PER_PAGE,
    pagina * ITEMS_PER_PAGE
  )

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderOne />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBarAdminComponent
        title="CLIENTES"
        subtitle="Gestiona los clientes registrados"
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-hidden">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users size={20} className="text-[#267A6E]" />
            <h2 className="text-black font-semibold text-lg">Clientes</h2>
            <span className="text-sm text-gray-400">{clientesFiltrados.length} registros</span>
          </div>

          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              value={busqueda}
              onChange={e => { setBusqueda(e.target.value); setPagina(1) }}
              className="pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-full outline-none focus:border-[#267A6E] transition-colors w-72 text-gray-900 placeholder:text-gray-300"
            />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden flex-1">
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 text-left font-semibold">Cliente</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Teléfono</th>
                  <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientesPaginados.length > 0 ? clientesPaginados.map((c, i) => (
                  <tr key={c.id} className={`hover:bg-gray-50 transition-colors ${i !== clientesPaginados.length - 1 ? 'border-b border-gray-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#267A6E]/10 flex items-center justify-center text-[#267A6E] text-xs font-bold shrink-0">
                          {c.nombre[0]}{c.apellido[0]}
                        </div>
                        <span className="font-medium text-gray-900">{c.nombre} {c.apellido}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{c.email}</td>
                    <td className="px-6 py-4 text-gray-500">{c.telefono ?? '—'}</td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 border border-red-100 hover:border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer">
                        <Trash2 size={11} /> Eliminar
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-400">
                      No se encontraron clientes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Página {pagina} de {totalPaginas}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagina(p => Math.max(1, p - 1))}
                  disabled={pagina === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                  disabled={pagina === totalPaginas}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}