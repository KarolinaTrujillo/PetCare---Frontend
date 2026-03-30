'use client'

import { PawPrint, ArrowRight, Tag, Cake, Dna, Scale } from 'lucide-react'
import { Mascota } from '../../domain/entities/mascota.entity'
import Link from 'next/link'
import { Routes } from '@/src/core/navigator/routes'

export const CardMascotaComponent = ({
  id,
  nombre,
  especie,
  raza,
  fecha_nacimiento,
  sexo,
  peso,
  activo,
}: Mascota) => {
  console.log('mascota id:', id)
  const edad = fecha_nacimiento
    ? Math.floor((Date.now() - new Date(fecha_nacimiento).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : null

  return (
    <div className="flex items-center gap-5 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow w-full">

      <div className="w-12 h-12 rounded-full bg-[#267A6E]/10 flex items-center justify-center shrink-0">
        <PawPrint size={22} className="text-[#267A6E]" />
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-0">

        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold text-base">{nombre}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {activo ? 'Activo' : 'Inactivo'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-gray-500">
          <div className="flex items-center gap-2 truncate">
            <Tag size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">{especie} · {sexo ?? '—'}</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <Dna size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">{raza ?? 'Sin raza'}</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <Cake size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">{edad !== null ? `${edad} ${edad === 1 ? 'año' : 'años'}` : '—'}</span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <Scale size={14} className="text-[#267A6E] shrink-0" />
            <span className="truncate">{peso ? `${peso} kg` : '—'}</span>
          </div>
        </div>

      </div>

      <Link
        href={Routes.dashboard.cliente.mascotaDetalle(id)}
        className="flex items-center gap-1 bg-[#267A6E] hover:bg-[#1d6259] text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
      >
        Ver
        <ArrowRight size={13} />
      </Link>

    </div>
  )
}