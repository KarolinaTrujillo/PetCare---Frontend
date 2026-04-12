'use client'

import { useState, useEffect } from 'react'
import { X, PawPrint } from 'lucide-react'
import { Mascota } from '../../domain/entities/mascota.entity'
import { dashboardClienteService } from '../../infrastructure/services/dashboard.service'

interface ModalEditarMascotaProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  mascota: Mascota | null
}

export const ModalEditarMascota = ({ isOpen, onClose, onSuccess, mascota }: ModalEditarMascotaProps) => {
  const [nombre, setNombre] = useState('')
  const [especie, setEspecie] = useState<'Perro' | 'Gato'>('Perro')
  const [raza, setRaza] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [sexo, setSexo] = useState('')
  const [peso, setPeso] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  useEffect(() => {
    if (mascota) {
      setNombre(mascota.nombre ?? '')
      setEspecie((mascota.especie as 'Perro' | 'Gato') ?? 'Perro')
      setRaza(mascota.raza ?? '')
      setFechaNacimiento(mascota.fecha_nacimiento ? mascota.fecha_nacimiento.split('T')[0] : '')
      setSexo(mascota.sexo ?? '')
      setPeso(mascota.peso ? String(mascota.peso) : '')
    }
  }, [mascota])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!nombre.trim()) return setFormError('El nombre es obligatorio.')
    if (!sexo) return setFormError('El sexo es obligatorio.')
    if (!fechaNacimiento) return setFormError('La fecha de nacimiento es obligatoria.')

    try {
      setIsLoading(true)
      await dashboardClienteService.updateMascota(mascota!.id, {
        nombre,
        especie,
        raza: raza || undefined,
        fecha_nacimiento: fechaNacimiento || undefined,
        sexo,
        peso: peso ? parseFloat(peso) : undefined,
      })
      setSuccessMsg(`¡${nombre} ha sido actualizado exitosamente!`)
      setTimeout(() => {
        setSuccessMsg(null)
        onSuccess()
        onClose()
      }, 1500)
    } catch (e: any) {
      setFormError('Error al actualizar la mascota.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormError(null)
    setSuccessMsg(null)
    onClose()
  }

  if (!isOpen || !mascota) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 z-10">

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <PawPrint size={18} className="text-[#267A6E]" />
            <h2 className="text-base font-bold text-gray-900">Editar mascota</h2>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5">

          {formError && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{formError}</p>}
          {successMsg && <p className="text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">{successMsg}</p>}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Nombre <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Especie <span className="text-red-400">*</span></label>
              <select
                value={especie}
                onChange={e => setEspecie(e.target.value as 'Perro' | 'Gato')}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white cursor-pointer"
              >
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Sexo <span className="text-red-400">*</span></label>
              <select
                value={sexo}
                onChange={e => setSexo(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white cursor-pointer"
              >
                <option value="">Seleccionar</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Raza <span className="text-gray-300">(opcional)</span></label>
            <input
              type="text"
              value={raza}
              onChange={e => setRaza(e.target.value)}
              placeholder="Ej. Labrador, Siamés..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Fecha de nacimiento <span className="text-red-400">*</span></label>
              <input
                type="date"
                value={fechaNacimiento}
                onChange={e => setFechaNacimiento(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Peso (kg) <span className="text-gray-300">(opcional)</span></label>
              <input
                type="number"
                value={peso}
                onChange={e => setPeso(e.target.value)}
                placeholder="Ej. 4.5"
                min="0"
                step="0.1"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 text-sm font-semibold text-gray-500 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 text-sm font-semibold text-white bg-[#267A6E] hover:bg-[#1d6259] disabled:opacity-60 py-3 rounded-xl transition-colors cursor-pointer"
            >
              {isLoading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}