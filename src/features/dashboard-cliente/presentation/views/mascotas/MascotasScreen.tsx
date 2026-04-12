'use client'

import { NavBarComponent } from "../../components/NavBar"
import { CardMascotaComponent } from "../../components/CardMascotaComponent"
import { WordRotateConfetti } from "@/src/core/components/ui/WordRotateConfetti"
import { PawPrint, Search } from "lucide-react"
import { useState } from "react"
import { useMascotasViewModel } from "../../viewmodels/mascotas.viewmodel"
import { LoaderOne } from "@/src/core/components/ui/loader"
import { ModalAgregarMascota } from '../../components/ModalAgregarMascota'
import { ModalEditarMascota } from '../../components/ModalEditarMascota'
import { Mascota } from '@/src/features/dashboard-cliente/domain/entities/mascota.entity'

export const MascotasScreen = () => {
  const { mascotas, isLoading, error } = useMascotasViewModel()
  const [busqueda, setBusqueda] = useState('')
  const [filtroEspecie, setFiltroEspecie] = useState<'TODAS' | 'Perro' | 'Gato'>('TODAS')
  const [modalMascota, setModalMascota] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<Mascota | null>(null)

  const mascotasFiltradas = mascotas
    .filter(m => filtroEspecie === 'TODAS' || m.especie === filtroEspecie)
    .filter(m => m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                 (m.raza ?? '').toLowerCase().includes(busqueda.toLowerCase()))

  const handleEditar = (mascota: Mascota) => {
    setMascotaSeleccionada(mascota)
    setModalEditar(true)
  }

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

      <div className="flex flex-col flex-1 px-4 md:px-6 py-4 md:py-8 gap-4 md:gap-6 overflow-y-auto">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <PawPrint size={20} className="text-[#267A6E]" />
              <h2 className="text-black font-semibold text-base md:text-lg">Mis mascotas</h2>
            </div>
            <span className="text-xs md:text-sm text-gray-400">
              {mascotasFiltradas.length} resultado{mascotasFiltradas.length !== 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={() => setModalMascota(true)}
            className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white text-xs md:text-sm font-semibold px-3 md:px-5 py-2 md:py-2.5 rounded-full transition-colors cursor-pointer"
          >
            <PawPrint size={14} />
            Agregar Mascota
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative w-full sm:flex-1 sm:max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o raza..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-full outline-none focus:border-[#267A6E] transition-colors"
            />
          </div>
          <div className="flex items-center gap-1.5">
            {(['TODAS', 'Perro', 'Gato'] as const).map(op => (
              <button
                key={op}
                onClick={() => setFiltroEspecie(op)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mascotasFiltradas.map(m => (
              <CardMascotaComponent
                key={m.id}
                {...m}
                onEditar={() => handleEditar(m)}
              />
            ))}
          </div>
        ) : (
          <div className="relative flex-1 flex flex-col items-center overflow-hidden -mx-4 md:-mx-6 -mb-4 md:-mb-8">
            <div className="mt-8 md:mt-16 z-10 flex flex-col items-center gap-2 px-4 text-center">
              <p className="text-gray-900 text-xl md:text-3xl font-semibold">No tienes mascotas registradas</p>
              <div className="flex items-center gap-2 text-lg md:text-2xl font-bold text-[#267A6E]">
                <span>Priorizamos tu</span>
                <WordRotateConfetti
                  words={['Salud', 'Bienestar', 'Cuidado', 'Amor']}
                  className="text-lg md:text-2xl font-bold text-[#267A6E]"
                />
              </div>
            </div>
            <img
              src="/resources/overview-user.webp"
              alt="Overview"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-contain w-[60vw] md:w-[22rem]"
            />
          </div>
        )}

      </div>

      <ModalAgregarMascota
        isOpen={modalMascota}
        onClose={() => setModalMascota(false)}
        onSuccess={() => setModalMascota(false)}
      />

      <ModalEditarMascota
        isOpen={modalEditar}
        onClose={() => { setModalEditar(false); setMascotaSeleccionada(null) }}
        onSuccess={() => { setModalEditar(false); setMascotaSeleccionada(null) }}
        mascota={mascotaSeleccionada}
      />
    </div>
  )
}