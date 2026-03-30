import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authContainer } from '@/src/core/di/auth.container'
import { RegisterRequest } from '../../domain/dtos/request/register.request'
import { Routes } from '@/src/core/navigator/routes'
import { useAlert } from '@/src/core/hooks/useAlert'
import { getErrorMessage } from '@/src/core/lib/error-messages'

export const useRegisterViewModel = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { alert, hideAlert, error: showError, success } = useAlert()

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true)
      await authContainer.registerUseCase.execute(data)
      success('¡Cuenta creada!', 'Tu cuenta fue creada correctamente. Inicia sesión.')
      setTimeout(() => router.push(Routes.auth.login), 1500)
    } catch (e: any) {
      const status = e.response?.status
      if (status === 500 || status === 400) {
        showError('Error al registrarse', 'Este correo ya está registrado o los datos son inválidos.')
      } else {
        showError('Error al registrarse', getErrorMessage(e))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { register, isLoading, alert, hideAlert }
}