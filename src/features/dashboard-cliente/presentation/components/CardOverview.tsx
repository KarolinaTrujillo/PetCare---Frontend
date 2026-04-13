'use client'
import { CalendarDays, Stethoscope, PawPrint, DollarSign, ArrowRight, User, X, Tag, Clock } from 'lucide-react'
import { CardOverViewProps } from '../types/card.overview.types'
import { useState } from 'react'

const estadoStyles: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-700',
  CONFIRMADA: 'bg-green-100 text-green-700',
  CANCELADA: 'bg-red-100 text-red-700',
  COMPLETADA: 'bg-blue-100 text-blue-700',
  ATENDIDA: 'bg-blue-100 text-blue-700',
}

export const CardOverViewComponent = ({
  nombre_mascota,
  nombre_dueno,
  apellido_dueno,
  nombre_veterinario,
  apellido_veterinario,
  especialidad,
  nombre_servicio,
  precio_servicio,
  fecha,
  estado,
  observaciones_cliente,
}: CardOverViewProps) => {
  const [modalOpen, setModalOpen] = useState(false)

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
    <>
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
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1 bg-[#267A6E] hover:bg-[#1d6259] text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
        >
          Ver
          <ArrowRight size={13} />
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-5">

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#267A6E]/10 flex items-center justify-center">
                  <PawPrint size={20} className="text-[#267A6E]" />
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-lg">{nombre_mascota}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${estadoStyles[estado] ?? ''}`}>
                    {estado}
                  </span>
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Detalles de la cita</p>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <User size={16} className="text-[#267A6E] shrink-0" />
                <span><span className="font-medium text-gray-800">Dueño:</span> {nombre_dueno} {apellido_dueno}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Stethoscope size={16} className="text-[#267A6E] shrink-0" />
                <span><span className="font-medium text-gray-800">Veterinario:</span> Dr. {nombre_veterinario} {apellido_veterinario}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Tag size={16} className="text-[#267A6E] shrink-0" />
                <span><span className="font-medium text-gray-800">Especialidad:</span> {especialidad ?? '—'}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CalendarDays size={16} className="text-[#267A6E] shrink-0" />
                <span><span className="font-medium text-gray-800">Fecha:</span> {fechaFormateada}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <DollarSign size={16} className="text-[#267A6E] shrink-0" />
                <span><span className="font-medium text-gray-800">Servicio:</span> {nombre_servicio} · ${precio_servicio}</span>
              </div>

              {observaciones_cliente && (
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Clock size={16} className="text-[#267A6E] shrink-0 mt-0.5" />
                  <span><span className="font-medium text-gray-800">Observaciones:</span> {observaciones_cliente}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full bg-[#267A6E] hover:bg-[#1d6259] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Cerrar
            </button>

          </div>
        </div>
      )}
    </>
  )
}