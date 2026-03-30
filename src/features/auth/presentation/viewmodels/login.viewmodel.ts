import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authContainer } from '@/src/core/di/auth.container'
import { LoginRequest } from '../../domain/dtos/request/login.request'
import { Routes } from '@/src/core/navigator/routes'
import { Role } from '../../domain/entities/role.entity'
import { useAlert } from '@/src/core/hooks/useAlert'
import { getErrorMessage } from '@/src/core/lib/error-messages'
import Cookies from 'js-cookie'

export const useLoginViewModel = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { alert, hideAlert, error: showError, success } = useAlert()

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true)
      const response = await authContainer.loginUseCase.execute(credentials)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      Cookies.set('token', response.token, { expires: 7 })
      success('¡Bienvenido!', `Hola ${response.user.nombre}, iniciaste sesión correctamente.`)
      setTimeout(() => {
        switch (response.user.rol) {
          case Role.ADMIN:
            router.push(Routes.dashboard.admin.overview)
            break
          case Role.VETERINARIO:
            router.push(Routes.dashboard.veterinario.overview)
            break
          case Role.USER:
            router.push(Routes.dashboard.cliente.overview)
            break
          default:
            router.push(Routes.landing)
        }
      }, 1000)
    } catch (e: any) {
      const status = e.response?.status
      if (status === 500 || status === 401 || status === 400) {
        showError('Error al iniciar sesión', 'El correo o la contraseña son incorrectos.')
      } else {
        showError('Error al iniciar sesión', getErrorMessage(e))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, alert, hideAlert }
}