'use client'

import { NavBarVetComponent } from "../../components/NavBarVet"
import { CalendarDays, Plus, Trash2, X, Loader2, Clock, CheckCircle, XCircle, Circle } from "lucide-react"
import { useState } from "react"
import { useAgendaVetViewModel } from "../../viewmodels/agenda.vet.viewmodel"
import { LoaderOne } from "@/src/core/components/ui/loader"
import { DiaSemana, EstadoAgenda } from "../../types/agenda.vet.types"
import { WordRotateConfetti } from "@/src/core/components/ui/WordRotateConfetti"

const DIAS: DiaSemana[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

const estadoStyles: Record<EstadoAgenda, string> = {
  disponible: 'bg-green-100 text-green-700',
  reservado:  'bg-yellow-100 text-yellow-700',
  cancelado:  'bg-red-100 text-red-700',
}

const estadoIcons: Record<EstadoAgenda, React.ReactNode> = {
  disponible: <CheckCircle size={12} />,
  reservado:  <Circle      size={12} />,
  cancelado:  <XCircle     size={12} />,
}

const FORM_VACIO = { dia_nombre: 'Lunes' as DiaSemana, fecha: '', hora_inicio: '', hora_fin: '' }

export const AgendaVetScreen = () => {
  const {
    agenda, isLoading, error,
    creating,   handleCreate,
    updatingId, handleUpdateStatus,
    deletingId, handleDelete,
    handleDeleteToda,
  } = useAgendaVetViewModel()

  const [modalCrear, setModalCrear]           = useState(false)
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)
  const [form, setForm]                       = useState(FORM_VACIO)

  // Agrupar por día
  const agendaPorDia = DIAS.reduce<Record<DiaSemana, typeof agenda>>((acc, dia) => {
    acc[dia] = agenda.filter(a => a.dia_nombre === dia)
    return acc
  }, {} as Record<DiaSemana, typeof agenda>)

  const handleSubmit = async () => {
    if (!form.fecha || !form.hora_inicio || !form.hora_fin) return
    await handleCreate(form)
    setModalCrear(false)
    setForm(FORM_VACIO)
  }

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
      <NavBarVetComponent title="AGENDA" subtitle="Configura tu disponibilidad semanal..." />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={20} className="text-[#267A6E]" />
              <h2 className="text-black font-semibold text-lg">Mi agenda semanal</h2>
            </div>
            <span className="text-sm text-gray-400">
              {agenda.length} bloque{agenda.length !== 1 ? 's' : ''} configurado{agenda.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {agenda.length > 0 && (
              <button
                onClick={() => setConfirmDeleteAll(true)}
                className="flex items-center gap-2 text-sm font-semibold text-red-500 border border-red-200 px-4 py-2.5 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                Limpiar agenda
              </button>
            )}
            <button
              onClick={() => setModalCrear(true)}
              className="flex items-center gap-2 bg-[#267A6E] hover:bg-[#1d6259] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              <Plus size={16} />
              Agregar bloque
            </button>
          </div>
        </div>

        {/* Grid semanal */}
        {agenda.length > 0 ? (
          <div className="grid grid-cols-7 gap-3 flex-1 overflow-y-auto">
            {DIAS.map(dia => (
              <div key={dia} className="flex flex-col gap-2">

                {/* Header del día */}
                <div className={`text-center py-2 rounded-xl text-xs font-bold ${
                  agendaPorDia[dia].length > 0
                    ? 'bg-[#267A6E] text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {dia}
                </div>

                {/* Bloques del día */}
                {agendaPorDia[dia].length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {agendaPorDia[dia].map(bloque => (
                      <div
                        key={bloque.id}
                        className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex flex-col gap-2 group"
                      >
                        {/* Estado badge */}
                        <div className="flex items-center justify-between">
                          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${estadoStyles[bloque.estado as EstadoAgenda]}`}>
                            {estadoIcons[bloque.estado as EstadoAgenda]}
                            {bloque.estado}
                          </span>
                          <button
                            onClick={() => setConfirmDeleteId(bloque.id)}
                            disabled={deletingId === bloque.id}
                            className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center rounded-full text-red-400 hover:bg-red-50 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {deletingId === bloque.id
                              ? <Loader2 size={11} className="animate-spin" />
                              : <X size={11} />
                            }
                          </button>
                        </div>

                        {/* Hora */}
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={11} className="text-[#267A6E] shrink-0" />
                          <span>{bloque.hora_inicio} – {bloque.hora_fin}</span>
                        </div>

                        {/* Cambiar estado — solo si no está reservado */}
                        {bloque.estado !== 'reservado' && (
                          <div className="flex gap-1 pt-1 border-t border-gray-50">
                            {(bloque.estado === 'cancelado' ? ['disponible'] : ['cancelado']).map(s => (
                              <button
                                key={s}
                                onClick={() => handleUpdateStatus(bloque.id, s)}
                                disabled={updatingId === bloque.id}
                                className={`flex-1 text-xs font-semibold py-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50 ${estadoStyles[s as EstadoAgenda]}`}
                              >
                                {updatingId === bloque.id ? '...' : s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center py-6">
                    <p className="text-xs text-gray-300 text-center">Sin bloques</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="relative flex-1 flex flex-col items-center overflow-hidden -mx-6 -mb-8">
            <div className="mt-16 z-10 flex flex-col items-center gap-2">
              <p className="text-gray-900 text-3xl font-semibold">No tienes agenda configurada</p>
              <div className="flex items-center gap-2 text-2xl font-bold text-[#267A6E]">
                <span>Priorizamos tu</span>
                <WordRotateConfetti
                  words={['Tiempo', 'Organización', 'Agenda', 'Bienestar']}
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

      {/* Modal Agregar Bloque */}
      {modalCrear && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-[#267A6E]" />
                <h3 className="text-sm font-bold text-gray-900">Nuevo bloque de disponibilidad</h3>
              </div>
              <button onClick={() => { setModalCrear(false); setForm(FORM_VACIO) }} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3">

              {/* Día */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 font-medium">Día de la semana</label>
                <select
                  value={form.dia_nombre}
                  onChange={e => setForm(f => ({ ...f, dia_nombre: e.target.value as DiaSemana }))}
                  className="w-full text-sm text-gray-900 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#267A6E] transition-colors bg-white"
                >
                  {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Fecha */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 font-medium">Fecha</label>
                <input
                  type="date"
                  value={form.fecha}
                  onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
                  className="w-full text-sm text-gray-900 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#267A6E] transition-colors"
                />
              </div>

              {/* Horas */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 font-medium">Hora inicio</label>
                  <input
                    type="time"
                    value={form.hora_inicio}
                    onChange={e => setForm(f => ({ ...f, hora_inicio: e.target.value }))}
                    className="w-full text-sm text-gray-900 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#267A6E] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 font-medium">Hora fin</label>
                  <input
                    type="time"
                    value={form.hora_fin}
                    onChange={e => setForm(f => ({ ...f, hora_fin: e.target.value }))}
                    className="w-full text-sm text-gray-900 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#267A6E] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => { setModalCrear(false); setForm(FORM_VACIO) }}
                className="text-xs font-semibold text-gray-500 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={creating}
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#267A6E] hover:bg-[#1d6259] disabled:opacity-60 px-4 py-2 rounded-full transition-colors cursor-pointer"
              >
                {creating
                  ? <><Loader2 size={11} className="animate-spin" /> Guardando...</>
                  : <><Plus size={11} /> Agregar</>
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Eliminar uno */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-900">¿Eliminar bloque?</h3>
            <p className="text-sm text-gray-500">Este bloque de disponibilidad será eliminado.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setConfirmDeleteId(null)}
                className="text-xs font-semibold text-gray-500 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
              >Cancelar</button>
              <button
                onClick={async () => { await handleDelete(confirmDeleteId); setConfirmDeleteId(null) }}
                className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition-colors cursor-pointer"
              >Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Limpiar toda la agenda */}
      {confirmDeleteAll && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-900">¿Limpiar toda la agenda?</h3>
            <p className="text-sm text-gray-500">Se eliminarán todos los bloques configurados. Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setConfirmDeleteAll(false)}
                className="text-xs font-semibold text-gray-500 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
              >Cancelar</button>
              <button
                onClick={async () => { await handleDeleteToda(); setConfirmDeleteAll(false) }}
                className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition-colors cursor-pointer"
              >Limpiar todo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}