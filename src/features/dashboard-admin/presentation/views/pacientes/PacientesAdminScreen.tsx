'use client'

import { useState } from 'react'
import { NavBarAdminComponent } from '../../components/NavBarAdmin'
import { usePacientesViewModel } from '../../viewmodels/pacientes.viewmodel'
import { LoaderOne } from '@/src/core/components/ui/loader'
import { PawPrint, Search, ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 10

export const PacientesAdminScreen = () => {
  const { mascotas, isLoading, error } = usePacientesViewModel()
  const [busqueda, setBusqueda] = useState('')
  const [filtroEspecie, setFiltroEspecie] = useState<'TODAS' | 'Perro' | 'Gato'>('TODAS')
  const [pagina, setPagina] = useState(1)

  const mascotasFiltradas = mascotas
    .filter(m => filtroEspecie === 'TODAS' || m.especie === filtroEspecie)
    .filter(m =>
      (m.nombre ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
      (m.raza ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
      (m.propietario ?? '').toLowerCase().includes(busqueda.toLowerCase())
    )

  const totalPaginas = Math.ceil(mascotasFiltradas.length / ITEMS_PER_PAGE)
  const mascotasPaginadas = mascotasFiltradas.slice(
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
        title="PACIENTES"
        subtitle="Gestiona las mascotas registradas"
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-hidden">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PawPrint size={20} className="text-[#267A6E]" />
            <h2 className="text-black font-semibold text-lg">Pacientes</h2>
            <span className="text-sm text-gray-400">{mascotasFiltradas.length} registros</span>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, raza o propietario..."
              value={busqueda}
              onChange={e => { setBusqueda(e.target.value); setPagina(1) }}
              className="pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-full outline-none focus:border-[#267A6E] transition-colors w-80 text-gray-900 placeholder:text-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(['TODAS', 'Perro', 'Gato'] as const).map(op => (
            <button
              key={op}
              onClick={() => { setFiltroEspecie(op); setPagina(1) }}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer ${
                filtroEspecie === op
                  ? 'bg-[#267A6E]/10 text-[#267A6E]'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden flex-1">
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 text-left font-semibold">Mascota</th>
                  <th className="px-6 py-4 text-left font-semibold">Especie</th>
                  <th className="px-6 py-4 text-left font-semibold">Raza</th>
                  <th className="px-6 py-4 text-left font-semibold">Sexo</th>
                  <th className="px-6 py-4 text-left font-semibold">Peso</th>
                  <th className="px-6 py-4 text-left font-semibold">Propietario</th>
                  <th className="px-6 py-4 text-left font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {mascotasPaginadas.length > 0 ? mascotasPaginadas.map((m, i) => (
                  <tr key={m.id} className={`hover:bg-gray-50 transition-colors ${i !== mascotasPaginadas.length - 1 ? 'border-b border-gray-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#267A6E]/10 flex items-center justify-center shrink-0">
                          <PawPrint size={14} className="text-[#267A6E]" />
                        </div>
                        <span className="font-medium text-gray-900">{m.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{m.especie}</td>
                    <td className="px-6 py-4 text-gray-500">{m.raza ?? '—'}</td>
                    <td className="px-6 py-4 text-gray-500">{m.sexo ?? '—'}</td>
                    <td className="px-6 py-4 text-gray-500">{m.peso ? `${m.peso} kg` : '—'}</td>
                    <td className="px-6 py-4 text-gray-500">{m.propietario ?? '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${m.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {m.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-400">
                      No se encontraron pacientes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPaginas > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">Página {pagina} de {totalPaginas}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPagina(p => Math.max(1, p - 1))} disabled={pagina === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
                  <ChevronLeft size={14} />
                </button>
                <button onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
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