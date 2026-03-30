'use client'

import { useState } from 'react'
import { CardOverViewComponent } from "../../components/CardOverview"
import { CardPetOverViewComponent } from "../../components/CardPetOverview"
import { NavBarComponent } from "../../components/NavBar"
import { CalendarDays, ChevronRight, PawPrint } from "lucide-react"
import { CardOverViewProps } from '../../types/card.overview.types'
import { CardPetOverViewProps } from "../../types/pet.overview.types"
import { WordRotateConfetti } from "@/src/core/components/ui/WordRotateConfetti"
import { useOverviewViewModel } from '../../viewmodels/overview.viewmodel'
import { LoaderOne } from "@/src/core/components/ui/loader"
import { mascotaToCardProps } from '@/src/core/mappers/mascota.mapper'
import { ModalAgendarCita } from '../../components/ModalAgendarCita'
import { ModalAgregarMascota } from '../../components/ModalAgregarMascota'

export const OverviewScreen = () => {
  const { citas, mascotas, isLoading, error } = useOverviewViewModel()
  const recentAppointments: CardOverViewProps[] = citas
  const recentPets: CardPetOverViewProps[] = mascotas.map(mascotaToCardProps)

  const [modalCita, setModalCita] = useState(false)
  const [modalMascota, setModalMascota] = useState(false)

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
        title="INICIO"
        subtitle="Gestiona tu contenido aqui..."
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-hidden">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={20} className="text-[#267A6E]" />
              <h2 className="text-black font-semibold text-lg">Citas recientes</h2>
            </div>
            <a href="/dashboard/cliente/citas" className="flex items-center gap-1 text-sm text-[#267A6E] hover:underline">
              Ver todas
              <ChevronRight size={16} />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setModalCita(true)} className="flex items-center gap-2 bg-[#267A6E] hover:bg-[#1d6259] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer">
              <CalendarDays size={16} />
              Agendar Cita
            </button>
            <button onClick={() => setModalMascota(true)} className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer">
              Agregar Mascota
            </button>
          </div>
        </div>

        {recentAppointments.length > 0 && (
          <div className="grid grid-cols-2 gap-3 overflow-y-auto">
            {recentAppointments.map((a) => (
              <CardOverViewComponent key={a.id} {...a} />
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PawPrint size={20} className="text-[#267A6E]" />
            <h2 className="text-black font-semibold text-lg">Mascotas recientes</h2>
          </div>
          <a href="/dashboard/cliente/mascotas" className="flex items-center gap-1 text-sm text-[#267A6E] hover:underline">
            Ver todas
            <ChevronRight size={16} />
          </a>
        </div>

        {recentPets.length > 0 && (
          <div className="grid grid-cols-2 gap-3 overflow-y-auto">
            {recentPets.map((p) => (
              <CardPetOverViewComponent key={p.id} {...p} />
            ))}
          </div>
        )}

        {recentAppointments.length === 0 && recentPets.length === 0 && (
          <div className="relative flex-1 flex flex-col items-center overflow-hidden -mx-6 -mb-8">
            <div className="mt-16 z-10 flex flex-col items-center gap-2">
              <p className="text-gray-900 text-3xl font-semibold">No tienes citas ni mascotas recientes</p>
              <div className="flex items-center gap-2 text-2xl font-bold text-[#267A6E]">
                <span>Priorizamos tu</span>
                <WordRotateConfetti
                  words={['Salud', 'Bienestar', 'Cuidado', 'Amor']}
                  className="text-2xl font-bold text-[#267A6E]"
                />
              </div>
            </div>
            <img
              src="/overview-pet.webp"
              alt="Overview"
              style={{ width: '63rem' }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-contain"
            />
          </div>
        )}

      </div>

      <ModalAgendarCita isOpen={modalCita} onClose={() => setModalCita(false)} onSuccess={() => {}} mascotas={mascotas} />
      <ModalAgregarMascota isOpen={modalMascota} onClose={() => setModalMascota(false)} onSuccess={() => {}} />

    </div>
  )
}