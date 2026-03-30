'use client'

import { HeaderComponent } from '@/src/core/components/header/view/header'
import { useRegisterViewModel } from '../../viewmodels/register.viewmodel'
import { Alert } from '@/src/core/components/ui/Alert'
import { Routes } from '@/src/core/navigator/routes'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export const RegisterScreen = () => {
  const { register, isLoading, alert: alertState, hideAlert } = useRegisterViewModel()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return alert('Las contraseñas no coinciden')
    }
    register({ nombre, apellido, email, telefono, password })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderComponent />

      <Alert alert={alertState} onClose={hideAlert} />

      <div className="flex flex-1">

        <div className="hidden md:flex flex-1 items-end justify-start">
          <img
            src="pet-register.webp"
            alt=""
            className="h-full max-h-[600px] w-auto object-contain object-left-bottom"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center px-10 md:px-16 lg:px-24 py-12">
          <div className="w-full max-w-sm">

            <h1 className="text-2xl font-bold text-gray-900 mb-1">Crear cuenta</h1>
            <p className="text-sm text-gray-400 mb-8">Regístrate para comenzar</p>

            <button
              type="button"
              onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Continuar con Google
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">o continúa con email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">Nombre</label>
                  <input name="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Juan" required
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">Apellido</label>
                  <input name="apellido" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Pérez" required
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Correo electrónico</label>
                <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" required
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Teléfono</label>
                <input name="telefono" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+52 961 000 0000" required
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Contraseña</label>
                <div className="relative">
                  <input name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all pr-11" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Confirmar contraseña</label>
                <div className="relative">
                  <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#267A6E] focus:ring-2 focus:ring-[#267A6E]/10 transition-all pr-11" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isLoading}
                className="bg-[#267A6E] hover:bg-[#1d6259] disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl transition-colors mt-2 cursor-pointer flex items-center justify-center gap-2">
                <UserPlus size={16} />
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>

            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              ¿Ya tienes cuenta?{' '}
              <Link href={Routes.auth.login} className="text-[#267A6E] font-medium hover:underline">
                Inicia sesión
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}