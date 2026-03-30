'use client'

import { PawPrint, User, ArrowRight, Tag, Cake, Dna } from 'lucide-react'
import { CardPetOverViewProps } from '../types/pet.overview.types'

export const CardPetOverViewComponent = ({
  nombre,
  especie,
  raza,
  edad,
  nombre_dueno,
  apellido_dueno,
  fecha_registro,
}: CardPetOverViewProps) => {
  const fechaFormateada = fecha_registro
    ? new Date(fecha_registro).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—'

  return (
    <div className="flex items-center gap-5 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow w-full">

      <div className="w-12 h-12 rounded-full bg-[#267A6E]/10 flex items-center justify-center shrink-0">
        <PawPrint size={22} className="text-[#267A6E]" />
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-0">

        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold text-base">{nombre}</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#267A6E]/10 text-[#267A6E]">
            {especie}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-gray-500">
          <div className="flex items-center gap-2 truncate">
            <User size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">{nombre_dueno} {apellido_dueno}</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <Dna size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">{raza}</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <Cake size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">{edad} {edad === 1 ? 'año' : 'años'}</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <Tag size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">Desde {fechaFormateada}</span>
          </div>
        </div>

      </div>

      <button className="flex items-center gap-1 bg-[#267A6E] hover:bg-[#1d6259] text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer shrink-0">
        Ver
        <ArrowRight size={13} />
      </button>

    </div>
  )
}