'use client'

import { useState } from 'react'
import { NavBarAdminComponent } from '../../components/NavBarAdmin'
import { useCitasAdminViewModel } from '../../viewmodels/citas.viewmodel'
import { LoaderOne } from '@/src/core/components/ui/loader'
import { CalendarDays, Search, ChevronLeft, ChevronRight } from 'lucide-react'

const estadoStyles: Record<string, string> = {
  PENDIENTE:  'bg-yellow-100 text-yellow-700',
  CONFIRMADA: 'bg-green-100 text-green-700',
  CANCELADA:  'bg-red-100 text-red-700',
  COMPLETADA: 'bg-blue-100 text-blue-700',
  ATENDIDA:   'bg-purple-100 text-purple-700',
}

const estadoOpciones = ['TODAS', 'PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA', 'ATENDIDA'] as const

const ITEMS_PER_PAGE = 10

export const CitasAdminScreen = () => {
  const { citas, isLoading, error } = useCitasAdminViewModel()
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState<string>('TODAS')
  const [pagina, setPagina] = useState(1)

  const citasFiltradas = citas
    .filter(c => filtro === 'TODAS' || c.estado === filtro)
    .filter(c =>
      (c.mascota ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
      (c.dueno ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
      (c.veterinario ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
      (c.servicio ?? '').toLowerCase().includes(busqueda.toLowerCase())
    )

  const totalPaginas = Math.ceil(citasFiltradas.length / ITEMS_PER_PAGE)
  const citasPaginadas = citasFiltradas.slice(
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
        title="CITAS"
        subtitle="Gestiona todas las citas"
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays size={20} className="text-[#267A6E]" />
            <h2 className="text-black font-semibold text-lg">Citas</h2>
            <span className="text-sm text-gray-400">{citasFiltradas.length} registros</span>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por mascota, dueño, vet o servicio..."
              value={busqueda}
              onChange={e => { setBusqueda(e.target.value); setPagina(1) }}
              className="pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-full outline-none focus:border-[#267A6E] transition-colors w-80 text-gray-900 placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-2">
          {estadoOpciones.map(op => (
            <button
              key={op}
              onClick={() => { setFiltro(op); setPagina(1) }}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer ${
                filtro === op
                  ? (estadoStyles[op] ?? 'bg-gray-100 text-gray-600')
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        {/* Tabla */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden flex-1">
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 text-left font-semibold">Mascota</th>
                  <th className="px-6 py-4 text-left font-semibold">Dueño</th>
                  <th className="px-6 py-4 text-left font-semibold">Veterinario</th>
                  <th className="px-6 py-4 text-left font-semibold">Servicio</th>
                  <th className="px-6 py-4 text-left font-semibold">Fecha</th>
                  <th className="px-6 py-4 text-left font-semibold">Precio</th>
                  <th className="px-6 py-4 text-left font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {citasPaginadas.length > 0 ? citasPaginadas.map((c, i) => (
                  <tr key={c.id} className={`hover:bg-gray-50 transition-colors ${i !== citasPaginadas.length - 1 ? 'border-b border-gray-50' : ''}`}>
                    <td className="px-6 py-4 font-medium text-gray-900">{c.mascota ?? '—'}</td>
                    <td className="px-6 py-4 text-gray-500">{c.dueno ?? '—'}</td>
                    <td className="px-6 py-4 text-gray-500">{c.veterinario ?? '—'}</td>
                    <td className="px-6 py-4 text-gray-500">{c.servicio ?? '—'}</td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {c.fecha ? new Date(c.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-500">${c.precio ?? '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoStyles[c.estado] ?? 'bg-gray-100 text-gray-600'}`}>
                        {c.estado}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-400">
                      No se encontraron citas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">Página {pagina} de {totalPaginas}</p>
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