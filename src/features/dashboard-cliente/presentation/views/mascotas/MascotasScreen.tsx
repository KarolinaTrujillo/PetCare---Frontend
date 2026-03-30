'use client'

import { NavBarComponent } from "../../components/NavBar"
import { CardMascotaComponent } from "../../components/CardMascotaComponent"
import { WordRotateConfetti } from "@/src/core/components/ui/WordRotateConfetti"
import { PawPrint, Search } from "lucide-react"
import { useState } from "react"
import { useMascotasViewModel } from "../../viewmodels/mascotas.viewmodel"
import { LoaderOne } from "@/src/core/components/ui/loader"

export const MascotasScreen = () => {
  const { mascotas, isLoading, error } = useMascotasViewModel()
  const [busqueda, setBusqueda] = useState('')
  const [filtroEspecie, setFiltroEspecie] = useState<'TODAS' | 'Perro' | 'Gato'>('TODAS')

  const mascotasFiltradas = mascotas
    .filter(m => filtroEspecie === 'TODAS' || m.especie === filtroEspecie)
    .filter(m => m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                 (m.raza ?? '').toLowerCase().includes(busqueda.toLowerCase()))

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
      <NavBarComponent
        title="MASCOTAS"
        subtitle="Gestiona tus mascotas aquí..."
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-hidden">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <PawPrint size={20} className="text-[#267A6E]" />
              <h2 className="text-black font-semibold text-lg">Mis mascotas</h2>
            </div>
            <span className="text-sm text-gray-400">
              {mascotasFiltradas.length} resultado{mascotasFiltradas.length !== 1 ? 's' : ''}
            </span>
          </div>

          <button className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer">
            <PawPrint size={16} />
            Agregar Mascota
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o raza..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-full outline-none focus:border-[#267A6E] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            {(['TODAS', 'Perro', 'Gato'] as const).map(op => (
              <button
                key={op}
                onClick={() => setFiltroEspecie(op)}
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
        </div>

        {mascotasFiltradas.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 overflow-y-auto">
            {mascotasFiltradas.map(m => (
              <CardMascotaComponent key={m.id} {...m} />
            ))}
          </div>
        ) : (
          <div className="relative flex-1 flex flex-col items-center overflow-hidden -mx-6 -mb-8">
            <div className="mt-16 z-10 flex flex-col items-center gap-2">
              <p className="text-gray-900 text-3xl font-semibold">No tienes mascotas registradas</p>
              <div className="flex items-center gap-2 text-2xl font-bold text-[#267A6E]">
                <span>Priorizamos tu</span>
                <WordRotateConfetti
                  words={['Salud', 'Bienestar', 'Cuidado', 'Amor']}
                  className="text-2xl font-bold text-[#267A6E]"
                />
              </div>
            </div>
            <img
              src="/resources/overview-user.webp"
              alt="Overview"
              style={{ width: '22rem' }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-contain"
            />
          </div>
        )}

      </div>
    </div>
  )
}