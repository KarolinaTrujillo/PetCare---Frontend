'use client'

import { HeaderComponent } from '@/src/core/components/header/view/header'
import { Alert } from '@/src/core/components/ui/Alert'
import { useForgotPasswordViewModel } from '../../viewmodels/forgot-password.viewmodel'
import { Routes } from '@/src/core/navigator/routes'
import { Mail } from 'lucide-react'
import Link from 'next/link'

export const ForgotPasswordScreen = () => {
  const { email, setEmail, isLoading, enviarCorreo, alert, hideAlert } = useForgotPasswordViewModel()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    enviarCorreo()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderComponent />
      <Alert alert={alert} onClose={hideAlert} />

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-sm">

          <div className="w-12 h-12 rounded-2xl bg-[#267A6E]/10 flex items-center justify-center mb-6">
            <Mail size={22} className="text-[#267A6E]" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">¿Olvidaste tu contraseña?</h1>
          <p className="text-sm text-gray-400 mb-8">Ingresa tu correo y te enviaremos un enlace para restablecerla.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#267A6E] hover:bg-[#1d6259] disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl transition-colors cursor-pointer"
            >
              {isLoading ? 'Enviando...' : 'Enviar enlace'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            <Link href={Routes.auth.login} className="text-[#267A6E] font-medium hover:underline">
              Volver al inicio de sesión
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}