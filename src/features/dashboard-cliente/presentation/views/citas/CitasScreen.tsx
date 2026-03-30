'use client'

import { NavBarComponent } from "../../components/NavBar"
import { CardOverViewComponent } from "../../components/CardOverview"
import { WordRotateConfetti } from "@/src/core/components/ui/WordRotateConfetti"
import { CalendarDays, Search } from "lucide-react"
import { useState } from "react"
import { citaToCardProps } from "@/src/core/mappers/cita.mapper"
import { useCitasViewModel } from "../../viewmodels/citas.viewmodel"
import { LoaderOne } from "@/src/core/components/ui/loader"

const estadoOpciones = ['TODAS', 'PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA'] as const

const estadoStyles: Record<string, string> = {
  TODAS:      'bg-gray-100 text-gray-600',
  PENDIENTE:  'bg-yellow-100 text-yellow-700',
  CONFIRMADA: 'bg-green-100 text-green-700',
  CANCELADA:  'bg-red-100 text-red-700',
  COMPLETADA: 'bg-blue-100 text-blue-700',
}

export const CitasScreen = () => {
  const { citas, isLoading, error } = useCitasViewModel()
  const [filtro, setFiltro] = useState<string>('TODAS')
  const [busqueda, setBusqueda] = useState('')

  const citasFiltradas = citas
    .filter(c => filtro === 'TODAS' || c.estado === filtro)
    .filter(c =>
      (c.nombre_mascota ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
      (c.nombre_dueno ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
      (c.nombre_servicio ?? '').toLowerCase().includes(busqueda.toLowerCase())
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
      <NavBarComponent
        title="CITAS"
        subtitle="Gestiona tus citas aquí..."
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-hidden">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={20} className="text-[#267A6E]" />
              <h2 className="text-black font-semibold text-lg">Mis citas</h2>
            </div>
            <span className="text-sm text-gray-400">{citasFiltradas.length} resultado{citasFiltradas.length !== 1 ? 's' : ''}</span>
          </div>

          <button className="flex items-center gap-2 bg-[#267A6E] hover:bg-[#1d6259] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer">
            <CalendarDays size={16} />
            Agendar Cita
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por mascota, dueño o servicio..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-full outline-none focus:border-[#267A6E] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            {estadoOpciones.map(op => (
              <button
                key={op}
                onClick={() => setFiltro(op)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer ${
                  filtro === op
                    ? estadoStyles[op]
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        {citasFiltradas.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 overflow-y-auto">
            {citasFiltradas.map(c => (
              <CardOverViewComponent key={c.id} {...citaToCardProps(c)} />
            ))}
          </div>
        ) : (
          <div className="relative flex-1 flex flex-col items-center overflow-hidden -mx-6 -mb-8">
            <div className="mt-16 z-10 flex flex-col items-center gap-2">
              <p className="text-gray-900 text-3xl font-semibold">No tienes citas recientes</p>
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
    </div>
  )
}