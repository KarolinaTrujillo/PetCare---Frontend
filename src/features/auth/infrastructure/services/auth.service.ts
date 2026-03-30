import { httpClient } from '@/src/core/lib/http/http-client'
import { LoginRequest } from '@/src/features/auth/domain/dtos/request/login.request'
import { RegisterRequest } from '@/src/features/auth/domain/dtos/request/register.request'
import { AuthResponse } from '@/src/features/auth/domain/dtos/response/auth.response'

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const { data } = await httpClient.post<AuthResponse>('/auth/login', credentials)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  },

  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await httpClient.post<AuthResponse>('/auth/register', payload)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  changePassword: async (passwordActual: string, nuevaPassword: string): Promise<void> => {
    await httpClient.put('/veterinarios/cambiar-password', {
      password_actual: passwordActual,
      password_nueva:  nuevaPassword,
    })
  },
}