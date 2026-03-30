'use client'

import { useState } from 'react'
import { X, Shield } from 'lucide-react'
import { personalService } from '../../infrastructure/services/personal.service'
import { Alert } from '@/src/core/components/ui/Alert'
import { useAlert } from '@/src/core/hooks/useAlert'
import { getErrorMessage } from '@/src/core/lib/error-messages'

interface ModalCrearAdminProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const ModalCrearAdmin = ({ isOpen, onClose, onSuccess }: ModalCrearAdminProps) => {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { alert, hideAlert, success, error: showError } = useAlert()

  const nombreLimpio = nombre.trim().replace(/\s+/g, '')
  const password = `PetCare2026-${nombreLimpio.charAt(0).toUpperCase()}${nombreLimpio.slice(1)}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await personalService.crearAdmin({
        nombre, apellido, email, telefono,
        password,
        rol: 'ADMIN',
      })
      success('¡Administrador registrado!', `${nombre} fue registrado correctamente.`)
      setTimeout(() => { onSuccess(); handleClose() }, 1500)
    } catch (e: any) {
      showError('Error al registrar', getErrorMessage(e))
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setNombre(''); setApellido(''); setEmail(''); setTelefono('')
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
              <Shield size={18} className="text-[#267A6E]" />
              <h2 className="text-base font-bold text-gray-900">Registrar administrador</h2>
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5">

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required placeholder="Juan"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Apellido</label>
                <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} required placeholder="Pérez"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Correo electrónico</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@petcare.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Teléfono</label>
              <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="9611234567"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all" />
            </div>

            {nombre && (
              <div className="bg-[#267A6E]/5 border border-[#267A6E]/20 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-400 font-medium mb-1">Contraseña generada automáticamente</p>
                <p className="text-sm font-mono text-[#267A6E] font-semibold">{password}</p>
              </div>
            )}

            <div className="flex items-center gap-3 mt-2">
              <button type="button" onClick={handleClose}
                className="flex-1 text-sm font-semibold text-gray-500 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                Cancelar
              </button>
              <button type="submit" disabled={isLoading}
                className="flex-1 text-sm font-semibold text-white bg-[#267A6E] hover:bg-[#1d6259] disabled:opacity-60 py-3 rounded-xl transition-colors cursor-pointer">
                {isLoading ? 'Registrando...' : 'Registrar'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}