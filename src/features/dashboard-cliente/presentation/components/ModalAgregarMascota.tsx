'use client'

import { useState } from 'react'
import { X, PawPrint } from 'lucide-react'
import { useCrearMascotaViewModel } from '../viewmodels/crear-mascota.viewmodel'
import { Alert } from '@/src/core/components/ui/Alert'

interface ModalAgregarMascotaProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const ModalAgregarMascota = ({ isOpen, onClose, onSuccess }: ModalAgregarMascotaProps) => {
  const [nombre, setNombre] = useState('')
  const [especie, setEspecie] = useState<'Perro' | 'Gato'>('Perro')
  const [raza, setRaza] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [sexo, setSexo] = useState('')
  const [peso, setPeso] = useState('')

  const { crearMascota, isLoading, alert, hideAlert } = useCrearMascotaViewModel(onSuccess)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user') ?? '{}')
    await crearMascota({
      id_user: user.id,
      especie,
      nombre,
      raza: raza || undefined,
      fecha_nacimiento: fechaNacimiento || undefined,
      sexo: sexo || undefined,
      peso: peso ? parseFloat(peso) : undefined,
    })
    handleClose()
  }

  const handleClose = () => {
    setNombre(''); setEspecie('Perro'); setRaza('')
    setFechaNacimiento(''); setSexo(''); setPeso('')
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
              <PawPrint size={18} className="text-[#267A6E]" />
              <h2 className="text-base font-bold text-gray-900">Agregar mascota</h2>
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Nombre de tu mascota"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Especie</label>
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
                <label className="text-sm font-medium text-gray-700">Sexo</label>
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
                <label className="text-sm font-medium text-gray-700">Fecha de nacimiento</label>
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
                {isLoading ? 'Guardando...' : 'Agregar mascota'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}