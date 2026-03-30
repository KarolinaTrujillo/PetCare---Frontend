import { useState } from 'react'
import { httpClient } from '@/src/core/lib/http/http-client'
import { useAlert } from '@/src/core/hooks/useAlert'
import { getErrorMessage } from '@/src/core/lib/error-messages'

export const useForgotPasswordViewModel = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { alert, hideAlert, success, error: showError } = useAlert()

  const enviarCorreo = async () => {
    if (!email) return
    try {
      setIsLoading(true)
      await httpClient.post('/auth/forgot-password', { email })
      success('¡Correo enviado!', 'Revisa tu bandeja de entrada para restablecer tu contraseña.')
    } catch (e: any) {
      showError('Error', getErrorMessage(e))
    } finally {
      setIsLoading(false)
    }
  }

  return { email, setEmail, isLoading, enviarCorreo, alert, hideAlert }
}