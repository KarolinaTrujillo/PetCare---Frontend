'use client'

import { useEffect, useState } from 'react'
import { X, Plus, Loader2, ClipboardList, Stethoscope, FlaskConical, FileText, Calendar } from 'lucide-react'
import { useHistorialVetViewModel } from '../../viewmodels/historial.vet.viewmodel'
import { PacienteVet } from '../../../domain/entities/paciente.vet.entity'

interface Props {
  paciente: PacienteVet
  onClose:  () => void
}

const FORM_VACIO = { id_cita: 0, fecha: '', diagnostico: '', tratamiento: '', observaciones: '' }

export const HistorialModal = ({ paciente, onClose }: Props) => {
  const { historial, isLoading, creating, fetchHistorial, handleCreate } =
    useHistorialVetViewModel(paciente.id)

  const [tab, setTab]         = useState<'historial' | 'nuevo'>('historial')
  const [form, setForm]       = useState(FORM_VACIO)

  useEffect(() => { fetchHistorial() }, [fetchHistorial])

  const handleSubmit = async () => {
    if (!form.fecha || !form.id_cita) return
    await handleCreate({
      id_cita:       form.id_cita,
      fecha:         form.fecha,
      diagnostico:   form.diagnostico   || null,
      tratamiento:   form.tratamiento   || null,
      observaciones: form.observaciones || null,
    })
    setForm(FORM_VACIO)
    setTab('historial')
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 flex flex-col max-h-[85vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#267A6E]/10 flex items-center justify-center">
              <ClipboardList size={16} className="text-[#267A6E]" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Historial clínico</p>
              <p className="text-xs text-gray-400">{paciente.nombre} · {paciente.especie}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4">
          <button
            onClick={() => setTab('historial')}
            className={`text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer ${
              tab === 'historial'
                ? 'bg-[#267A6E] text-white'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            Ver historial
          </button>
          <button
            onClick={() => setTab('nuevo')}
            className={`flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer ${
              tab === 'nuevo'
                ? 'bg-[#267A6E] text-white'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            <Plus size={11} /> Nuevo registro
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-6 py-4">

          {/* Tab: Historial */}
          {tab === 'historial' && (
            <>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 size={20} className="animate-spin text-[#267A6E]" />
                </div>
              ) : historial.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-2">
                  <ClipboardList size={32} className="text-gray-200" />
                  <p className="text-sm text-gray-400">Sin registros clínicos aún</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {historial.map(h => (
                    <div key={h.id} className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-3">

                      {/* Fecha */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Calendar size={12} className="text-[#267A6E]" />
                          {new Date(h.fecha).toLocaleDateString('es-MX', {
                            day: '2-digit', month: 'long', year: 'numeric',
                          })}
                        </div>
                        <span className="text-xs text-gray-300">Cita #{h.id_cita}</span>
                      </div>

                      {/* Campos */}
                      <div className="grid grid-cols-1 gap-2">
                        {h.diagnostico && (
                          <HistorialField
                            icon={<Stethoscope size={13} />}
                            label="Diagnóstico"
                            value={h.diagnostico}
                          />
                        )}
                        {h.tratamiento && (
                          <HistorialField
                            icon={<FlaskConical size={13} />}
                            label="Tratamiento"
                            value={h.tratamiento}
                          />
                        )}
                        {h.observaciones && (
                          <HistorialField
                            icon={<FileText size={13} />}
                            label="Observaciones"
                            value={h.observaciones}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Tab: Nuevo registro */}
          {tab === 'nuevo' && (
            <div className="flex flex-col gap-4">

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 font-medium">ID de la cita</label>
                  <input
                    type="number"
                    value={form.id_cita === 0 ? '' : form.id_cita}
                    onChange={e => setForm(f => ({ ...f, id_cita: Number(e.target.value) }))}
                    className="w-full text-sm text-gray-900 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#267A6E] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 font-medium">Fecha</label>
                  <input
                    type="date"
                    value={form.fecha}
                    onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
                    className="w-full text-sm text-gray-900 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#267A6E] transition-colors"
                  />
                </div>
              </div>

              <TextAreaField
                label="Diagnóstico"
                value={form.diagnostico}
                onChange={v => setForm(f => ({ ...f, diagnostico: v }))}
              />
              <TextAreaField
                label="Tratamiento"
                value={form.tratamiento}
                onChange={v => setForm(f => ({ ...f, tratamiento: v }))}
              />
              <TextAreaField
                label="Observaciones"
                value={form.observaciones}
                onChange={v => setForm(f => ({ ...f, observaciones: v }))}
              />

              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => { setTab('historial'); setForm(FORM_VACIO) }}
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
                    : <><Plus size={11} /> Guardar registro</>
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Subcomponentes ──────────────────────────────────────────────────────────

const HistorialField = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <div className="flex items-center gap-1 text-xs font-semibold text-[#267A6E]">
      {icon} {label}
    </div>
    <p className="text-sm text-gray-700 leading-relaxed">{value}</p>
  </div>
)

const TextAreaField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-400 font-medium">{label}</label>
    <textarea
      rows={3}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full text-sm text-gray-900 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#267A6E] transition-colors resize-none"
    />
  </div>
)