import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { httpClient } from '@/src/core/lib/http/http-client'
import { useAlert } from '@/src/core/hooks/useAlert'
import { getErrorMessage } from '@/src/core/lib/error-messages'
import { Routes } from '@/src/core/navigator/routes'

export const useResetPasswordViewModel = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [nueva, setNueva] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { alert, hideAlert, success, error: showError } = useAlert()

  const resetPassword = async () => {
    if (nueva !== confirmar) {
      showError('Error', 'Las contraseñas no coinciden.')
      return
    }
    if (nueva.length < 6) {
      showError('Error', 'La contraseña debe tener al menos 6 caracteres.')
      return
    }
    try {
      setIsLoading(true)
      await httpClient.post('/auth/reset-password', { token, new_password: nueva })
      success('¡Contraseña restablecida!', 'Ya puedes iniciar sesión con tu nueva contraseña.')
      setTimeout(() => router.push(Routes.auth.login), 2000)
    } catch (e: any) {
      showError('Error', getErrorMessage(e))
    } finally {
      setIsLoading(false)
    }
  }

  return { nueva, setNueva, confirmar, setConfirmar, isLoading, resetPassword, alert, hideAlert, token }
}