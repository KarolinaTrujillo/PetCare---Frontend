'use client'

import { useState, useEffect } from 'react'
import { X, CalendarDays } from 'lucide-react'
import { Mascota } from '../../domain/entities/mascota.entity'
import { Veterinario } from '../../domain/entities/veterinario.entity'
import { Agenda } from '../../domain/entities/agenda.entity'
import { useCrearCitaViewModel } from '../viewmodels/crear-cita.viewmodel'
import { veterinarioService } from '../../infrastructure/services/veterinario.service'
import { GetVeterinariosUseCase } from '../../domain/usecases/get-veterinarios.usecase'
import { GetAgendaUseCase } from '../../domain/usecases/get-agenda.usecase'
import { Alert } from '@/src/core/components/ui/Alert'

const getVeterinariosUseCase = new GetVeterinariosUseCase(veterinarioService)
const getAgendaUseCase = new GetAgendaUseCase(veterinarioService)

const SERVICIOS = [
  { id: 1, nombre: 'Consulta general', precio: '250.00' },
  { id: 2, nombre: 'Vacunación', precio: '180.00' },
  { id: 3, nombre: 'Baño y corte', precio: '300.00' },
  { id: 4, nombre: 'Desparasitación', precio: '150.00' },
  { id: 5, nombre: 'Cirugía menor', precio: '800.00' },
]

interface ModalAgendarCitaProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  mascotas: Mascota[]
}

export const ModalAgendarCita = ({ isOpen, onClose, onSuccess, mascotas }: ModalAgendarCitaProps) => {
  const [idMascota, setIdMascota]         = useState('')
  const [idServicio, setIdServicio]       = useState('')
  const [idVeterinario, setIdVeterinario] = useState('')
  const [idAgenda, setIdAgenda]           = useState('')
  const [observaciones, setObservaciones] = useState('')

  const [veterinarios, setVeterinarios]   = useState<Veterinario[]>([])
  const [agenda, setAgenda]               = useState<Agenda[]>([])
  const [loadingVets, setLoadingVets]     = useState(false)
  const [loadingAgenda, setLoadingAgenda] = useState(false)

  const { crearCita, isLoading, alert, hideAlert } = useCrearCitaViewModel(onSuccess)

  useEffect(() => {
    if (!isOpen) return
    const fetchVets = async () => {
      try {
        setLoadingVets(true)
        const data = await getVeterinariosUseCase.execute()
        setVeterinarios(data)
      } finally {
        setLoadingVets(false)
      }
    }
    fetchVets()
  }, [isOpen])

  useEffect(() => {
    if (!idVeterinario) { setAgenda([]); return }
    const fetchAgenda = async () => {
      try {
        setLoadingAgenda(true)
        setIdAgenda('')
        const data = await getAgendaUseCase.execute(Number(idVeterinario))
        setAgenda(data)
      } finally {
        setLoadingAgenda(false)
      }
    }
    fetchAgenda()
  }, [idVeterinario])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user') ?? '{}')
    const agendaSeleccionada = agenda.find(a => a.id === Number(idAgenda))
    await crearCita({
      id_user: user.id,
      id_mascota: parseInt(idMascota),
      id_servicio: parseInt(idServicio),
      id_veterinario: parseInt(idVeterinario),
      id_agenda: parseInt(idAgenda),
      fecha: agendaSeleccionada?.fecha ?? '',
      observaciones_cliente: observaciones || undefined,
    })
    handleClose()
  }

  const handleClose = () => {
    setIdMascota(''); setIdServicio(''); setIdVeterinario('')
    setIdAgenda(''); setObservaciones(''); setAgenda([])
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <Alert alert={alert} onClose={hideAlert} />

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 z-10">

          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-[#267A6E]" />
              <h2 className="text-base font-bold text-gray-900">Agendar cita</h2>
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Mascota</label>
              <select value={idMascota} onChange={e => setIdMascota(e.target.value)} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white cursor-pointer">
                <option value="">Selecciona una mascota</option>
                {mascotas.map(m => (
                  <option key={m.id} value={m.id}>{m.nombre} ({m.especie})</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Servicio</label>
              <select value={idServicio} onChange={e => setIdServicio(e.target.value)} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white cursor-pointer">
                <option value="">Selecciona un servicio</option>
                {SERVICIOS.map(s => (
                  <option key={s.id} value={s.id}>{s.nombre} — ${s.precio}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Veterinario</label>
              <select value={idVeterinario} onChange={e => setIdVeterinario(e.target.value)} required disabled={loadingVets}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white cursor-pointer disabled:opacity-60">
                <option value="">{loadingVets ? 'Cargando...' : 'Selecciona un veterinario'}</option>
                {veterinarios.map(v => (
                  <option key={v.id} value={v.id}>{v.nombre} {v.apellido} {v.especialidad ? `· ${v.especialidad}` : ''}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Horario disponible</label>
              <select value={idAgenda} onChange={e => setIdAgenda(e.target.value)} required disabled={!idVeterinario || loadingAgenda}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white cursor-pointer disabled:opacity-60">
                <option value="">
                  {!idVeterinario ? 'Selecciona un veterinario primero' : loadingAgenda ? 'Cargando horarios...' : agenda.length === 0 ? 'Sin horarios disponibles' : 'Selecciona un horario'}
                </option>
                {agenda.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.dia_nombre} {new Date(a.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })} · {a.hora_inicio} - {a.hora_fin}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Observaciones <span className="text-gray-300">(opcional)</span></label>
              <textarea value={observaciones} onChange={e => setObservaciones(e.target.value)}
                placeholder="Ej. Mi perro es nervioso con extraños..." rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white resize-none" />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button type="button" onClick={handleClose}
                className="flex-1 text-sm font-semibold text-gray-500 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                Cancelar
              </button>
              <button type="submit" disabled={isLoading}
                className="flex-1 text-sm font-semibold text-white bg-[#267A6E] hover:bg-[#1d6259] disabled:opacity-60 py-3 rounded-xl transition-colors cursor-pointer">
                {isLoading ? 'Agendando...' : 'Agendar cita'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}