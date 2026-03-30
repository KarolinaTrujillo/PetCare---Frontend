'use client'

import { CalendarDays, Stethoscope, PawPrint, DollarSign, ArrowRight, User } from 'lucide-react'
import { CardOverViewProps } from '../types/card.overview.types'

const estadoStyles: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-700',
  CONFIRMADA: 'bg-green-100 text-green-700',
  CANCELADA: 'bg-red-100 text-red-700',
  COMPLETADA: 'bg-blue-100 text-blue-700',
}

export const CardOverViewComponent = ({
  nombre_mascota,
  nombre_dueno,
  apellido_dueno,
  nombre_veterinario,
  apellido_veterinario,
  nombre_servicio,
  precio_servicio,
  fecha,
  estado,
  observaciones_cliente,
}: CardOverViewProps) => {
  const fechaFormateada = fecha
    ? new Date(fecha).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—'

  return (
    <div className="flex items-center gap-5 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow w-full">

      <div className="w-12 h-12 rounded-full bg-[#267A6E]/10 flex items-center justify-center shrink-0">
        <PawPrint size={22} className="text-[#267A6E]" />
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-0">

        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold text-base">{nombre_mascota ?? '—'}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${estadoStyles[estado] ?? ''}`}>
            {estado}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-gray-500">
          <div className="flex items-center gap-2 truncate">
            <User size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">{nombre_dueno} {apellido_dueno}</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <Stethoscope size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">Dr. {nombre_veterinario} {apellido_veterinario}</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <CalendarDays size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">{fechaFormateada}</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <DollarSign size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">{nombre_servicio} · ${precio_servicio}</span>
          </div>
        </div>

        {observaciones_cliente && (
          <p className="text-xs text-gray-400 italic truncate">"{observaciones_cliente}"</p>
        )}

      </div>

      <button className="flex items-center gap-1 bg-[#267A6E] hover:bg-[#1d6259] text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer shrink-0">
        Ver
        <ArrowRight size={13} />
      </button>

    </div>
  )
}