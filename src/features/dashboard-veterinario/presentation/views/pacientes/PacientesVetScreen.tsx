'use client'

import { NavBarVetComponent } from "../../components/NavBarVet"
import { PawPrint, Search, ClipboardList } from "lucide-react"
import { useState } from "react"
import { usePacientesVetViewModel } from "../../viewmodels/pacientes.vet.viewmodel"
import { LoaderOne } from "@/src/core/components/ui/loader"
import { WordRotateConfetti } from "@/src/core/components/ui/WordRotateConfetti"
import { Tag, Cake, Dna, Scale } from 'lucide-react'
import { HistorialModal } from "./historialModal"
import { PacienteVet } from "../../../domain/entities/paciente.vet.entity"

export const PacientesVetScreen = () => {
  const { pacientes, isLoading, error } = usePacientesVetViewModel()
  const [busqueda, setBusqueda]           = useState('')
  const [filtroEspecie, setFiltroEspecie] = useState<'TODAS' | 'Perro' | 'Gato'>('TODAS')
  const [pacienteHistorial, setPacienteHistorial] = useState<PacienteVet | null>(null)

  const pacientesFiltrados = pacientes
    .filter(p => filtroEspecie === 'TODAS' || p.especie === filtroEspecie)
    .filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (p.raza ?? '').toLowerCase().includes(busqueda.toLowerCase())
    )

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center"><LoaderOne /></div>
  )

  if (error) return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
    </div>
  )

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBarVetComponent title="PACIENTES" subtitle="Consulta y gestiona tus pacientes..." />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-hidden">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <PawPrint size={20} className="text-[#267A6E]" />
              <h2 className="text-black font-semibold text-lg">Mis pacientes</h2>
            </div>
            <span className="text-sm text-gray-400">
              {pacientesFiltrados.length} resultado{pacientesFiltrados.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o raza..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-full outline-none focus:border-[#267A6E] transition-colors"
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

        {pacientesFiltrados.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 overflow-y-auto">
            {pacientesFiltrados.map(p => {
              const edad = p.fecha_nacimiento
                ? Math.floor((Date.now() - new Date(p.fecha_nacimiento).getTime()) / (1000 * 60 * 60 * 24 * 365))
                : null

              return (
                <div key={p.id} className="flex items-center gap-5 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow w-full">
                  <div className="w-12 h-12 rounded-full bg-[#267A6E]/10 flex items-center justify-center shrink-0">
                    <PawPrint size={22} className="text-[#267A6E]" />
                  </div>

                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-bold text-base">{p.nombre}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${p.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {p.activo ? 'Activo' : 'Inactivo'}
                        </span>
                        {/* Botón historial */}
                        <button
                          onClick={() => setPacienteHistorial(p)}
                          className="flex items-center gap-1 text-xs font-semibold text-[#267A6E] border border-[#267A6E]/30 px-2.5 py-1 rounded-full hover:bg-[#267A6E]/5 transition-colors cursor-pointer"
                        >
                          <ClipboardList size={11} />
                          Historial
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-gray-500">
                      <div className="flex items-center gap-2 truncate">
                        <Tag size={14} className="text-[#267A6E] shrink-0" />
                        <span className="truncate">{p.especie} · {p.sexo ?? '—'}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <Dna size={14} className="text-[#267A6E] shrink-0" />
                        <span className="truncate">{p.raza ?? 'Sin raza'}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <Cake size={14} className="text-[#267A6E] shrink-0" />
                        <span className="truncate">{edad !== null ? `${edad} ${edad === 1 ? 'año' : 'años'}` : '—'}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <Scale size={14} className="text-[#267A6E] shrink-0" />
                        <span className="truncate">{p.peso ? `${p.peso} kg` : '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="relative flex-1 flex flex-col items-center overflow-hidden -mx-6 -mb-8">
            <div className="mt-16 z-10 flex flex-col items-center gap-2">
              <p className="text-gray-900 text-3xl font-semibold">No tienes pacientes registrados</p>
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

      {/* Modal historial */}
      {pacienteHistorial && (
        <HistorialModal
          paciente={pacienteHistorial}
          onClose={() => setPacienteHistorial(null)}
        />
      )}
    </div>
  )
}