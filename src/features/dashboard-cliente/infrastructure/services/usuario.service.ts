import { httpClient } from '@/src/core/lib/http/http-client'
import { Usuario } from '../../domain/entities/usuario.entity'
import { UpdatePerfilRequest } from '../../domain/dtos/request/update-perfil.request'

export const usuarioService = {
  getMe: async (): Promise<Usuario> => {
    const { data } = await httpClient.get('/auth/me')
    return data.user ?? data.data ?? data
  },

  updatePerfil: async (id: number, payload: UpdatePerfilRequest): Promise<Usuario> => {
    const userLocal = localStorage.getItem('user')
    const user = userLocal ? JSON.parse(userLocal) : {}

    const form = new FormData()
    form.append('id', String(id))
    form.append('rol', user.rol ?? 'USER')
    form.append('nombre', payload.nombre)
    form.append('apellido', payload.apellido)
    form.append('telefono', payload.telefono)
    if (payload.foto_perfil) {
      form.append('foto_perfil', payload.foto_perfil)
    }

    const { data } = await httpClient.put('/auth/profile', form)

    const updatedUser: Usuario = {
      ...user,
      nombre: payload.nombre,
      apellido: payload.apellido,
      telefono: payload.telefono,
      avatar_url: data.data?.avatar_url ?? user.avatar_url,
    }

    localStorage.setItem('user', JSON.stringify(updatedUser))
    return updatedUser
  },

  changePassword: async (passwordActual: string, nuevaPassword: string): Promise<void> => {
    await httpClient.put('/veterinarios/cambiar-password', {
      password_actual: passwordActual,
      password_nueva:  nuevaPassword,
    })
  },
}