'use client'

import { NavBarVetComponent } from "../../components/NavBarVet"
import { CalendarDays, Search, Trash2, Plus, X, Loader2 } from "lucide-react"
import { useState } from "react"
import { useCitasVetViewModel } from "../../viewmodels/citas.vet.viewmodel"
import { LoaderOne } from "@/src/core/components/ui/loader"
import { EstadoCitaVet } from "../../types/cita.vet.types"
import { WordRotateConfetti } from "@/src/core/components/ui/WordRotateConfetti"
import { CreateCitaVetRequest } from "../../../domain/dtos/request/create-cita-vet.request"

const estadoOpciones = ['TODAS', 'PENDIENTE', 'CONFIRMADA', 'ATENDIDA', 'CANCELADA'] as const

const estadoStyles: Record<string, string> = {
    TODAS: 'bg-gray-100 text-gray-600',
    PENDIENTE: 'bg-yellow-100 text-yellow-700',
    CONFIRMADA: 'bg-green-100 text-green-700',
    ATENDIDA: 'bg-blue-100 text-blue-700',
    CANCELADA: 'bg-red-100 text-red-700',
}

const estadoTransiciones: Record<EstadoCitaVet, EstadoCitaVet[]> = {
    PENDIENTE: ['CONFIRMADA', 'CANCELADA'],
    CONFIRMADA: ['ATENDIDA', 'CANCELADA'],
    ATENDIDA: [],
    CANCELADA: [],
}

const FORM_VACIO: CreateCitaVetRequest = {
    id_user: 0,
    id_mascota: 0,
    id_servicio: 0,
    fecha: '',
    observaciones_cliente: '',
}

export const CitasVetScreen = () => {
    const {
        citas, isLoading, error,
        updatingId, handleUpdateStatus,
        deletingId, handleDeleteCita,
        creating, handleCreateCita,
    } = useCitasVetViewModel()

    const [filtro, setFiltro] = useState<string>('TODAS')
    const [busqueda, setBusqueda] = useState('')
    const [modalCrear, setModalCrear] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null)
    const [form, setForm] = useState<CreateCitaVetRequest>(FORM_VACIO)

    const citasFiltradas = citas
        .filter(c => filtro === 'TODAS' || c.estado === filtro)
        .filter(c =>
            c.nombre_mascota.toLowerCase().includes(busqueda.toLowerCase()) ||
            c.nombre_dueno.toLowerCase().includes(busqueda.toLowerCase()) ||
            c.nombre_servicio.toLowerCase().includes(busqueda.toLowerCase())
        )

    const handleSubmitCrear = async () => {
        if (!form.id_user || !form.id_mascota || !form.id_servicio || !form.fecha) return
        await handleCreateCita(form)
        setModalCrear(false)
        setForm(FORM_VACIO)
    }

    const cerrarModal = () => { setModalCrear(false); setForm(FORM_VACIO) }

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center">
            <LoaderOne />
        </div>
    )

    if (error) return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
        </div>
    )

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <NavBarVetComponent title="CITAS" subtitle="Gestiona tus citas aquí..." />

            <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-hidden">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <CalendarDays size={20} className="text-[#267A6E]" />
                            <h2 className="text-black font-semibold text-lg">Mis citas</h2>
                        </div>
                        <span className="text-sm text-gray-400">
                            {citasFiltradas.length} resultado{citasFiltradas.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por mascota, dueño o servicio..."
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-full outline-none focus:border-[#267A6E] transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {estadoOpciones.map(op => (
                            <button
                                key={op}
                                onClick={() => setFiltro(op)}
                                className={`text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer ${filtro === op ? estadoStyles[op] : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                            >
                                {op}
                            </button>
                        ))}
                    </div>
                </div>

                {citasFiltradas.length > 0 ? (
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <CitasTableFull
                            citas={citasFiltradas}
                            updatingId={updatingId}
                            deletingId={deletingId}
                            estadoTransiciones={estadoTransiciones}
                            estadoStyles={estadoStyles}
                            onUpdateStatus={handleUpdateStatus}
                            onDelete={(id) => setConfirmDelete(id)}
                        />
                    </div>
                ) : (
                    <div className="relative flex-1 flex flex-col items-center overflow-hidden -mx-6 -mb-8">
                        <div className="mt-16 z-10 flex flex-col items-center gap-2">
                            <p className="text-gray-900 text-3xl font-semibold">No hay citas registradas</p>
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

            {confirmDelete !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 z-10">

                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <Trash2 size={18} className="text-red-500" />
                                <h2 className="text-base font-bold text-gray-900">¿Eliminar cita?</h2>
                            </div>
                            <button onClick={() => setConfirmDelete(null)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="px-6 py-5 flex flex-col gap-4">
                            <p className="text-sm text-gray-500">Esta acción no se puede deshacer. La cita será eliminada permanentemente.</p>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="flex-1 text-sm font-semibold text-gray-500 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={async () => { await handleDeleteCita(confirmDelete); setConfirmDelete(null) }}
                                    className="flex-1 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 py-3 rounded-xl transition-colors cursor-pointer"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

import { CitaVetProps } from "../../types/cita.vet.types"

interface CitasTableFullProps {
    citas: CitaVetProps[]
    updatingId: number | null
    deletingId: number | null
    estadoTransiciones: Record<EstadoCitaVet, EstadoCitaVet[]>
    estadoStyles: Record<string, string>
    onUpdateStatus: (id: number, estado: EstadoCitaVet) => void
    onDelete: (id: number) => void
}

const CitasTableFull = ({
    citas, updatingId, deletingId,
    estadoTransiciones, estadoStyles,
    onUpdateStatus, onDelete,
}: CitasTableFullProps) => (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="overflow-y-auto flex-1">
            <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white z-10 border-b border-gray-50">
                    <tr className="text-xs text-gray-400 uppercase tracking-wider">
                        <th className="px-5 py-3 text-left font-semibold">Paciente</th>
                        <th className="px-5 py-3 text-left font-semibold">Propietario</th>
                        <th className="px-5 py-3 text-left font-semibold">Fecha</th>
                        <th className="px-5 py-3 text-left font-semibold">Hora</th>
                        <th className="px-5 py-3 text-left font-semibold">Servicio</th>
                        <th className="px-5 py-3 text-left font-semibold">Estado</th>
                        <th className="px-5 py-3 text-left font-semibold">Cambiar estado</th>
                        <th className="px-5 py-3 text-left font-semibold"></th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map((c, i) => {
                        const transiciones = estadoTransiciones[c.estado]
                        const fechaFormateada = c.fecha
                            ? new Date(c.fecha).toLocaleDateString('es-MX', {
                                day: '2-digit', month: 'short', year: 'numeric',
                            })
                            : '—'

                        return (
                            <tr
                                key={c.id}
                                className={`hover:bg-gray-50 transition-colors ${i !== citas.length - 1 ? 'border-b border-gray-50' : ''}`}
                            >
                                <td className="px-5 py-3 font-medium text-gray-900">{c.nombre_mascota}</td>
                                <td className="px-5 py-3 text-gray-500">{c.nombre_dueno} {c.apellido_dueno}</td>
                                <td className="px-5 py-3 text-gray-500">{fechaFormateada}</td>
                                <td className="px-5 py-3 text-gray-500">{c.hora}</td>
                                <td className="px-5 py-3 text-gray-500 truncate max-w-[120px]">{c.nombre_servicio}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoStyles[c.estado] ?? ''}`}>
                                        {c.estado}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    {transiciones.length > 0 ? (
                                        <div className="flex items-center gap-1.5">
                                            {transiciones.map(t => (
                                                <button
                                                    key={t}
                                                    onClick={() => onUpdateStatus(c.id, t)}
                                                    disabled={updatingId === c.id}
                                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors cursor-pointer disabled:opacity-50 ${estadoStyles[t]}`}
                                                >
                                                    {updatingId === c.id ? '...' : t}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-xs text-gray-300">—</span>
                                    )}
                                </td>
                                <td className="px-5 py-3">
                                    <button
                                        onClick={() => onDelete(c.id)}
                                        disabled={deletingId === c.id}
                                        className="flex items-center justify-center w-7 h-7 rounded-full text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
                                    >
                                        {deletingId === c.id
                                            ? <Loader2 size={13} className="animate-spin" />
                                            : <Trash2 size={13} />
                                        }
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
)

interface FormFieldProps {
    label: string
    value: string
    onChange: (v: string) => void
    type?: string
}

const FormField = ({ label, value, onChange, type = 'text' }: FormFieldProps) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400 font-medium">{label}</label>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full text-sm text-gray-900 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#267A6E] transition-colors"
        />
    </div>
)