'use client'

import { useState } from 'react'
import { NavBarAdminComponent } from '../../components/NavBarAdmin'
import { usePersonalViewModel } from '../../viewmodels/personal.viewmodel'
import { ModalCrearVeterinario } from '../../components/ModalCrearVeterinario'
import { ModalCrearAdmin } from '../../components/ModalCrearAdmin'
import { LoaderOne } from '@/src/core/components/ui/loader'
import { UserCog, Shield, Search, ChevronLeft, ChevronRight } from 'lucide-react'

const rolStyles: Record<string, string> = {
  ADMIN:       'bg-purple-100 text-purple-700',
  VETERINARIO: 'bg-[#267A6E]/10 text-[#267A6E]',
}

const ITEMS_PER_PAGE = 10

export const PersonalAdminScreen = () => {
  const { personal, isLoading, error, refetch } = usePersonalViewModel()
  const [busqueda, setBusqueda] = useState('')
  const [filtroRol, setFiltroRol] = useState<'TODOS' | 'ADMIN' | 'VETERINARIO'>('TODOS')
  const [pagina, setPagina] = useState(1)
  const [modalVet, setModalVet] = useState(false)
  const [modalAdmin, setModalAdmin] = useState(false)

  const personalFiltrado = personal
    .filter(p => filtroRol === 'TODOS' || p.rol === filtroRol)
    .filter(p =>
      `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
      (p.email ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
      (p.especialidad ?? '').toLowerCase().includes(busqueda.toLowerCase())
    )

  const totalPaginas = Math.ceil(personalFiltrado.length / ITEMS_PER_PAGE)
  const personalPaginado = personalFiltrado.slice(
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
        title="PERSONAL"
        subtitle="Gestiona veterinarios y administradores"
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-hidden">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserCog size={20} className="text-[#267A6E]" />
            <h2 className="text-black font-semibold text-lg">Personal</h2>
            <span className="text-sm text-gray-400">{personalFiltrado.length} registros</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={e => { setBusqueda(e.target.value); setPagina(1) }}
                className="pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-full outline-none focus:border-[#267A6E] transition-colors w-56 text-gray-900 placeholder:text-gray-300"
              />
            </div>
            <button onClick={() => setModalVet(true)}
              className="flex items-center gap-2 bg-[#267A6E] hover:bg-[#1d6259] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors cursor-pointer">
              <UserCog size={15} /> Nuevo veterinario
            </button>
            <button onClick={() => setModalAdmin(true)}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors cursor-pointer">
              <Shield size={15} /> Nuevo admin
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(['TODOS', 'VETERINARIO', 'ADMIN'] as const).map(op => (
            <button key={op} onClick={() => { setFiltroRol(op); setPagina(1) }}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer ${
                filtroRol === op
                  ? op === 'TODOS' ? 'bg-gray-200 text-gray-700' : rolStyles[op]
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}>
              {op}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden flex-1">
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 text-left font-semibold">Nombre</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Teléfono</th>
                  <th className="px-6 py-4 text-left font-semibold">Especialidad</th>
                  <th className="px-6 py-4 text-left font-semibold">Rol</th>
                </tr>
              </thead>
              <tbody>
                {personalPaginado.length > 0 ? personalPaginado.map((p, i) => (
                  <tr key={`${p.rol}-${p.id}`} className={`hover:bg-gray-50 transition-colors ${i !== personalPaginado.length - 1 ? 'border-b border-gray-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#267A6E]/10 flex items-center justify-center text-[#267A6E] text-xs font-bold shrink-0">
                          {p.nombre[0]}{p.apellido[0]}
                        </div>
                        <span className="font-medium text-gray-900">{p.nombre} {p.apellido}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{p.email}</td>
                    <td className="px-6 py-4 text-gray-500">{p.telefono ?? '—'}</td>
                    <td className="px-6 py-4 text-gray-500">{p.especialidad ?? '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${rolStyles[p.rol]}`}>
                        {p.rol}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-400">
                      No se encontró personal
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

      <ModalCrearVeterinario isOpen={modalVet} onClose={() => setModalVet(false)} onSuccess={() => { refetch(); setModalVet(false) }} />
      <ModalCrearAdmin isOpen={modalAdmin} onClose={() => setModalAdmin(false)} onSuccess={() => { refetch(); setModalAdmin(false) }} />

    </div>
  )
}