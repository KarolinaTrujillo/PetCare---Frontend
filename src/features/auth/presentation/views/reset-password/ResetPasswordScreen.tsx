'use client'

import { Suspense } from 'react'
import { HeaderComponent } from '@/src/core/components/header/view/header'
import { Alert } from '@/src/core/components/ui/Alert'
import { useResetPasswordViewModel } from '../../viewmodels/reset-password.viewmodel'
import { Routes } from '@/src/core/navigator/routes'
import { KeyRound, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const ResetPasswordContent = () => {
  const { nueva, setNueva, confirmar, setConfirmar, isLoading, resetPassword, alert, hideAlert, token } = useResetPasswordViewModel()
  const [showNueva, setShowNueva] = useState(false)
  const [showConfirmar, setShowConfirmar] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    resetPassword()
  }

  if (!token) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">Token inválido o expirado.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <div className="w-12 h-12 rounded-2xl bg-[#267A6E]/10 flex items-center justify-center mb-6">
          <KeyRound size={22} className="text-[#267A6E]" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Nueva contraseña</h1>
        <p className="text-sm text-gray-400 mb-8">Ingresa tu nueva contraseña para restablecer el acceso.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Nueva contraseña</label>
            <div className="relative">
              <input
                type={showNueva ? 'text' : 'password'}
                value={nueva}
                onChange={e => setNueva(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all pr-11"
              />
              <button type="button" onClick={() => setShowNueva(!showNueva)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showNueva ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Confirmar contraseña</label>
            <div className="relative">
              <input
                type={showConfirmar ? 'text' : 'password'}
                value={confirmar}
                onChange={e => setConfirmar(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all pr-11"
              />
              <button type="button" onClick={() => setShowConfirmar(!showConfirmar)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showConfirmar ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#267A6E] hover:bg-[#1d6259] disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl transition-colors cursor-pointer"
          >
            {isLoading ? 'Restableciendo...' : 'Restablecer contraseña'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          <Link href={Routes.auth.login} className="text-[#267A6E] font-medium hover:underline">
            Volver al inicio de sesión
          </Link>
        </p>

      </div>
    </div>
  )
}

export const ResetPasswordScreen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderComponent />
      <Suspense fallback={<div className="flex flex-1 items-center justify-center" />}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  )
}